package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Room;
import com.WebMovie.Repository.RoomRepository;
import com.WebMovie.Service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	RoomRepository roomRepository;

	@Override
	public Room addRoom(Room room) {
		// TODO Auto-generated method stub
		return roomRepository.save(room);
	}

	@Override
	public List<Room> getAlls() {
		// TODO Auto-generated method stub
		return roomRepository.findAll();
	}

	@Override
	public Room updateRoom(Room room, Integer id) {
		// TODO Auto-generated method stub
		return roomRepository.save(room);
	}

	@Override
	public Room getRoomById(Integer id) {
		// TODO Auto-generated method stub
		return roomRepository.findById(id).get();
	}

	@Override
	public void deleteRoom(Integer id) {
		// TODO Auto-generated method stub
		roomRepository.deleteById(id);
	}

	@Override
	public List<Room> Roomdistinctname() {
		// TODO Auto-generated method stub
		return roomRepository.findAll();
	}
}
