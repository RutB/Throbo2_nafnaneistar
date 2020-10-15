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
   
}