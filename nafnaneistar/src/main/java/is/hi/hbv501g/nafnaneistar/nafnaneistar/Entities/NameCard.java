package is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class NameCard {
    
    @Id
    private Long id;
    private String name;
    private String desc;

    public NameCard(Long id, String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDesc() {
        return desc;
    }

    
    

}
