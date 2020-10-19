package is.hi.hbv501g.nafnaneistar.nafnaneistar.Services;

import java.util.List;
import java.util.Optional;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;

public interface NameService {
    NameCard save(NameCard nameCard);
    void delete(NameCard nameCard);
    List<NameCard> findAll();
    Optional<NameCard> findById(Integer id);
    List<NameCard> findAllByDescriptionLike(String s); //Breyta í name?
    List<NameCard> findAllByGender(boolean bool);


}
