package com.WebMovie.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Service.MailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailRestController {
	private final MailService mailService;

	@GetMapping("/send-test")
	public String sendMailTest() {
		mailService.sendMailTest();
		return "success";
	}
}
