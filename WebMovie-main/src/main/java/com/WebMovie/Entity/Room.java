package com.WebMovie.Entity;

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
import lombok.Data;

@Data
@Entity
@Table(name = "ROOM")
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	private String NAME;

	@ManyToOne
	@JoinColumn(name = "ID_CINEMAS")
	private Cinemas ID_CINEMAS;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_ROOM")
	private List<Movie_Scheduled> ID_MOVIE_SCHEDULED;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_ROOM")
	private List<Movie_Scheduled> ID_SEAT;
}
