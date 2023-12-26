package com.WebMovie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Seat;


public interface SeatRepository extends JpaRepository<Seat, Integer>{

	@Query("SELECT o FROM Seat o, Room r where r.ID=o.ID_ROOM and r.ID =?1")
	List<Seat> ListSeatByIdRoom(Integer id);
}
