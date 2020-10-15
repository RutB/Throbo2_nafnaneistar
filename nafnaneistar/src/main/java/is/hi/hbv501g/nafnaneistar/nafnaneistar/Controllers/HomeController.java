package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;

@Controller
public class HomeController {

    @Autowired
    public HomeController(UserService userService, NameService nameService) {
    }

    @RequestMapping("/")
    public String Home(Model model) {
        return "redirect:login";
    }
    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String Login(Model model) {
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
    public String ViewNames(Model model) {
        model.addAttribute("names", nameService.findAll());
        return "viewnames";
    }

    @RequestMapping(value = "/swipe", method = RequestMethod.GET)
    public String SwipeNames(Model model) {
        if(currentUser == null)
            return "redirect:/login";

        model.addAttribute("users", userService.findAll());
        model.addAttribute("user", currentUser);
        Optional<NameCard> nc = nameService.findById(currentUser.getRandomNameId());
        model.addAttribute("name",nc);
        return "Swipe";
    }   
    @RequestMapping(value = "/linkpartner", method = RequestMethod.GET)
    public String LinkpartnerForm(Model model){
        if(currentUser == null)
        return "redirect:/login";

        model.addAttribute("users", userService.findAll());
        model.addAttribute("user", currentUser);
        System.out.println("current linked partner" + currentUser.getLinkedPartners());
        return "linkpartner";
    }

    @RequestMapping(value = "/linkpartner", method = RequestMethod.POST)
    public String Linkpartner(
        @RequestParam(value = "email", required = true) String email, Model model) {
            if(userService.findByEmail(email)== null){
                System.out.print("onei thetta var rangt email");
                return "linkpartner";
            }
            else{           
                System.out.println("User fyrir netfang" + userService.findByEmail(email));
                System.out.println("ID fyrir netfang" + userService.findByEmail(email).getId());
            currentUser.addLinkedPartner((int)userService.findByEmail(email).getId());    //current user að uppfæra linked list og tengjast email user
            userService.findByEmail(email).addLinkedPartner((int)currentUser.getId());    //email user að uppfæra  linked list og tengjast current user
                System.out.println("current linked partner" + currentUser.getLinkedPartners());
                System.out.println("email user linked parnter "+ userService.findByEmail(email).getLinkedPartners());
            return "linkpartner";
            }
    }
}
