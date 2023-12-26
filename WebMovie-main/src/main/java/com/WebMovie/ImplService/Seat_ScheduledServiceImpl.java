package com.WebMovie.ImplService;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Seat_Scheduled;
import com.WebMovie.Repository.Seat_ScheduledRepository;
import com.WebMovie.Service.Seat_ScheduledService;

@Service
public class Seat_ScheduledServiceImpl implements Seat_ScheduledService{

	@Autowired
	Seat_ScheduledRepository seat_ScheduledRepository;

	@Override
	public List<Seat_Scheduled> getAll() {
		// TODO Auto-generated method stub
		return seat_ScheduledRepository.findAll();
	}

	@Override
	public List<Seat_Scheduled> getSeat_ScheduledByIdRoom(Integer id, Date date, String time, Integer idMovieSh) {
		// TODO Auto-generated method stub
		return seat_ScheduledRepository.getAllSeat_ScheduledByIdRoom(id, date, time, idMovieSh);
	}

	@Override
	public List<Seat_Scheduled> getAllSeat_ScheduledByIdBooking(Integer id) {
		// TODO Auto-generated method stub
		return seat_ScheduledRepository.getAllSeat_ScheduledByIdBooking(id);
	}


}
