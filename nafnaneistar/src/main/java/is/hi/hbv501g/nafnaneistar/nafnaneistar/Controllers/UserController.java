package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

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
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;
import is.hi.hbv501g.nafnaneistar.utils.UserUtils;

@Controller
public class UserController {
    private UserService userService;
    private NameService nameService;

    @Autowired
    public UserController(UserService userService, NameService nameService) {
        this.userService = userService;
        this.nameService = nameService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(UserUtils.isLoggedIn(currentUser))
            return "redirect:/swipe";
        model.addAttribute("users", userService.findAll());
        model.addAttribute("user", new User());
        return "Login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String postLogin(@RequestParam(value = "email", required = true) String email,
            @RequestParam(value = "password", required = true) String password, Model model) {
        model.addAttribute("users", userService.findAll());
        return "Login";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String signup(@Valid @ModelAttribute User user, BindingResult result, Model model) {
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
    public String signupForm(Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("user", new User());
        return "Signup";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logOut(Model model, HttpSession session) {
        session.removeAttribute("currentUser");
        return "redirect:/login";
    }

    @RequestMapping(value = "/linkpartner", method = RequestMethod.GET)
    public String linkpartnerForm(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if (currentUser == null)
            return "redirect:/login";
        model.addAttribute("users", userService.findAll());
        model.addAttribute("user", currentUser);
        System.out.println("current linked partner" + currentUser.getLinkedPartners());
        for (Long id : currentUser.getLinkedPartners()) {
            System.out.println(userService.findById(id));
        }
        return "linkpartner";
    }

    @RequestMapping(value = "/linkpartner", method = RequestMethod.POST)
    public String linkpartner(@RequestParam(value = "email", required = true) String email, Model model,
            HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser))
            return "redirect:/login";
        if (userService.findByEmail(email) == null) {
            System.out.print("onei thetta var rangt email");
            return "linkpartner.html";
        } else {
            System.out.println("User fyrir netfang" + userService.findByEmail(email));

            System.out.println("ID fyrir netfang" + userService.findByEmail(email).getId());
            currentUser.addLinkedPartner(userService.findByEmail(email).getId()); // current user að uppfæra linked list
                                                                                  // og tengjast email user
            userService.findByEmail(email).addLinkedPartner(currentUser.getId()); // email user að uppfæra linked list
                                                                                  // og tengjast current user
            userService.save(currentUser);
            System.out.println("current linked partner" + currentUser.getLinkedPartners());

            System.out.println("email user linked parnter " + userService.findByEmail(email).getLinkedPartners());
            return "redirect:/linkpartner";
        }
    }
    // truncate table name_card; og notendurnar
}
