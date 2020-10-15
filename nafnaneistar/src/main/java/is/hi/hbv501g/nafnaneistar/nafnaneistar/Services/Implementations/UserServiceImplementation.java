package is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.Implementations;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Repositories.UserRepository;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

@Service
public class UserServiceImplementation implements UserService {

    UserRepository repository;

    @Autowired
    public UserServiceImplementation(UserRepository userRepo) {
        this.repository = userRepo;
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public void delete(User user) {
        this.repository.delete(user);

    }

    @Override
    public List<User> findAll() {
        return this.repository.findAll();
    }

    @Override
    public List<User> findByName(String name) {
        return this.repository.findByName(name);
    }

    @Override
    public User findByEmailAndPassword(String email, String password) {
        return repository.findByEmailAndPassword(email, password);
    }

    
    @Override
    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }
    
}
