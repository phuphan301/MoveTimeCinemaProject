package com.WebMovie.Repository;

import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class BookingRepo {
	@PersistenceContext
	private EntityManager entityManager;

	// @Transactional
	// public void updateEntities() {
	// String jpql = "UPDATE Movie_Scheduled b " +
	// "SET b.STATUS = 'false' " +
	// "WHERE b.ID_MOVIE_SCHEDULED IN (SELECT ms.ID FROM Movie_Scheduled ms WHERE
	// ms.DATE < GETDATE())";
	// entityManager.createQuery(jpql).executeUpdate();
	// }

	@Transactional
	public void updateStatusMovie_Scheduled() {
		String jpql = "UPDATE Movie_Scheduled b SET b.STATUS = false WHERE b.DATE <= current_date() and b.TIME_END < current_time()";
		entityManager.createQuery(jpql).executeUpdate();
	}

	@Transactional
	public void updateStatusBookingAll() {
		String updateStatus = "UPDATE Booking b SET b.STATUS = 'failed' WHERE b.STATUS = 'unpaid' AND DATEDIFF(MINUTE, b.startTime, CURRENT_TIMESTAMP()) > 15";
		entityManager.createQuery(updateStatus).executeUpdate();
	}

	@Transactional
	public void updateStatusVoucher() {
		String jpql = "UPDATE Voucher v SET v.STATUS = false WHERE v.DATE_END < GETDATE()";
		entityManager.createQuery(jpql).executeUpdate();
	}

	@Transactional
	public void updateStatusBookingByIdExistsTablePay() {
		String updateStatus = "UPDATE Booking b\r\n" + //
				"SET b.STATUS = 'success'\r\n" + //
				"WHERE b.STATUS = 'unpaid' AND EXISTS(SELECT p.ID_BOOKING FROM Pay p)";
		entityManager.createQuery(updateStatus).executeUpdate();
	}
}
