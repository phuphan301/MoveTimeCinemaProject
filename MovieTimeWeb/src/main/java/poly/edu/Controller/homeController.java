package poly.edu.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class homeController {

	@RequestMapping("/home/index")
	public String home() {
		return "layout/home";
	}
	@RequestMapping("/order/detail")
	public String order() {
		return "order/_detail";
	}
}
