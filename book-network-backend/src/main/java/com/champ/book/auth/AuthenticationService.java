package com.champ.book.auth;

import com.champ.book.email.EmailService;
import com.champ.book.email.EmailTemplateName;
import com.champ.book.role.RoleRepository;
import com.champ.book.security.JwtService;
import com.champ.book.user.Token;
import com.champ.book.user.TokenRepository;
import com.champ.book.user.User;
import com.champ.book.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    @Value("${application.mailing.frontend.activate-url}")
    private String activationUrl;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void register(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByName("USER")
                // todo:- better exception handling in future.
                .orElseThrow(()-> new IllegalStateException("ROLE USER is not initialised..."));
        // building the actual user object to register
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // so this encoded pwd will be persisted in the db.
                .accountLocked(false)
                .accountEnabled(false)
                .roles(List.of(userRole))
                .build()
                ;
        // we build the user object but to save it to DB we need to use the UserRepository.save() method.
        // (Always remember, to get/post anything to/from DB we always need to use the UserRepository class.
        userRepository.save(user); // saving record into the DB

        //sending Email
        sendValidationEmail(user);
    }

    public void sendValidationEmail(User user) throws MessagingException {
        // 1) Generate and save the activation token
        var token = generateAndSaveActivationToken(user);
        // 2) send an Email
        emailService.sendEmail(
                user.getEmail(),
                user.fullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                token,
                "BSN Account Activation"
        );
    }

    public String generateAndSaveActivationToken(User user) {
        // 1) generate Activation code ( the one which you got as OTP in your mail/phone.
        var generatedToken = generateActivationCode(6); // we want to generate 6 digit OTP hence passing 6 as length.
        // generating token with expiration time.
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        // saving it
        tokenRepository.save(token);
        return generatedToken;

    }

    public String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for(int i=0;i<length;i++){
            int randomIndex = secureRandom.nextInt(characters.length()); // it will generate any no betn 0 to 9... bec char.length is 9.
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword())
        );
        var claims = new HashMap<String, Object>();
        var user = ((User)auth.getPrincipal());
        claims.put("fullName", user.fullName());
        var jwtToken = jwtService.generateToken(claims,user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(()->new RuntimeException("Invalid Token"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            sendValidationEmail(savedToken.getUser()); // Send a new email with a new token
            throw new RuntimeException("Activation token has expired. A new token has been sent to the same mail address.");
        }

        // Activate the user account
        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(()->new UsernameNotFoundException("User not found!!"));
        user.setAccountEnabled(true); // Enable the user account
        userRepository.save(user);    // Save the updated user
        savedToken.setValidatedAt(LocalDateTime.now()); // Update token as validated
        tokenRepository.save(savedToken); // Save the validated token
    }
}
