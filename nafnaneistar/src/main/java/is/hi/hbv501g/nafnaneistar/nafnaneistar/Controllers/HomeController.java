package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.Optional;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;
import is.hi.hbv501g.nafnaneistar.utils.UserUtils;

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
        return "redirect:login";
    }
    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String Login(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(currentUser != null)
            return "redirect:/swipe";
        model.addAttribute("users", userService.findAll());
        model.addAttribute("user",new User());
        return "login";
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String PostLogin(
        @RequestParam(value = "email", required = true) String email,
        @RequestParam(value = "password", required = true) String password,
        Model model) {  
        model.addAttribute("users", userService.findAll());
        return "login";
    }
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String Signup(@Valid @ModelAttribute User user, BindingResult result, Model model) {
        model.addAttribute("names", nameService.findAll());
        model.addAttribute("users", userService.findAll());

        if (result.hasErrors()) {
            return "Signup";
        }
        UserUtils.initAvailableNames(user, nameService);
        userService.save(user);
        model.addAttribute("users", userService.findAll());
        return "redirect:/";

    }
    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String SignupForm(Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("user",new User());
        return "Signup";
    }

    @RequestMapping(value = "/viewnames", method = RequestMethod.GET)
    public String ViewNames(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        model.addAttribute("user", currentUser);
        model.addAttribute("names", nameService.findAll());
        return "viewnames";
    }

    @RequestMapping(value = "/swipe", method = RequestMethod.GET)
    public String SwipeNames(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(currentUser == null)
            return "redirect:/login";

        model.addAttribute("users", userService.findAll());
        model.addAttribute("user", currentUser);
        Optional<NameCard> nc = nameService.findById(currentUser.getRandomNameId());
        model.addAttribute("name",nc);
        return "Swipe";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String LogOut(Model model, HttpSession session) {
        session.removeAttribute("currentUser");
        return "redirect:/login";
    }

    
}
