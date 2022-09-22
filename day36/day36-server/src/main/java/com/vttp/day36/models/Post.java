package com.vttp.day36.models;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Post {
    private Integer postId;
    private String title;
    private String mediaType;
    private byte[] content;
    public Integer getPostId() {
        return postId;
    }
    public void setPostId(Integer postId) {
        this.postId = postId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getMediaType() {
        return mediaType;
    }
    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }
    public byte[] getContent() {
        return content;
    }
    public void setContent(byte[] content) {
        this.content = content;
    }

    public static Post create(ResultSet rs) throws SQLException {
        Post post = new Post();
        post.setTitle(rs.getString("title"));
        post.setPostId(rs.getInt("post_id"));
        post.setMediaType(rs.getString("mediaType"));
        post.setContent(rs.getBytes("pic"));
        return post;
    }
}
