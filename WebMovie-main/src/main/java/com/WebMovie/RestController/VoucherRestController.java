package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Voucher;
import com.WebMovie.Repository.BookingRepo;
import com.WebMovie.Service.VoucherService;

@RestController
@RequestMapping("/api/voucher")
@CrossOrigin
public class VoucherRestController {
	@Autowired
	VoucherService voucherService;

	@Autowired
	BookingRepo bookingRepo;

	@GetMapping("/all")
	List<Voucher> getAllVoucher() {
		return voucherService.getAll();
	}

	@GetMapping("/{id}")
	Voucher getVoucherById(@PathVariable("id") Integer id) {
		return voucherService.getVoucherById(id);
	}

	@PostMapping
	Voucher getAdd(@RequestBody Voucher voucher) {
		return voucherService.addVoucher(voucher);
	}

	@PutMapping("/{id}")
	Voucher updateVoucher(@PathVariable("id") Integer id, @RequestBody Voucher voucher) {
		return voucherService.updateVoucher(voucher, id);
	}

	@GetMapping("/updateStatusVoucher")
	void updateStatusVoucher() {
		bookingRepo.updateStatusVoucher();
	}
}
