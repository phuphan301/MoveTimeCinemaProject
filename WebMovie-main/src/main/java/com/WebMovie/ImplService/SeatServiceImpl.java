package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Seat;
import com.WebMovie.Repository.SeatRepository;
import com.WebMovie.Service.SeatService;

@Service
public class SeatServiceImpl implements SeatService {

	@Autowired
	SeatRepository seatRepository;

	@Override
	public List<Seat> getAll() {
		// TODO Auto-generated method stub
		return seatRepository.findAll();
	}

	@Override
	public List<Seat> ListSeatByIdRoom(Integer id) {
		// TODO Auto-generated method stub
		return seatRepository.ListSeatByIdRoom(id);
	}

	@Override
	public List<Seat> addSeat(List<Seat> seat) {
		// TODO Auto-generated method stub
		return seatRepository.saveAll(seat);
	}

}
