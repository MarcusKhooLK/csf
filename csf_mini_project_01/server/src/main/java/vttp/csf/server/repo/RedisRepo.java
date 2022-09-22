package vttp.csf.server.repo;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import vttp.csf.server.models.Contact;

@Repository
public class RedisRepo {

    private static final String MAP_NAME = "contactlist_map";
    
    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    public void save(final Contact c) {
        redisTemplate.opsForHash().put(MAP_NAME, c.getEmail(), c);
    }

    public boolean hasKey(final String email) {
        return redisTemplate.opsForHash().hasKey(MAP_NAME, email);
    }

    public List<Contact> getContacts() {
        Set<Object> keys = redisTemplate.opsForHash().keys(MAP_NAME);
        return redisTemplate.opsForHash()
                            .multiGet(MAP_NAME, keys)
                            .stream()
                            .filter(Contact.class::isInstance)
                            .map(Contact.class::cast)
                            .toList();
    }

    public void remove(final String email) {
        redisTemplate.opsForHash().delete(MAP_NAME, email);
    }

}
