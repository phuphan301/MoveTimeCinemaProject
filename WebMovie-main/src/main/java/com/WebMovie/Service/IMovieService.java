package com.WebMovie.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Movie;


@Service
public interface IMovieService {
	Movie addMovie(Movie movie);
	List<Movie> getAlls();
	Movie updateMovie(Movie movie, Integer id);
	Movie getMovieById(Integer id);
	void deleteMovie(Integer id);

	List<Movie> findMovieByName(String name);
}
