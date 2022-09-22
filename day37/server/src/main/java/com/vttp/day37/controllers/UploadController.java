package com.vttp.day37.controllers;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

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

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.vttp.day37.models.Post;
import com.vttp.day37.services.PostService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping(path = "/upload")
public class UploadController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PostService postSvc;

    @Autowired
    private AmazonS3 s3;

    private static final String SQL_INSERT_POST = "insert into post (title, pic, mediaType) values (?, ?, ?);";

    @PostMapping(path="spaces", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> awsUpload(@RequestPart("myFile") MultipartFile myFile,
                                            @RequestPart String title) {

        // user metadata
        Map<String, String> myMetaData = new HashMap<>();
        myMetaData.put("title", title);
        myMetaData.put("createdOn", (new Date()).toString());

        // metadata
        ObjectMetadata metaData = new ObjectMetadata();
        metaData.setContentType(myFile.getContentType());
        metaData.setContentLength(myFile.getSize());
        metaData.setUserMetadata(myMetaData);

        String hash = UUID.randomUUID().toString().substring(0, 8);

        try {
            PutObjectRequest putReq = new PutObjectRequest("dumpground", 
                                                        "image/%s".formatted(hash), 
                                                        myFile.getInputStream(),
                                                        metaData);
            putReq = putReq.withCannedAcl(CannedAccessControlList.PublicRead);
            PutObjectResult result = s3.putObject(putReq);
        } catch (IOException e) {
            e.printStackTrace();
        }

        JsonObject data = Json.createObjectBuilder()
                                .add("fileName", hash)
                                .add("origName", myFile.getOriginalFilename())
                                .add("mediaType", myFile.getContentType())
                                .add("size", myFile.getSize())
                                .add("formTitle", title)
                                .build();

        return ResponseEntity.ok(data.toString());
    }
    
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
