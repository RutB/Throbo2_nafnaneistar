package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

@Controller
public class HomeController {

    private UserService userService;
    private NameService nameService;

    @Autowired
    public HomeController(UserService userService, NameService nameService) {
        this.userService = userService;
        this.nameService = nameService;
    }

    @RequestMapping("/")
    public String Home(Model model) {
        model.addAttribute("users", userService.findAll());
        return "Home";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String Signup(@Valid @ModelAttribute User user, BindingResult result, Model model) {
        model.addAttribute("names", nameService.findAll());
        model.addAttribute("users", userService.findAll());
        if (result.hasErrors()) {
            return "Signup";
        }
        ArrayList<Integer> ids = new ArrayList<>();

        for(NameCard nc : nameService.findAll()){
            ids.add(nc.getId());
        }
        user.setAvailableNames(ids);
        userService.save(user);
        model.addAttribute("users", userService.findAll());
        System.out.println(user.getName());
        return "Home";
    }
    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String SignupForm(Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("user",new User());
        return "Signup";
    }
    @RequestMapping(value = "/viewnames", method = RequestMethod.GET)
    public String ViewNames(Model model) {
        model.addAttribute("names", nameService.findAll());
 
        return "viewnames";
    }


}