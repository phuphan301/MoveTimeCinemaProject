package com.WebMovie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.WebMovie.Entity.Movie;


public interface MovieRepository extends JpaRepository<Movie, Integer>{
//	Optional<Movie> findMovieByNAME();

	@Query(value="SELECT o FROM MOVIE o WHERE o.NAME LIKE %:name%", nativeQuery = true)
	List<Movie> findMovieByNAME(@Param("name") String name);
}
