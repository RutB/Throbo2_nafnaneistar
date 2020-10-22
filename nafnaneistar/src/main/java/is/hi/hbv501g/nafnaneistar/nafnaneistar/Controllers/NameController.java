package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import java.util.ArrayList;
import java.util.HashMap;
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
        if(!UserUtils.isLoggedIn(currentUser)) return "redirect:/login";
                
        int fnames = UserUtils.getGenderList(currentUser.getApprovedNames().keySet(), nameService, 1).size();
        int mnames = UserUtils.getGenderList(currentUser.getApprovedNames().keySet(), nameService, 0).size();

        int totalmnamesleft = UserUtils.getGenderList(currentUser,nameService,0).size();
        int totalfnamesleft = UserUtils.getGenderList(currentUser,nameService,1).size();

        int totalfnames = nameService.countByGender(true);
        int totalmnames = nameService.countByGender(false);
        
        int femaledisliked = Math.abs(totalfnames - totalfnamesleft + fnames);
        int maledisliked = Math.abs(totalmnames - totalmnamesleft + mnames);
        
        Integer[] femalestats = new Integer[] {fnames,femaledisliked,totalfnamesleft};
        Integer[] malestats = new Integer[] {mnames,maledisliked,totalmnamesleft};

        String meaning = nameService.findDescriptionByName(currentUser.getName().split(" ")[0]);
        ArrayList<User> partners = new ArrayList<User>();
        for(Long id : currentUser.getLinkedPartners())
            partners.add(userService.findById(id).get());

        HashMap<NameCard,Integer> ncs = new HashMap<>();
        currentUser.getApprovedNames().forEach((key,value) -> ncs.put((nameService.findById(key).orElse(null)),value)); 

        model.addAttribute("ncs", ncs);
        model.addAttribute("femalestats", femalestats);
        model.addAttribute("malestats", malestats);
        model.addAttribute("partners", partners);
        model.addAttribute("meaning", meaning);
        model.addAttribute("user", currentUser);
        return "viewliked";
    }
}
