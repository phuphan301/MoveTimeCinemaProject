package com.WebMovie.Service;

import java.sql.Date;
import java.util.List;

import com.WebMovie.Entity.Seat_Scheduled;

public interface Seat_ScheduledService {
	List<Seat_Scheduled> getAll();

	List<Seat_Scheduled> getSeat_ScheduledByIdRoom(Integer id, Date date, String time, Integer idMovieSh);

	List<Seat_Scheduled> getAllSeat_ScheduledByIdBooking(Integer id);
}
