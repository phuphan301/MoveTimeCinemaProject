package com.WebMovie.Repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Seat_Scheduled;

public interface Seat_ScheduledRepository extends JpaRepository<Seat_Scheduled, Integer>{
	@Query("SELECT ss FROM Booking b, Seat_Scheduled ss, Room r, Movie_Scheduled ms "
			+ "where ms.ID = b.ID_MOVIE_SCHEDULED "
			+ "AND b.ID = ss.ID_BOOKING "
			+ "AND b.STATUS IN ('success', 'unpaid')"
			+ "AND ms.STATUS = 'TRUE'"
			+ "AND ms.ID_ROOM = r.ID AND r.ID = ?1 AND ms.DATE = ?2 AND ms.TIME_START = ?3 AND ms.ID = ?4")
	List<Seat_Scheduled> getAllSeat_ScheduledByIdRoom(Integer id, Date date, String time, Integer idMovieS);

	@Query("SELECT ss FROM Booking b, Seat s, Seat_Scheduled ss where b.ID = ss.ID_BOOKING AND ss.ID_SEAT = s.ID AND b.ID = ?1")
	List<Seat_Scheduled> getAllSeat_ScheduledByIdBooking(Integer id);
}
