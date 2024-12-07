package com.champ.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookTransactionHistoryRepository extends JpaRepository<BookTransactionHistory, Integer> {

    @Query("""
            SELECT hist
            FROM BookTransactionHistory hist
            WHERE hist.user.id = :userId
            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT hist
            FROM BookTransactionHistory hist
            WHERE hist.book.owner.id = :userId
            """)
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, Integer userId);

    @Query("""
            SELECT
            (COUNT(*)>0) AS isBorrowed
            FROM BookTransactionHistory hist
            WHERE hist.user.id = :userId
            AND hist.book.id = :bookId
            AND hist.returnApproved = false
            """)
    boolean isAlreadyBorrowedByUser(Integer bookId, Integer userId);

    @Query("""
            SELECT hist
            FROM BookTransactionHistory hist
            WHERE hist.user.id = :userId
            AND hist.book.id = :bookId
            AND hist.returned = false
            AND hist.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndUserId(@Param("bookId") Integer bookId, @Param("bookId") Integer userId);

    @Query("""
            SELECT hist
            FROM BookTransactionHistory hist
            WHERE hist.book.owner.id = :userId
            AND hist.book.id = :bookId
            AND hist.returned = true
            AND hist.returnApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(@Param("bookId") Integer bookId,  @Param("userId") Integer userId);
}
