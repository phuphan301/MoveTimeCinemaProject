package com.WebMovie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Room;


public interface RoomRepository extends JpaRepository<Room, Integer>{
	@Query("select DISTINCT o.NAME from Room o")
	List<Room> Roomdistinctname();

	@Query("select r.NAME from Room r, Cinemas c where r.ID_CINEMAS = ?1 and c.ID =?2")
	List<Room> findRoomByRoomAndCinemas(Integer IdRoom, Integer IdCinemas);
}
