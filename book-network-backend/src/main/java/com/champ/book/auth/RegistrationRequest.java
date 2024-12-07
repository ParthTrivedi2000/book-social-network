package com.champ.book.auth;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
//@NoArgsConstructor
//@AllArgsConstructor
public class RegistrationRequest {

    @NotEmpty(message = "Firstname is mandatory!")
    @NotBlank(message = "Firstname is mandatory")
    private String firstname;
    @NotEmpty(message = "Lastname is mandatory!")
    @NotBlank(message = "Lastname is mandatory")
    private String lastname;
    @Email(message = "Email format is not correct.") // validation for incorrect formated emails like pht@com@gmail...
    @NotEmpty(message = "Email is mandatory!")
    @NotBlank(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory!")
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;
}
