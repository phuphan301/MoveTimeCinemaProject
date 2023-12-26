package com.WebMovie.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Entity.Provider;
import com.WebMovie.Repository.CustomerRepository;

@Service
public class CustomerServiceGoogle {
	@Autowired
	CustomerRepository customerRepository;

	public void processOAuthPostLoginGoogle(String email) {
		 Customer existUser = customerRepository.getUserByEmail(email);
		 System.out.println(existUser);
	        if (existUser == null) {
	            Customer newUser = new Customer();
	            newUser.setFULLNAME("name");
	            newUser.setEMAIL(email);
	            newUser.setProvider(Provider.GOOGLE);
	            newUser.setROLE("ROLE_USER");
	            newUser.setEXIST(true);
	            customerRepository.save(newUser);
	        }
    }
//	public void yourMethod(OAuth2AuthenticationToken authentication) {
//        // Lấy danh sách các quyền (authorities) từ token
//        List<GrantedAuthority> authorities = new ArrayList<>(authentication.getAuthorities());
//
//        // Duyệt qua danh sách quyền và thực hiện các xử lý cần thiết
//        for (GrantedAuthority authority : authorities) {
//            System.out.println("Authority: " + authority.getAuthority());
//            // Thực hiện xử lý khác tùy thuộc vào quyền
//        }
//    }
}
