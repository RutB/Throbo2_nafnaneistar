package is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotEmpty
    private String name;
    
    @Email
    @NotEmpty
    @Column(unique=true)
    private String email;
    @NotEmpty
    private String password;
    @Lob
    private ArrayList<Integer> availableNames;
    @Lob
    private HashMap<Integer, Integer> approvedNames;
    private ArrayList<Long> linkedPartners;


    public User() {
        
        this.approvedNames = new HashMap<Integer,Integer>();
        this.linkedPartners = new ArrayList<Long>();
    }

    public User(String name, String email, String password, ArrayList<Integer> availableNames){
        this.name = name;
        this.email = email;
        this.password = password;
        this.availableNames = availableNames;
        this.approvedNames = new HashMap<Integer,Integer>();
        this.linkedPartners = new ArrayList<Long>();
    }


    /*
    Custom Functions and Metods
    */
    
    public ArrayList<Integer> approveName(Integer id){
        int index = this.availableNames.indexOf(id);
        if(index < 0)
            return this.availableNames;
        this.approvedNames.put(this.availableNames.remove(index), 0);
        return this.availableNames;
    }

    public ArrayList<Integer> disapproveName(Integer id){
        int index = this.availableNames.indexOf(id);
        this.availableNames.remove(index);
        return this.availableNames;
    }

    public void addLinkedPartner(Long id){
        this.linkedPartners.add(id);
    }

    public boolean removeLinkedPartner(Long id){
        return this.linkedPartners.remove(id);
    }

    public int getAvailableNamesSize(){
        return this.availableNames.size();
    }

    public Integer getRandomNameId(){
        Random r = new Random();
        int size = this.availableNames.size();
        if(size == 0)
            return -1;
        Integer newID = this.availableNames.get(r.nextInt(size));
        return newID;
    }

    public Integer getRandomNameId(ArrayList<Integer> genderList){
        Random r = new Random();
        int size = genderList.size();
        if(size == 0)
            return -1;
        Integer newID = genderList.get(r.nextInt(size));
        return newID;
    }

    public void updateRatingById(Integer id, Integer rating){
        this.approvedNames.put(id, rating);
    }




    /*
    Getters and Setters    
    */

    public long getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public ArrayList<Integer> getAvailableNames(){
        return this.availableNames;
    }
    public void setAvailableNames(ArrayList<Integer> ids){
        this.availableNames = ids;
    }


    public HashMap<Integer,Integer> getApprovedNames(){
        return this.approvedNames;
    }
    public ArrayList<Long> getLinkedPartners(){
        return this.linkedPartners;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	@Override
	public String toString() {
        return "User: " + this.name + " listleft: " + this.getAvailableNamesSize();
    }
}
