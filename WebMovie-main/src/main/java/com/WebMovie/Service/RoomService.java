package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Room;

public interface RoomService {
	Room addRoom(Room room);
	List<Room> getAlls();
	Room updateRoom(Room room, Integer id);
	Room getRoomById(Integer id);
	void deleteRoom(Integer id);
	List<Room> Roomdistinctname();
}
