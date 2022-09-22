package com.example.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Response {

    private String message = "";
    private int code = 0;
    private String data = "{}";

    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        this.code = code;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                    .add("message", message)
                    .add("code", code)
                    .add("data", data)
                    .build();
    }
}
