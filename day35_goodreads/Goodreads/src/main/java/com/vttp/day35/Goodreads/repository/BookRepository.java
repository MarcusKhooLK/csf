package com.vttp.day35.Goodreads.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.vttp.day35.Goodreads.models.Book;
import com.vttp.day35.Goodreads.models.BookDetails;

@Repository
public class BookRepository {

    private static final String SQL_GET_BOOKS = "select book_id, title from book2018 order by title asc limit ? offset ?;";
    private static final String SQL_GET_BOOK = "select * from book2018 where book_id = ?;";

    @Autowired
    private JdbcTemplate template;

    public List<Book> getBooks(Integer limit, Integer offset) {
        final SqlRowSet rs = template.queryForRowSet(SQL_GET_BOOKS, limit, offset);
        
        List<Book> books = new ArrayList<Book>();
        while(rs.next()) {
            books.add(Book.create(rs));
        }

        return books;
    }

    public Optional<BookDetails> getBook(String bookId) {
        final SqlRowSet rs = template.queryForRowSet(SQL_GET_BOOK, bookId);

        if(rs.next()) {
            return Optional.of(BookDetails.create(rs));
        }

        return Optional.empty();
    }
    
}
