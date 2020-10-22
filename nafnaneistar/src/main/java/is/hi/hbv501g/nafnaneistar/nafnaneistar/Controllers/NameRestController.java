package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.HashMap;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;
import is.hi.hbv501g.nafnaneistar.utils.*;

@RestController
public class NameRestController {

    NameService nameService;
    UserService userService;

    @Autowired
    public NameRestController(NameService nameService, UserService userService) {
        this.nameService = nameService;
        this.userService = userService;
    }

    @GetMapping(path="/swipe/approve/{id}", produces = "application/json")
    public Optional<NameCard> ApproveName(@PathVariable String id,
        @RequestParam(required = false) String male,
        @RequestParam(required = false) String female,
        HttpSession session) 
    {   
        User currentUser = (User) session.getAttribute("currentUser");
        currentUser.approveName(Integer.parseInt(id));
        userService.save(currentUser);
        int gender = 3;
        if(male != null && female == null){
            gender = 0;
        }
        if(male == null && female != null){
            gender = 1; 
        }
        return getNewNameCard(currentUser,nameService,gender);
    }

    @GetMapping(path="/swipe/disapprove/{id}", produces = "application/json")
    public Optional<NameCard> DisapproveName(@PathVariable String id,
        @RequestParam(required = false) String male,
        @RequestParam(required = false) String female,
        HttpSession session) 
    {
        User currentUser = (User) session.getAttribute("currentUser");
        currentUser.disapproveName(Integer.parseInt(id));
        userService.save(currentUser);
        int gender = 3;
        if(male != null && female == null){
            gender = 0;
        }
        if(male == null && female != null){
            gender = 1; 
        }
        return getNewNameCard(currentUser,nameService,gender);
    }
    
    @GetMapping(path="/swipe/newname", produces = "application/json")
    public Optional<NameCard> GetNewName(
        @RequestParam(required = false) String male,
        @RequestParam(required = false) String female,
        HttpSession session) 
    {
        User currentUser = (User) session.getAttribute("currentUser");
        int gender = 3;
        if(male != null && female == null){
            gender = 0;
        }
        if(male == null && female != null){
            gender = 1; 
        }
        return getNewNameCard(currentUser,nameService,gender);
            
    }

    @GetMapping(path="/swipe/getlistSize", produces = "application/json")
    public Integer[] getRemainingSize(HttpSession session)  {
        User currentUser = (User) session.getAttribute("currentUser");
        int mSize = UserUtils.getGenderList(currentUser,nameService,0).size();
        int fSize = UserUtils.getGenderList(currentUser,nameService,1).size();
        Integer[] size = new Integer[] {mSize,fSize};
        System.out.println(currentUser.getAvailableNamesSize());
        return size;
        
    }

    @GetMapping(path="/viewliked/combolist", produces ="application/json")
    public HashMap<String,Integer> getComboList(HttpSession session, @RequestParam String partnerid){
        Long pID = Long.parseLong(partnerid);
        User partner = userService.findById(pID).orElse(null);
        User currentUser = (User) session.getAttribute("currentUser");
        if(partner == null || currentUser == null) return null;
        HashMap<String,Integer> ncs = new HashMap<>();
        Set<Integer> pids = partner.getApprovedNames().keySet();
        Set<Integer> ids = currentUser.getApprovedNames().keySet();
        for(Integer id : ids){
            if(pids.contains(id)){
                NameCard nc = nameService.findById(id).orElse(null);
                int avg = (currentUser.getApprovedNames().get(id) + partner.getApprovedNames().get(id));
                avg = (avg == 0) ? avg : avg/2;
                ncs.put(nc.getName()+"-"+nc.getId()+"-"+nc.getGender(),avg); 
            }
        }
        return ncs;      
    }

    private Optional<NameCard> getNewNameCard(User user, NameService nameService, int gender){
        if(gender == 3){
            Integer newID = user.getRandomNameId();      
            return nameService.findById(newID); 
        }
        Integer newID = user.getRandomNameId(UserUtils.getGenderList(user,nameService,gender));
        return nameService.findById(newID);
    }



}
