package com.WebMovie.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="SEAT_SCHEDULED")
public class Seat_Scheduled {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	@ManyToOne
	@JoinColumn(name = "ID_SEAT")
	private Seat ID_SEAT;

	@ManyToOne
	@JoinColumn(name = "ID_BOOKING")
	private Booking ID_BOOKING;
}
