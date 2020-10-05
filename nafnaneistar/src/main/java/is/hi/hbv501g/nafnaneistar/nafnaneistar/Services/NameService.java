package is.hi.hbv501g.nafnaneistar.nafnaneistar.Services;

import java.util.List;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;

public interface NameService {
    NameCard save(NameCard NameCard);
    void delete(NameCard nameCard);
    List<NameCard> findAll();
    
}
