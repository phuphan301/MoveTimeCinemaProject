package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Movie;
import com.WebMovie.Repository.MovieRepository;
import com.WebMovie.Service.IMovieService;
@Service
public class MovieServiceImpl implements IMovieService{

	@Autowired
	MovieRepository movieRepository;

	@Override
	public Movie addMovie(Movie movie) {
		// TODO Auto-generated method stub
		movie.setEXIST(true);
		return movieRepository.save(movie);
	}

	@Override
	public List<Movie> getAlls() {
		// TODO Auto-generated method stub
		return movieRepository.findAll();
	}

	@Override
	public Movie updateMovie(Movie movie, Integer id) {
		// TODO Auto-generated method stub
//		movie.setEXIST(true);
		return movieRepository.save(movie);
	}

	@Override
	public Movie getMovieById(Integer id) {
		// TODO Auto-generated method stub
		return movieRepository.findById(id).get();
	}

	@Override
	public void deleteMovie(Integer id) {
		// TODO Auto-generated method stub
		movieRepository.deleteById(id);

	}

	@Override
	public List<Movie> findMovieByName(String name) {
		// TODO Auto-generated method stub
		return movieRepository.findMovieByNAME(name);
	}

}
