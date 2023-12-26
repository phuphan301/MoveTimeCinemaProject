package com.WebMovie.RestController;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Seat_Scheduled;
import com.WebMovie.Repository.Seat_ScheduledRepository;
import com.WebMovie.Service.Seat_ScheduledService;

@CrossOrigin
@RestController
@RequestMapping("/api/seat_scheduled")
public class Seat_ScheduledRestController {

	@Autowired
	Seat_ScheduledService seat_ScheduledService;
	@Autowired
	Seat_ScheduledRepository seat_ScheduledRepository;

	@GetMapping("/all")
	List<Seat_Scheduled> getAll(){
		return seat_ScheduledService.getAll();
	}

	@GetMapping("/{id}/{date}/{time}/{idMovieSh}")
	List<Seat_Scheduled> getListSeat_scheduledByIdRoom(@PathVariable("id") Integer id,
													   @PathVariable("date") Date date,
													   @PathVariable("time") String time,
													   @PathVariable("idMovieSh") Integer idMovieSh){
		return seat_ScheduledService.getSeat_ScheduledByIdRoom(id, date, time, idMovieSh);
	}

	@PostMapping
	Seat_Scheduled addScheduled(@RequestBody Seat_Scheduled seat_Scheduled) {

		return seat_ScheduledRepository.save(seat_Scheduled);
	}

	@GetMapping("/v1/{id}")
	List<Seat_Scheduled> getAllSeat_ScheduledByIdBooking(@PathVariable("id") Integer id){
		return seat_ScheduledRepository.getAllSeat_ScheduledByIdBooking(id);
	}
}
