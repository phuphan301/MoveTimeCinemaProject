package com.WebMovie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Movie_Scheduled;


public interface Movie_ScheduledRepository extends JpaRepository<Movie_Scheduled, Integer>{
	@Query("SELECT mc FROM Movie m, Movie_Scheduled mc WHERE mc.ID_MOVIE = m.ID and mc.DATE >= GETDATE()-1 and m.ID=?1")
	List<Movie_Scheduled> listMovieScheduledByIdMovie(Integer idMovie);

	@Query("SELECT CAST(mc.DATE AS java.sql.Date) FROM Movie m, Movie_Scheduled mc WHERE mc.ID_MOVIE = m.ID and mc.DATE >= GETDATE()-1 and m.ID=?1")
	List<Movie_Scheduled> listDateMovieScheduled(Integer idMovie);
}

//CONVERT(time, your_column) <= CONVERT(time, GETDATE(), 108)