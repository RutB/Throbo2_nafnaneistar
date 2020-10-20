package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.ArrayList;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.NameCard;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Entities.User;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.NameService;
import is.hi.hbv501g.nafnaneistar.nafnaneistar.Services.UserService;
import is.hi.hbv501g.nafnaneistar.utils.UserUtils;

@Controller
public class NameController {
    private UserService userService;
    private NameService nameService;


        @Autowired
        public NameController(UserService userService, NameService nameService) {
        this.userService = userService;
        this.nameService = nameService;
    }

    @RequestMapping(value = "/viewnames", method = RequestMethod.GET)
    public String ViewNames(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser))
            return "redirect:/login";
        model.addAttribute("user", currentUser);
        model.addAttribute("names", nameService.findAll());
        return "viewnames";
    }

    @RequestMapping(value = "/swipe", method = RequestMethod.GET)
    public String SwipeNames(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser))
            return "redirect:/login";
        int mSize = UserUtils.getGenderList(currentUser,nameService,0).size();
        int fSize = UserUtils.getGenderList(currentUser,nameService,1).size();
        
        model.addAttribute("maleleft","("+mSize+")" );
        model.addAttribute("femaleleft","("+fSize+")" );

        model.addAttribute("user", currentUser);
        Optional<NameCard> nc = nameService.findById(currentUser.getRandomNameId());
        model.addAttribute("name",nc);
        return "Swipe";
    }

    @RequestMapping(value = "/viewliked", method = RequestMethod.GET)
    public String ViewLiked(Model model, HttpSession session) {
        User currentUser = (User) session.getAttribute("currentUser");
        if(!UserUtils.isLoggedIn(currentUser))
            return "redirect:/login";
        ArrayList<User> partners = new ArrayList<User>();
        for(Long id : currentUser.getLinkedPartners()){
            partners.add(userService.findById(id).get());
        }
        model.addAttribute("partners", partners);
        System.out.println(partners.size());
        model.addAttribute("user", currentUser);
        model.addAttribute("names", nameService.findAll());
        return "viewliked";
    }
}
