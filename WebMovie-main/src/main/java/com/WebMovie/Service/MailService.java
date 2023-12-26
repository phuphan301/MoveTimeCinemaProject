package com.WebMovie.Service;

import com.WebMovie.Entity.Booking;
import com.WebMovie.Entity.Customer;

public interface MailService {
	void sendMailTest();
	void sendMailCreateCustomer(Customer dto);
	void sendMailUpdateCustomer(Customer dto);
	void sendMailBookingMovie(Booking bto);
}
