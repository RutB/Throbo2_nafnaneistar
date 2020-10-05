package is.hi.hbv501g.nafnaneistar.nafnaneistar.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;

public interface NameRepository extends JpaRepository<NameCard, Long> {
    User save(User user);

    void delete(User user);

    List<NameCard> findAll();

}
