package vttp.csf.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Response {
    private String message = "";
    private JsonObject data = Json.createObjectBuilder().build();
    private int code = 0;
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public JsonObject getData() {
        return data;
    }
    public void setData(JsonObject data) {
        this.data = data;
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
                .add("data", data)
                .add("code", code)
                .build();
    }
}
