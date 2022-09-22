package com.vttp.day36.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vttp.day36.services.PostService;
import com.vttp.day36.models.Post;

@Controller
@RequestMapping(path="/post")
public class PostController {
    
    @Autowired
    private PostService postSvc;

    @GetMapping(path="{postId}")
    public String getPost(@PathVariable Integer postId, Model model) {
        Optional<Post> postOpt = postSvc.getPost(postId);
        model.addAttribute("post", postOpt.get());
        model.addAttribute("postUrl", "/upload/%d".formatted(postId));
        return "post";
    }
}
