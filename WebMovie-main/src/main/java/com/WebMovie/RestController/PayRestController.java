package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Pay;
import com.WebMovie.Repository.PayRepository;
import com.WebMovie.Service.PayService;

@CrossOrigin
@RestController
@RequestMapping("/api/pay")
public class PayRestController {

	@Autowired
	PayService payService;
	@Autowired
	PayRepository payRepository;

	@PostMapping
	Pay addPay(@RequestBody Pay pay) {
		return payService.addPay(pay);
	}

	@GetMapping("/all")
	List<Pay> getAllPay() {
		return payService.geAllPay();
	}

	@GetMapping("/{id}")
	Pay listPayIdBooking(@PathVariable("id") Integer id) {
		return payRepository.listPayByIdBooking(id);
	}
}