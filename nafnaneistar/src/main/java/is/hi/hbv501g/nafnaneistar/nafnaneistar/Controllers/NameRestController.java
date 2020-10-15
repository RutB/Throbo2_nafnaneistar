package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

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
    public Optional<NameCard> ApproveName(@PathVariable String id,HttpSession session) 
    {   
        User currentUser = (User) session.getAttribute("currentUser");
        currentUser.approveName(Integer.parseInt(id));
        userService.save(currentUser);
        Integer newID = currentUser.getRandomNameId();      
        return nameService.findById(newID); 
    }

    @GetMapping(path="/swipe/disapprove/{id}", produces = "application/json")
    public Optional<NameCard> DisapproveName(@PathVariable String id,HttpSession session) 
    {
        User currentUser = (User) session.getAttribute("currentUser");
        currentUser.disapproveName(Integer.parseInt(id));
        userService.save(currentUser);
        Integer newID = currentUser.getRandomNameId();      
        return nameService.findById(newID); 
    }


}
