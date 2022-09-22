package com.vttp.day36.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vttp.day36.models.Post;

@Service
public class PostService {

    private static final String SQL_GET_POST_BY_ID = "select * from post where post_id = ?;";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Optional<Post> getPost(Integer postId) {
        Optional<Post> postOpt = jdbcTemplate.query(SQL_GET_POST_BY_ID,
                ((rs) -> {
                    if (!rs.next())
                        return Optional.empty();
                    return Optional.of(Post.create(rs));
                }),
                postId);

        return postOpt;
    }
}
