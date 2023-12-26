package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Cinemas;
import com.WebMovie.Repository.CinemasRepository;
import com.WebMovie.Service.CinemaService;
@Service
public class CinamesServiceImpl implements CinemaService{

	@Autowired
	CinemasRepository cinemasRepository;

	@Override
	public Cinemas addCinemas(Cinemas cinemas) {
		// TODO Auto-generated method stub
		return cinemasRepository.save(cinemas);
	}

	@Override
	public List<Cinemas> getAlls() {
		// TODO Auto-generated method stub
		return cinemasRepository.findAll();
	}

	@Override
	public Cinemas updateMovie(Cinemas cinemas, Integer id) {
		// TODO Auto-generated method stub
		return cinemasRepository.save(cinemas);
	}

	@Override
	public Cinemas getMovieById(Integer id) {
		// TODO Auto-generated method stub
		return cinemasRepository.findById(id).get();
	}

	@Override
	public void deleteMovie(Integer id) {
		// TODO Auto-generated method stub
		cinemasRepository.deleteById(id);
	}

	@Override
	public List<Cinemas> findMovieByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

}
