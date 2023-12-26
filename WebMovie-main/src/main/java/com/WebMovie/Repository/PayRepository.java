package com.WebMovie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Pay;


public interface PayRepository extends JpaRepository<Pay, Integer>{
	@Query("Select p from Pay p, Booking b where p.ID_BOOKING = b.ID AND b.ID = ?1")
	Pay listPayByIdBooking(Integer id);
}
