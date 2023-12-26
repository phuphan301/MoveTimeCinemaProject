package com.WebMovie.Entity;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "MOVIE_SCHEDULED")
public class Movie_Scheduled {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	@ManyToOne
	@JoinColumn(name = "ID_MOVIE")
	private Movie ID_MOVIE;

	@ManyToOne
	@JoinColumn(name = "ID_ROOM")
	private Room ID_ROOM;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_MOVIE_SCHEDULED")
	private List<Booking> LIST_BOOKING;

	@Temporal(TemporalType.DATE)
	private Date DATE;

	private String TIME_START;

	private String TIME_END;

	private Boolean STATUS;
}
