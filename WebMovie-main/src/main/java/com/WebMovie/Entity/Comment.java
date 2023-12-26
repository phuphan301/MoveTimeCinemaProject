package com.WebMovie.Entity;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "COMMENT")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;
	private String CONTENT;

	@ManyToOne
	@JoinColumn(name = "ID_COMMENT")
	private Comment ID_COMMENT;

	@ManyToOne
	@JoinColumn(name = "ID_CUSTOMER")
	private Customer ID_CUSTOMER;

	@ManyToOne
	@JoinColumn(name = "ID_MOVIE")
	private Movie ID_MOVIE;

	@Column(name = "TIME_COMMENT", columnDefinition = "DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date TIME_COMMENT;

}
