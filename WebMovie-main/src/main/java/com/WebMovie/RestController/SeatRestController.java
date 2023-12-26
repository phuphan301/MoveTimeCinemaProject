package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Seat;
import com.WebMovie.Service.SeatService;

@CrossOrigin
@RestController
@RequestMapping("/api/seat")
public class SeatRestController {

	@Autowired
	SeatService seatService;

	@GetMapping("/all")
	List<Seat> getAll() {
		return seatService.getAll();
	}

	@GetMapping("/{id}")
	List<Seat> listSeatByIdRoom(@PathVariable("id") Integer id) {
		return seatService.ListSeatByIdRoom(id);
	}

	@PostMapping("/create")
	public ResponseEntity<String> createSeats(@RequestBody List<Seat> seats) {
		for (Seat seat : seats) {
			setSeatTypeAndPrice(seat);
		}

		seatService.addSeat(seats);
		return ResponseEntity.ok("Seats created successfully");
	}

	private void setSeatTypeAndPrice(Seat seat) {
		String row = seat.getSEAT_ROW();
		if (row.equals("A") || row.equals("B")) {
			seat.setSEAT_TYPE("ECO");
			seat.setSEAT_PRICE(40000);
		} else if (row.equals("C") || row.equals("D")) {
			seat.setSEAT_TYPE("VIP");
			seat.setSEAT_PRICE(60000);
		} else {
			seat.setSEAT_TYPE("ECO");
			seat.setSEAT_PRICE(40000);
		}
	}
}
