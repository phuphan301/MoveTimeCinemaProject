package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Booking;
import com.WebMovie.Repository.BookingRepository;
import com.WebMovie.Service.BookingService;
import com.WebMovie.Service.MailService;

@Service
public class BookingServiceImlp implements BookingService {

	@Autowired
	BookingRepository bookingRepository;

	@Autowired
	MailService mailService;

	@Override
	public List<Booking> listBookingByIdRoom(Integer id) {
		// TODO Auto-generated method stub
		return bookingRepository.listBookingByIdRoom(id);
	}

	@Override
	public Booking addBooking(Booking booking) {
		// TODO Auto-generated method stub
		booking.setSTATUS("unpaid");
		// mailService.sendMailBookingMovie(booking);
		return bookingRepository.save(booking);
	}

	@Override
	public Booking getBookingById(Integer id) {
		// TODO Auto-generated method stub
		return bookingRepository.findById(id).get();
	}

	@Override
	public void updateStatusBooking(Integer id) {
		// mailService.sendMailBookingMovie(customer, booking);
		bookingRepository.updateStatusBooking(id);
	}

	@Override
	public void updateStatusBookingWithFailed(Integer id) {
		// TODO Auto-generated method stub
		bookingRepository.updateStatusBookingWithFailed(id);
	}

	@Override
	public List<Booking> getAllBookingByIdCustomer(Integer id) {
		// TODO Auto-generated method stub
		return bookingRepository.geAllBookingByIdCustomer(id);
	}

	// @Override
	// public List<Booking> getAllBookingByEmailCustomer(String email) {
	// // TODO Auto-generated method stub
	// return bookingRepository.geAllBookingByEmailCustomer(email);
	// }

}
