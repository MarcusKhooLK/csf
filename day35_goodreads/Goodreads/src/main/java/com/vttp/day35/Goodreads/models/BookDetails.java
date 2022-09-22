package com.vttp.day35.Goodreads.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class BookDetails {
    private String bookId = "";
    private String title = "";
    private String authors = "";
    private String description = "";
    private String edition = "";
    private String format = "";
    private Integer pages = 0;
    private Float rating = 0f;
    private Integer ratingCount = 0;
    private Integer reviewCount = 0;
    private String genres = "";
    private String image = "";
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
    public String getAuthors() {
        return authors;
    }
    public void setAuthors(String authors) {
        this.authors = authors;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getEdition() {
        return edition;
    }
    public void setEdition(String edition) {
        this.edition = edition;
    }
    public String getFormat() {
        return format;
    }
    public void setFormat(String format) {
        this.format = format;
    }
    public Integer getPages() {
        return pages;
    }
    public void setPages(Integer pages) {
        this.pages = pages;
    }
    public Float getRating() {
        return rating;
    }
    public void setRating(Float rating) {
        this.rating = rating;
    }
    public Integer getRatingCount() {
        return ratingCount;
    }
    public void setRatingCount(Integer ratingCount) {
        this.ratingCount = ratingCount;
    }
    public Integer getReviewCount() {
        return reviewCount;
    }
    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }
    public String getGenres() {
        return genres;
    }
    public void setGenres(String genres) {
        this.genres = genres;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }

    public static BookDetails create(final SqlRowSet rs) {
        BookDetails b = new BookDetails();
        b.setBookId(rs.getString("book_id"));
        b.setTitle(rs.getString("title"));
        b.setAuthors(rs.getString("authors"));
        b.setDescription(rs.getString("description"));
        b.setEdition(rs.getString("edition"));
        b.setFormat(rs.getString("format"));
        b.setPages(rs.getInt("pages"));
        b.setRating(rs.getFloat("rating"));
        b.setRatingCount(rs.getInt("rating_count"));
        b.setReviewCount(rs.getInt("review_count"));
        b.setGenres(rs.getString("genres"));
        b.setImage(rs.getString("image_url"));
        return b;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                .add("bookId", bookId)
                .add("title", title)
                .add("authors", authors)
                .add("description", description)
                .add("edition", edition)
                .add("format", format)
                .add("pages", pages)
                .add("rating", rating)
                .add("ratingCount", ratingCount)
                .add("reviewCount", reviewCount)
                .add("genres", genres)
                .add("image", image)
                .build();
    }
}
