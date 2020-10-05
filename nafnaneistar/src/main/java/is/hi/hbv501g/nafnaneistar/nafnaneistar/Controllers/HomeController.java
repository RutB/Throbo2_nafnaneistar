package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

@Controller
public class HomeController {
    
    private UserService userService;

    @Autowired
    public HomeController(UserService userService){
        this.userService = userService;
    }
    @RequestMapping("/")
    public String Home(Model model){
        model.addAttribute("users", userService.findAll());
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


}
