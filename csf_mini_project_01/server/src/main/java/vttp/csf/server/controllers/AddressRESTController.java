package vttp.csf.server.controllers;

import java.io.StringReader;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.csf.server.models.Contact;
import vttp.csf.server.models.Response;
import vttp.csf.server.services.AddressBookService;

@RestController
@RequestMapping(value = "/api/address", produces = MediaType.APPLICATION_JSON_VALUE)
public class AddressRESTController {

    private Logger logger = Logger.getLogger(AddressRESTController.class.getName());

    @Autowired
    private AddressBookService addBookSvc;
    
    @PostMapping(value="/contact", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postNewContact(@RequestBody String payload) {
        logger.info(">>> postNewContact() %s".formatted(payload));

        Contact c;
        Response resp = new Response();
        try{
            c = Contact.create(payload);
            addBookSvc.save(c);
        } catch (Exception e) {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(resp.toJson().toString());
        }

        resp.setCode(HttpStatus.CREATED.value());
        resp.setMessage("Created successfully: %s".formatted(payload));
        return ResponseEntity.status(HttpStatus.CREATED)
                            .body(resp.toJson().toString());
    }

    @DeleteMapping(value="/contact", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> removeContact(@RequestBody String payload) {
        logger.info(">>> removeContact() %s".formatted(payload));

        Response resp = new Response();
        try{
            JsonReader reader = Json.createReader(new StringReader(payload));
            addBookSvc.remove(reader.readObject().getString("email"));
        }catch(Exception e) {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                               .body(resp.toJson().toString());
        }

        resp.setCode(HttpStatus.ACCEPTED.value());
        resp.setMessage("Deleted successfully");
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                            .body(resp.toJson().toString());
    }

    @GetMapping(value = "/contacts")
    public ResponseEntity<String> getContacts() {
        Response resp = new Response();
        List<Contact> contacts;
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        JsonObject data;
        try{
            contacts = addBookSvc.getContacts();
            contacts.forEach(c-> arrayBuilder.add(c.toJson()));
            data = Json.createObjectBuilder().add("contacts", arrayBuilder).build();
        }catch(Exception e) {
            resp.setCode(HttpStatus.BAD_REQUEST.value());
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(resp.toJson().toString());
        }

        resp.setData(data);
        resp.setCode(HttpStatus.OK.value());
        resp.setMessage("Success");
        logger.info("Contacts: %s".formatted(resp.getData()));
        return ResponseEntity.ok(resp.toJson().toString());
    }
}
