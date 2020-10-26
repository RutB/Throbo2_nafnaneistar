package is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Namecard contains the Id, Name, Description and Gender information for each Name
 */
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

    /**
     * Empty Constructor to create a new instance via reflection
     */
    public NameCard(){
    }

    /**
     * Constructor for namecard, creates a Namecard with given parameters
     * @param id id of the namecard
     * @param name name associated with the namecard
     * @param description description associated with the name
     * @param gender true means female, false means male
     */
    public NameCard(Integer id, String name, String description,int gender) {
        this.name = name;
        this.description = description;
        this.gender = (gender == 1) ? true : false;
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

    /**
     * modified getter, it suited us better to have the gender represented in 1 or 0
     * @return returns 1 if true (female) and 0 if false (male)
     */
    public int getGender() {
        return  (this.gender) ? 1 : 0;
    }

}
