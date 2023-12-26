package com.WebMovie.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "CUSTOMER")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ID;

	private String FULLNAME;
	private String PASSWORD;
	private String EMAIL;
	private String PHONENUMBER;
	private String ROLE;
	private Boolean EXIST;
	private String AVATAR;

	@Enumerated(EnumType.STRING)
	private Provider provider;

	public Provider getProvider() {
		return provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	// @JsonIgnore
	// @OneToMany(mappedBy = "ID_CUSTOMER")
	// private List<Booking> LIST_BOOKING;

	// @JsonIgnore
	// @OneToMany(mappedBy = "ID_CUSTOMER")
	// private List<Comment> LIST_COMMENT;
}
