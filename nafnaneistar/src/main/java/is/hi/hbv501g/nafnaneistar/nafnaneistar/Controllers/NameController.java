package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

@RestController
public class NameController {

    NameService nameService;
    UserService userService;

    @Autowired
    public NameController(NameService nameService, UserService userService) {
        this.nameService = nameService;
        this.userService = userService;
    }

    @GetMapping(path="/swipe/approve/{user}/{id}", produces = "application/json")
    public Optional<NameCard> ApproveName(@PathVariable String user, @PathVariable String id) 
    {   
        User currentUser = userService.findByName(user).get(0);
        currentUser.approveName(Integer.parseInt(id));
        userService.save(currentUser);
        Integer newID = currentUser.getRandomNameId();      
        return nameService.findById(newID); 
    }

    @GetMapping(path="/swipe/disapprove/{user}/{id}", produces = "application/json")
    public Optional<NameCard> DisapproveName(@PathVariable String user,@PathVariable String id) 
    {
        User currentUser = userService.findByName(user).get(0);
        currentUser.disapproveName(Integer.parseInt(id));
        Integer newID = currentUser.getRandomNameId();      
        return nameService.findById(newID); 
    }


}
