package is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities;

import java.util.ArrayList;
import javax.persistence.Entity;

@Entity
public class User {
    private int id;
    private String name;
    private String email;
    private ArrayList<Integer> availableNames;
    private ArrayList<Integer> approvedNames;
    private ArrayList<Integer> linkedPartners;

    public User(String name, String email, ArrayList<Integer> availableNames){
        this.name = name;
        this.email = email;
        this.availableNames = availableNames;
        this.approvedNames = new ArrayList<Integer>();
        this.linkedPartners = new ArrayList<Integer>();
    }


    /*
    Custom Functions and Metods
    */

    /*
    Getters and Setters    
    */

    public int getId(){
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

    public ArrayList<Integer> getAvailableNames(){
        return this.availableNames;
    }
    public ArrayList<Integer> getApprovedNames(){
        return this.approvedNames;
    }
    public ArrayList<Integer> getLinkedPartners(){
        return this.linkedPartners;
    }
}
