package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Movie_Scheduled;
import com.WebMovie.Repository.Movie_ScheduledRepository;
import com.WebMovie.Service.Movie_ScheduledService;
@Service
public class Movie_ScheduledServiceImpl implements Movie_ScheduledService{

	@Autowired
	Movie_ScheduledRepository movie_ScheduledRepository;

	@Override
	public Movie_Scheduled addMovie_Scheduled(Movie_Scheduled movie_Scheduled) {
		// TODO Auto-generated method stub
		movie_Scheduled.setSTATUS(true);
		return movie_ScheduledRepository.save(movie_Scheduled);
	}

	@Override
	public List<Movie_Scheduled> getAlls() {
		// TODO Auto-generated method stub
		return movie_ScheduledRepository.findAll();
	}

	@Override
	public Movie_Scheduled updateMovie_Scheduled(Movie_Scheduled movie_Scheduled, Integer id) {
		// TODO Auto-generated method stub
		return movie_ScheduledRepository.save(movie_Scheduled);
	}

	@Override
	public Movie_Scheduled getMovie_ScheduledById(Integer id) {
		// TODO Auto-generated method stub
		return movie_ScheduledRepository.findById(id).get();
	}

	@Override
	public void deleteMovie_Scheduled(Integer id) {
		// TODO Auto-generated method stub
		movie_ScheduledRepository.deleteById(id);
	}

	@Override
	public List<Movie_Scheduled> listMovieSheduledById(Integer id) {
		// TODO Auto-generated method stub
		return movie_ScheduledRepository.listMovieScheduledByIdMovie(id);
	}

	@Override
	public List<Movie_Scheduled> listDateMovieScheduled(Integer id) {
		// TODO Auto-generated method stub
		return movie_ScheduledRepository.listDateMovieScheduled(id);
	}

}
