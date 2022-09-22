package com.vttp.day35.Goodreads.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Book {

    private String bookId;
    private String title;

    public String getBookId() {
        return bookId;
    }
    public void setBookId(String bookId) {
        this.bookId = bookId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public static Book create(SqlRowSet rs) {
        Book b = new Book();
        b.setBookId(rs.getString("book_id"));
        b.setTitle(rs.getString("title"));
        return b;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                    .add("bookId", bookId)
                    .add("title", title)
                    .build();
    }
}
