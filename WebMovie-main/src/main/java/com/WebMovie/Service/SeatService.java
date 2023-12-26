package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Seat;

public interface SeatService {
	List<Seat> getAll();

	List<Seat> ListSeatByIdRoom(Integer id);

	List<Seat> addSeat(List<Seat> seat);
}
