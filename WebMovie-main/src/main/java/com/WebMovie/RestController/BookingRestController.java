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

import com.WebMovie.Entity.Booking;
import com.WebMovie.Repository.BookingRepo;
import com.WebMovie.Repository.BookingRepository;
import com.WebMovie.Service.BookingService;

@RestController
@CrossOrigin
@RequestMapping("/api/booking")
public class BookingRestController {

	@Autowired
	BookingService bookingService;

	@Autowired
	BookingRepository bookingRepository;

	@Autowired
	BookingRepo bookingRepo;

	@GetMapping("/all")
	List<Booking> getAll() {
		return bookingRepository.findAll();
	}

	@GetMapping("/{id}")
	List<Booking> getListBookingByIdRoom(@PathVariable("id") Integer id) {
		return bookingService.listBookingByIdRoom(id);
	}

	@GetMapping("/v1/{id}")
	Booking getBookingId(@PathVariable("id") Integer id) {
		return bookingService.getBookingById(id);
	}

	@PostMapping
	Booking addBooking(@RequestBody Booking booking) {
		return bookingService.addBooking(booking);
	}

	// @GetMapping("/update")
	// void updateBooking() {
	// bookingRepo.updateEntities();
	// }

	@GetMapping("/update/{id}")
	void updateStatusBooking(@PathVariable("id") Integer id) {
		bookingService.updateStatusBooking(id);
	}

	@GetMapping("/updateFailed/{id}")
	void updateStatusBookingWithFailed(@PathVariable("id") Integer id) {
		bookingService.updateStatusBookingWithFailed(id);
	}

	@GetMapping("/profile/{id}")
	List<Booking> getAllBookingByIdCustomer(@PathVariable("id") Integer id) {
		return bookingService.getAllBookingByIdCustomer(id);
	}

	// @GetMapping("/profile/{email}")
	// List<Booking> getAllBookingByIdCustomer(@PathVariable("email") String email)
	// {
	// return bookingService.getAllBookingByEmailCustomer(email);
	// }

	@GetMapping("/updateStatus")
	void updateStatus() {
		bookingRepo.updateStatusBookingAll();
	}

	@GetMapping("/updateStatusBookingByIdExistsTablePay")
	void updateStatusBookingByIdExistsTablePay() {
		bookingRepo.updateStatusBookingByIdExistsTablePay();
	}

}
