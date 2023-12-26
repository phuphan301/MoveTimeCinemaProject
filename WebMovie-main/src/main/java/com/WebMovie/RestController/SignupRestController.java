package com.WebMovie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Service.ICustomerService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/add")
public class SignupRestController {
	@Autowired
	ICustomerService customerService;
	// @Autowired
	// private PasswordEncoder bCryptPasswordEncoder;

	@GetMapping()
	String sdd() {
		return "ko nhe";
	}

	@PostMapping("/userNoExist")
	public Customer addCustomerNoExist(@RequestBody Customer customer, HttpServletRequest request) {
		return customerService.addCustomer(customer);
	}
}
