package com.WebMovie.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "MOVIE")
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	private String NAME;
	private String TIME;
	private String IMAGE;

	private String DESCRIPTION;

	private String DIRETORS;

	private String ACTORS;
	@Temporal(TemporalType.DATE)
	private Date PUBLISH_DATE;

	private String TRAILER;
	private Boolean EXIST;

	private String GERNE;
	private String AGE;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_MOVIE")
	List<Movie_Scheduled> MOVIE_SCHEDULED;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_MOVIE")
	private List<Comment> LIST_COMMENT;
}
