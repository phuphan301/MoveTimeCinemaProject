package com.WebMovie.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.WebMovie.Service.Movie_ScheduledService;

@Controller
public class Movie_SheduledController {
	@Autowired
	Movie_ScheduledService movie_ScheduledService;

	/*
	 * @GetMapping("/movie_sheduled/{id}") public List<Movie_Scheduled>
	 * moviedetail(@PathVariable("id") Integer id, Model model, HttpServletRequest
	 * httpServletRequest) { model.addAttribute("movie_sheduled1",
	 * movie_ScheduledService.listMovieSheduledById(id)); return }
	 */
}
