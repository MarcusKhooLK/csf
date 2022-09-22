package vttp.csf.server.models;

import java.io.Serializable;
import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Contact implements Serializable {

    private String name;
    private String email;
    private String mobile;

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
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public static Contact create(String json) {
        Contact c = new Contact();
        JsonReader reader = Json.createReader(new StringReader(json));
        JsonObject jObj = reader.readObject();
        c.setName(jObj.getString("name"));
        c.setEmail(jObj.getString("email"));
        c.setMobile(jObj.getString("mobile"));
        return c;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder().add("name", name)
        .add("email", email)
        .add("mobile", mobile)
        .build();
    }
}
