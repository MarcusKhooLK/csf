package com.vttp.day35.Goodreads.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vttp.day35.Goodreads.models.Book;
import com.vttp.day35.Goodreads.models.BookDetails;
import com.vttp.day35.Goodreads.repository.BookRepository;

@Service
public class BookService {
    
    @Autowired
    private BookRepository bookRepo;

    public List<Book> getBooks(Integer limit, Integer offset) {
        return bookRepo.getBooks(limit, offset);
    }

    public Optional<BookDetails> getBook(String bookId) {
        return bookRepo.getBook(bookId);
    }
}
