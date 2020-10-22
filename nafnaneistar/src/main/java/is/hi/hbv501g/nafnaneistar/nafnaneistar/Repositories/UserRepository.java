package is.hi.hbv501g.nafnaneistar.nafnaneistar.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    <S extends User> User save(User user);

    void delete(User user);

    List<User> findAll();

    List<User> findByName(String name);

    String findByEmail(String email);

    User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);

    Optional<User> findById(Long id);

}
