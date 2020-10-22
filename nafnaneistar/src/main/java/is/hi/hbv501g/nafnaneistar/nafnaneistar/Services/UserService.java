package is.hi.hbv501g.nafnaneistar.nafnaneistar.Services;

import java.util.List;
import java.util.Optional;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;

public interface UserService {
    User save(User user);
    void delete(User user);
    List<User> findAll();
    List<User> findByName(String name);
    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);
    Optional<User> findById(Long id);
}
