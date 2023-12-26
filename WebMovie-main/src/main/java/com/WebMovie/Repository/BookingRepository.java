package com.WebMovie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.WebMovie.Entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
	@Query("select b from Booking b, Movie_Scheduled ms, "
			+ "Room r where b.ID_MOVIE_SCHEDULED = ms.ID "
			+ "and b.STATUS IN ('success', 'unpaid')"
			+ "and ms.STATUS = 'TRUE' "
			+ "and ms.ID_ROOM = r.ID "
			+ "and r.ID = ?1")
	List<Booking> listBookingByIdRoom(Integer id);

	// @Transactional
	// @Modifying
	// @Query("UPDATE Booking SET STATUS = 'false' FROM Booking b INNER JOIN
	// Movie_Scheduled ms ON b.ID_MOVIE_SCHEDULED = ms.ID WHERE ms.DATE <
	// GETDATE();")
	// void updateListBooking();
	// @PersistenceContext
	// private EntityManager entityManager;
	//
	// @Transactional
	// public void updateEntities() {
	// String jpql = "UPDATE Booking b " +
	// "SET b.STATUS = 'false' " +
	// "WHERE b.ID_MOVIE_SCHEDULED = (SELECT ms.ID FROM Movie_Scheduled ms WHERE
	// ms.DATE < GETDATE())";
	// entityManager.createQuery(jpql).executeUpdate();
	// }
	@Transactional
	@Modifying
	@Query("update Booking b SET b.STATUS = 'success' WHERE b.ID = :id")
	void updateStatusBooking(@Param("id") Integer id);

	@Transactional
	@Modifying
	@Query("update Booking b SET b.STATUS = 'failed' WHERE b.ID = :id")
	void updateStatusBookingWithFailed(@Param("id") Integer id);

	@Query("SELECT b FROM Booking b, Customer c, Seat_Scheduled ss where ss.ID_BOOKING = b.ID AND c.ID = b.ID_CUSTOMER AND c.ID = ?1")
	List<Booking> geAllBookingByIdCustomer(Integer id);

	@Query("SELECT b FROM Booking b, Customer c, Seat_Scheduled ss where ss.ID_BOOKING = b.ID AND c.ID = b.ID_CUSTOMER AND c.ID = :email")
	List<Booking> geAllBookingByEmailCustomer(@Param("email") String email);
}
