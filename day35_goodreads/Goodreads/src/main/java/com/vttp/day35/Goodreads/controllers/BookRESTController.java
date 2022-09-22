package com.vttp.day35.Goodreads.controllers;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vttp.day35.Goodreads.models.Book;
import com.vttp.day35.Goodreads.models.BookDetails;
import com.vttp.day35.Goodreads.services.BookService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BookRESTController {
    
    @Autowired
    private BookService bookSvc;

    @GetMapping(value="/books")
    public ResponseEntity<String> getBooks(@RequestParam(defaultValue = "20") Integer limit, 
                                            @RequestParam(defaultValue = "0") Integer offset) {
        List<Book> books = bookSvc.getBooks(limit, offset);
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        books.forEach(
            v -> {
                arrayBuilder.add(v.toJson());
            }
        );
        return ResponseEntity.ok(arrayBuilder.build().toString());
    }

    @GetMapping(value = "/book/{bookId}")
    public ResponseEntity<String> getBook(@PathVariable String bookId) {
        Optional<BookDetails> book = bookSvc.getBook(bookId);
        if(book.isPresent()) {
            return ResponseEntity.ok(book.get().toJson().toString());
        }
        return ResponseEntity.notFound().build();
    }
 
}
