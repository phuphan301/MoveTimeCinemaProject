package poly.edu.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class homeController {

	@RequestMapping("/home/index")
	public String home() {
		return "layout/home";
	}
	@RequestMapping("/product/detail")
	public String detail() {
		return "product/_detail";
	}
	@RequestMapping("/order/checkout")
	public String checkout() {
		return "order/_checkout";
	}
}
