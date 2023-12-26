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
@Table(name = "PAY")
public class Pay {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	@ManyToOne
	@JoinColumn(name = "ID_BOOKING")
	private Booking ID_BOOKING;

	private Double PRICE;
	private String CURRENCY;
	private String METHOD;
	private String INTENT;
	private String DESCRIPTION;

	@ManyToOne
	@JoinColumn(name = "ID_VOUCHER")
	private Voucher ID_VOUCHER;
}
