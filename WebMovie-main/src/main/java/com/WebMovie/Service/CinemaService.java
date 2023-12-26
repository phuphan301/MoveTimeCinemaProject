package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Cinemas;

public interface CinemaService {
	Cinemas addCinemas(Cinemas cinemas);
	List<Cinemas> getAlls();
	Cinemas updateMovie(Cinemas cinemas, Integer id);
	Cinemas getMovieById(Integer id);
	void deleteMovie(Integer id);
	List<Cinemas> findMovieByName(String name);
}
