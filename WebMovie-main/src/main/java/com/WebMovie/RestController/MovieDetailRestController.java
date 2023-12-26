package com.WebMovie.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Movie;
import com.WebMovie.ImplService.MovieServiceImpl;

@CrossOrigin
@RestController
public class MovieDetailRestController {

	@Autowired
	MovieServiceImpl movieServiceImpl;

	@GetMapping("/v1/movie/{id}")
	public Movie getMovieById(@PathVariable Integer id) {
		return movieServiceImpl.getMovieById(id);
	}
}
