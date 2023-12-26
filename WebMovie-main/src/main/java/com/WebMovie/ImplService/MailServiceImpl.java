package com.WebMovie.ImplService;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Booking;
import com.WebMovie.Entity.Customer;
import com.WebMovie.Service.MailService;
import com.WebMovie.Service.ThymeleafService;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService {

	@Autowired
	JavaMailSender mailSender;

	@Autowired
	ThymeleafService thymeleafService;

	@Value("${spring.mail.username}")
	private String email;

	@Override
	public void sendMailTest() {
		// TODO Auto-generated method stub
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(
					message,
					MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());
			helper.setFrom(email);
			helper.setText(thymeleafService.creatContent("mail-sender-test.html", null), true);
			helper.setTo("datphung1908@gmail.com");
			helper.setSubject("MailTest with template html");
			mailSender.send(message);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	@Override
	public void sendMailCreateCustomer(Customer dto) {
		// TODO Auto-generated method stub
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(
					message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
			helper.setTo(dto.getEMAIL());
			helper.setSubject("Mail Create Customer");
			// Object[] bccObjects = dto.getEMAIL().toArray();
			// String[] bcc = Arrays.copyOf(bccObjects, bccObjects.length, String[].class);
			// helper.setBcc(bcc);
			Map<String, Object> variables = new HashMap<>();
			variables.put("full_name", dto.getFULLNAME());
			variables.put("email", dto.getEMAIL());
			variables.put("phonenumber", dto.getPHONENUMBER());
			variables.put("role", dto.getROLE());
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			variables.put("date", sdf.format(new Date()));

			helper.setText(thymeleafService.creatContent("create-customer-mail-template.html", variables), true);

			mailSender.send(message);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	@Override
	public void sendMailUpdateCustomer(Customer dto) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(
					message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
			helper.setTo(dto.getEMAIL());
			helper.setSubject("Mail Update Customer");
			// Object[] bccObjects = dto.getEMAIL().toArray();
			// String[] bcc = Arrays.copyOf(bccObjects, bccObjects.length, String[].class);
			// helper.setBcc(bcc);
			Map<String, Object> variables = new HashMap<>();
			variables.put("full_name", dto.getFULLNAME());
			variables.put("email", dto.getEMAIL());
			variables.put("phonenumber", dto.getPHONENUMBER());
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			variables.put("date", sdf.format(new Date()));

			helper.setText(thymeleafService.creatContent("update-customer.html", variables), true);

			mailSender.send(message);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

	@Override
	public void sendMailBookingMovie(Booking bto) {
		// TODO Auto-generated method stub
//		try {
//			MimeMessage message = mailSender.createMimeMessage();
//			MimeMessageHelper helper = new MimeMessageHelper(
//					message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
//
//			Customer customer = customerService.getCustomerGetById(bto.getID_CUSTOMER().getID());
//			String email = customer.getEMAIL();
//			//helper.setTo(dto.getEMAIL());
//			System.out.println(email);
//			helper.setTo(email);
//			helper.setSubject("Booking Seat Movie");
//			Map<String, Object> variables = new HashMap<>();
////			variables.put("full_name", dto.getFULLNAME());
////			variables.put("email", dto.getEMAIL());
////			variables.put("phonenumber", dto.getPHONENUMBER());
//			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
//			variables.put("date", sdf.format(new Date()));
//
//			helper.setText(thymeleafService.creatContent("addBooking.html", variables), true);
//
//			mailSender.send(message);
//		} catch (Exception e) {
//			// TODO: handle exception
//			e.printStackTrace();
//		}
	}
}
