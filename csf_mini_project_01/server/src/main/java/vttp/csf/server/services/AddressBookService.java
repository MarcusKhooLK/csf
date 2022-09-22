package vttp.csf.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.csf.server.exceptions.SaveContactException;
import vttp.csf.server.models.Contact;
import vttp.csf.server.repo.RedisRepo;

@Service
public class AddressBookService {
    
    @Autowired
    private RedisRepo repo;

    public void save(final Contact c) throws SaveContactException {
        if(repo.hasKey(c.getEmail())) {
            throw new SaveContactException("Email already taken");
        } else {
            repo.save(c);
        }
    }

    public List<Contact> getContacts() {
        return repo.getContacts();
    }

    public void remove(final String email) {
        repo.remove(email);
    }
}
