package com.example.server.controllers;

import java.util.UUID;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.models.Registration;
import com.example.server.models.Response;

@RestController
@RequestMapping(value = "/api/registration", 
                produces = MediaType.APPLICATION_JSON_VALUE)
public class RegistrationRESTController {

    private Logger logger = Logger.getLogger(RegistrationRESTController.class.getName());
    
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postRegistration(@RequestBody String payload) {
        logger.info("Payload: %s".formatted(payload));

        String id = UUID.randomUUID().toString().substring(0, 8);
        Registration r;
        Response resp;
        try {
            r = Registration.create(payload);
            r.setId(id);
        } catch(Exception e) {
            resp = new Response();
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(resp.toJson()
                                .toString());
        }

        // save to database
        resp = new Response();
        resp.setCode(HttpStatus.CREATED.value());
        resp.setMessage(id);
        resp.setData(r.toJson().toString());

        return ResponseEntity.status(HttpStatus.CREATED)
                            .body(resp.toJson().toString());
    }
}
