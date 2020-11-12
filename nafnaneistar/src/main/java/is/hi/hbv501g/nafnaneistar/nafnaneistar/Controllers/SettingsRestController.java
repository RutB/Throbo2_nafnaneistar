package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.HashMap;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
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

/**
 * NameRestController contains methonds and function to process 
 * fetch calls from the viewing template
 */
@RestController
public class SettingsRestController {

    NameService nameService;
    UserService userService;

    /**
     * The SettingsRestController requires a NameService and UserService
     * @param nameService
     * @param userService
     */
    @Autowired
    public SettingsRestController(NameService nameService, UserService userService) {
        this.nameService = nameService;
        this.userService = userService;
    }

    @GetMapping(path="/settings/updatename", produces = "application/json")
    public boolean updateNameRating(@RequestParam String newname, HttpSession session) 
    {   User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser)) return false;
        if(newname.isBlank() || newname.isEmpty()) return false;
        if(!StringUtils.isAlphanumericSpace(newname)) return false;
        try {
            currentUser.setName(newname);
            userService.save(currentUser);
            return true;
        }catch(Error e){
            return false;
        }       
    }

    @GetMapping(path="/settings/changepassword", produces = "application/json")
    public boolean updateNameRating(@RequestParam String oldpass,@RequestParam String newpass, HttpSession session) 
    {   User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser)) return false;
        if(oldpass.isBlank() || newpass.isBlank()) return false;
        if(currentUser.getPassword().equals(oldpass)){
            try {
                currentUser.setPassword(newpass);
                userService.save(currentUser);
                return true;
            }catch(Error e){
                return false;
            }       
        }
        return false;
        
    }

}
