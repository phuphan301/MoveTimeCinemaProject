package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Movie;
import com.WebMovie.ImplService.MovieServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/movie")
public class MovieRestController {
	@Autowired
	MovieServiceImpl movieServiceImpl;

	@GetMapping("/all")
	public List<Movie> getAlls(){
		return movieServiceImpl.getAlls();
	}

	@PostMapping()
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Movie addMovie(@RequestBody Movie movie) {
		return movieServiceImpl.addMovie(movie);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Movie updateMovie(@PathVariable Integer id,@RequestBody Movie movie) {
		return movieServiceImpl.updateMovie(movie, id);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Movie getMovieById(@PathVariable Integer id) {
		return movieServiceImpl.getMovieById(id);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public void deleteMovie(@PathVariable Integer id) {
		movieServiceImpl.deleteMovie(id);
	}
}
