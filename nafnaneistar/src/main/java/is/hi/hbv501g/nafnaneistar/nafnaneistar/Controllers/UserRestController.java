package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;
import is.hi.hbv501g.nafnaneistar.utils.UserUtils;

@RestController
public class UserRestController {

    NameService nameService;
    UserService userService;

    @Autowired
    public UserRestController(NameService nameService, UserService userService) {
        this.nameService = nameService;
        this.userService = userService;
    }

    @GetMapping(path="/login/check/{email}/{password}", produces = "application/json")
    public boolean checkLogin(@PathVariable String email, @PathVariable String password, HttpSession session) 
    {   
        User user  = userService.findByEmailAndPassword(email, password);
        if(user != null){
            session.setAttribute("currentUser", user);
            return true;
        }
        return false;
    }

    @GetMapping(path="/viewliked/updaterating", produces = "application/json")
    public boolean updateNameRating(@RequestParam String id,@RequestParam String rating, HttpSession session) 
    {   User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser)) return false;
        Integer nameId = Integer.parseInt(id);
        Integer nameRating = Integer.parseInt(rating);
        try {
            currentUser.updateRatingById(nameId, nameRating);
            userService.save(currentUser);
            return true;
        }catch(Error e){
            return false;
        }       
    }

    @GetMapping(path="/signup/checkemail", produces = "application/json")
    public boolean validateEmail(@RequestParam String email) 
    {   User user = userService.findByEmail(email);
        if(user != null)
            return false;
        return true;
    }

}
