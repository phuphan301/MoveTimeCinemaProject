package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.WebMovie.Entity.Cinemas;
import com.WebMovie.Service.CinemaService;

@RestController
@RequestMapping("/api/cinema")
@CrossOrigin
public class CinemasRestController {

	@Autowired
	CinemaService cinemaService;

	@GetMapping("/all")
	public List<Cinemas> getAlls(){
		return cinemaService.getAlls();
	}

	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Cinemas addCinemas(@RequestBody Cinemas cinemas) {
		return cinemaService.addCinemas(cinemas);
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Cinemas updateCinemas(@PathVariable Integer id, @RequestBody Cinemas cinemas){
		return cinemaService.updateMovie(cinemas, id);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<String> deleteCinemas(@PathVariable Integer id) {
	    try {
	        cinemaService.deleteMovie(id);
	        return ResponseEntity.ok("Xóa dữ liệu thành công");
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể xóa vì tồn tại ràng buộc tham chiếu");
	    }
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public Cinemas getCinemasById(@PathVariable Integer id) {
		return cinemaService.getMovieById(id);
	}
}
