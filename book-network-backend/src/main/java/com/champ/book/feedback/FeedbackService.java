package com.champ.book.feedback;

import com.champ.book.book.Book;
import com.champ.book.book.BookRepository;
import com.champ.book.common.PageResponse;
import com.champ.book.exception.OperationNotPermittedException;
import com.champ.book.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final BookRepository bookRepository;
    private final FeedbackMapper feedbackMapper;
    private final FeedbackRepository feedbackRepository;

    public Integer save(FeedbackRequest request, Authentication connectedUser) {
        // Step - 1:- Fetching book from DB
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(()->new EntityNotFoundException("No book found for the ID:" + request.bookId()));
        // Step - 2:- if book is not shareable || archived then requester/user can't provide feedback.
        if(book.isArchived() || !book.isShareable()){
            throw new OperationNotPermittedException("You can't provide feedback for an archived or not shareable book");
        }
        // Step - 3:- if requester himself is the owner then owner can't borrow his own book ryt.
        User user = ((User)connectedUser.getPrincipal());
        if(!Objects.equals(book.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("You can not give feedback to your own book.");
        }

        Feedback feedback = feedbackMapper.toFeedback(request);
        return feedbackRepository.save(feedback).getId();
    }

    public PageResponse<FeedbackResponse> findAllFeedbacksByBook(Integer bookId, int page, int size, Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User)connectedUser.getPrincipal());
        Page<Feedback> feedbacks = feedbackRepository.findAllByBookId(bookId,pageable);
        List<FeedbackResponse> feedbackResponses = feedbacks.stream()
                .map(f->feedbackMapper.toFeedbackResponse(f, user.getId()))
                .toList();
        return new PageResponse<>(
                feedbackResponses,
                feedbacks.getNumber(),
                feedbacks.getSize(),
                feedbacks.getTotalElements(),
                feedbacks.getTotalPages(),
                feedbacks.isFirst(),
                feedbacks.isLast()
        );
    }
}