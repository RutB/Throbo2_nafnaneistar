package is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class NameCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    //@Lob is for the database creation to store it larger than a VARCHAR with only 255 char capacity
    @Lob
    private String description;
    private boolean gender;

    public NameCard(){
        
    }

    public NameCard(Integer id, String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getGender() {
        return  (this.gender) ? 1 : 0;
    }

}
