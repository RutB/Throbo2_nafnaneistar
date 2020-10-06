package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

@Controller
public class HomeController {
    
    private UserService userService;
    private NameService nameService;

    @Autowired
    public HomeController(UserService userService,NameService nameService){
        this.userService = userService;
        this.nameService = nameService;
    }
    @RequestMapping("/")
    public String Home(Model model){
        model.addAttribute("names", nameService.findAll());
        return "Home";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String Signup(@Valid User user, BindingResult result, Model model) {
        if(result.hasErrors()){
            return "Signup";
        }
        userService.save(user);
        model.addAttribute("users", userService.findAll());
        return "Home";
    }
    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String SignupForm(Model model) {
        return "Signup";
    }
    @RequestMapping(value = "/viewnames", method = RequestMethod.GET)
    public String ViewNames(Model model) {
        model.addAttribute("names", nameService.findAllByDescriptionLike("MISSING"));
 
        return "viewnames";
    }


}
