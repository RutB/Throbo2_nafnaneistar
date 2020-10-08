package is.hi.hbv501g.nafnaneistar.nafnaneistar.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;

public interface NameRepository extends JpaRepository<NameCard, Long> {
    <S extends NameCard> NameCard save(NameCard namecard);

    void delete(NameCard namecard);

    List<NameCard> findAll();

    Optional<NameCard> findById(Integer id);
    List<NameCard> findAllByDescriptionLike(String s);
    

}
