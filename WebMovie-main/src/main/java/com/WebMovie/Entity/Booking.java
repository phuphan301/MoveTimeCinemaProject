package com.WebMovie.Entity;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
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
@Table(name = "BOOKING")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	@ManyToOne
	@JoinColumn(name = "ID_CUSTOMER")
	private Customer ID_CUSTOMER;

	@ManyToOne
	@JoinColumn(name = "ID_MOVIE_SCHEDULED")
	private Movie_Scheduled ID_MOVIE_SCHEDULED;

	@Temporal(TemporalType.DATE)
	private Date DATE;

	private Integer PRICE;

	private String STATUS;// success failed unpaid

	@Column(name = "startTime", columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date startTime;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_BOOKING")
	private List<Seat_Scheduled> LIST_SEAT_SCHEDULED;

	@JsonIgnore
	@OneToMany(mappedBy = "ID_BOOKING")
	private List<Pay> LIST_PAY;
}
