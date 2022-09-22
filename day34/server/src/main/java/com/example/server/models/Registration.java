package com.example.server.models;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Registration {

    private String id; // optional
    private String name;
    private String email;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public static Registration create(String json) {
        JsonReader reader = Json.createReader(new StringReader(json));
        JsonObject data = reader.readObject();
        final Registration r = new Registration();
        r.setName(data.getString("name"));
        r.setEmail(data.getString("email"));
        // since if is optional. Check if id is in the payload
        if(data.containsKey("id")) {
            r.setId(data.getString("id"));
        }
        return r;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                    .add("id", id)
                    .add("name", name)
                    .add("email", email)
                    .build();
    }
}
