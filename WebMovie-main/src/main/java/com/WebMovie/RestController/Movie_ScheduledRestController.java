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

import com.WebMovie.Entity.Movie_Scheduled;
import com.WebMovie.Repository.BookingRepo;
import com.WebMovie.Service.Movie_ScheduledService;

@RestController
@RequestMapping("/api/movie_scheduled")
@CrossOrigin
public class Movie_ScheduledRestController {
	@Autowired
	Movie_ScheduledService movie_ScheduledService;

	@Autowired
	BookingRepo bookingRepo;

	@GetMapping("/all")
	List<Movie_Scheduled> getAll(){
		return movie_ScheduledService.getAlls();
	}

	@GetMapping("/detail/{id}")
	List<Movie_Scheduled> listMovieScheduled(@PathVariable("id") Integer id){
		return movie_ScheduledService.listMovieSheduledById(id);
	}

	@GetMapping("/date/{id}")
	List<Movie_Scheduled> listDate(@PathVariable("id") Integer id){
		return movie_ScheduledService.listDateMovieScheduled(id);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	Movie_Scheduled addMovie_Scheduled(@RequestBody Movie_Scheduled movie_Scheduled) {
		return movie_ScheduledService.addMovie_Scheduled(movie_Scheduled);
	}

	@PutMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	Movie_Scheduled updateMovie_Scheduled(@PathVariable Integer id,@RequestBody Movie_Scheduled movie_Scheduled) {
		return movie_ScheduledService.updateMovie_Scheduled(movie_Scheduled, id);
	}

	@GetMapping("/{id}")
	Movie_Scheduled getMovie_ScheduledById(@PathVariable Integer id) {
		return movie_ScheduledService.getMovie_ScheduledById(id);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	void DeleteMoviScheduleById(@PathVariable Integer id) {
		movie_ScheduledService.deleteMovie_Scheduled(id);
	}

	@GetMapping("/updateStatusMovie_Scheduled")
	void updateStatusMovie_Scheduled() {
		bookingRepo.updateStatusMovie_Scheduled();
	}
}
