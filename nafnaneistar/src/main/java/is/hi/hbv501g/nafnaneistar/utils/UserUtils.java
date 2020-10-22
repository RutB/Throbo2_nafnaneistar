package is.hi.hbv501g.nafnaneistar.utils;

import java.util.ArrayList;
import java.util.Set;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;

public class UserUtils {
    public static void initAvailableNames(User user, NameService nameService){
        ArrayList<Integer> ids = new ArrayList<>();
		for(NameCard nc : nameService.findAll()){
            ids.add(nc.getId());
        }
        user.setAvailableNames(ids);
    }

    public static ArrayList<Integer> getGenderList(User user, NameService nameService,int gender){
        ArrayList<Integer> genderList = new ArrayList<Integer>();
        for(NameCard nc : nameService.findAll()){
            if(nc.getGender() == gender){
                if(user.getAvailableNames().indexOf(nc.getId()) >= 0)
                    genderList.add(nc.getId());
            }
        }
        return genderList;
    }
    public static ArrayList<Integer> getGenderList(Set<Integer> ids, NameService nameService,int gender){
        ArrayList<Integer> genderList = new ArrayList<Integer>();
        for(NameCard nc : nameService.findAll()){
            if(nc.getGender() == gender){
                if(ids.contains(nc.getId()))
                    genderList.add(nc.getId());
            }
        }
        return genderList;
    }

    public static boolean isLoggedIn(User user){
        if(user == null)
            return false;
        return true;
    }

}
