package is.hi.hbv501g.nafnaneistar.nafnaneistar.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
    
    @RequestMapping("/")
    public String Home(){
        return "Home";
    }
}
