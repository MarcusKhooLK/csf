package com.vttp.day36.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vttp.day36.models.Post;
import com.vttp.day36.services.PostService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/upload")
public class UploadController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PostService postSvc;

    private static final String SQL_INSERT_POST = "insert into post (title, pic, mediaType) values (?, ?, ?);";
    
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> upload(@RequestPart("myFile") MultipartFile myFile,
                                            @RequestPart String title) {

        String fileName = myFile.getName();
        String origName = myFile.getOriginalFilename();
        String mediaType = myFile.getContentType();

        try{
            int updated = jdbcTemplate.update(SQL_INSERT_POST, title, myFile.getInputStream(), mediaType);
            System.out.println("updated: %d".formatted(updated));
        }catch(Exception e) {
            e.printStackTrace();
        }

        JsonObject data = Json.createObjectBuilder()
                                .add("fileName", fileName)
                                .add("origName", origName)
                                .add("mediaType", mediaType)
                                .add("size", myFile.getSize())
                                .add("formTitle", title)
                                .build();

        return ResponseEntity.ok(data.toString());
    }

    @GetMapping(path="{id}")
    public ResponseEntity<byte[]> getPost(@PathVariable Integer id) {
        Optional<Post> postOpt = postSvc.getPost(id);
        
        if(postOpt.isPresent()) {
            Post p = postOpt.get();
            return ResponseEntity.status(HttpStatus.OK)
                                .contentType(MediaType.parseMediaType(p.getMediaType()))
                                .body(p.getContent());
        }

        return ResponseEntity.notFound().build();
    }
}
