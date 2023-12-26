package com.WebMovie.WebSecurityConfig;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Entity.Provider;
import com.WebMovie.Repository.CustomerRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Autowired
	CustomerRepository customerRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oauth2User = super.loadUser(userRequest);
		String userEmail = (String) oauth2User.getAttribute("email");
		Provider provider = Provider.LOCAL;
		Optional<Customer> localUser = customerRepository.findCustomerByEMAILAndProvider(userEmail, provider);
		Set<GrantedAuthority> authorities = getAuthoritiesFromDatabase(oauth2User);
		if (localUser.isPresent()) {
			throw new BadCredentialsException("An account with this email already exists with provider LOCAL.");
		}

		return new CustomOAuth2User(oauth2User, authorities);
	}

	private Set<GrantedAuthority> getAuthoritiesFromDatabase(OAuth2User oauth2User) {
		String email = oauth2User.getAttribute("email");
		Optional<Customer> userOptional = customerRepository.findByEMAIL(email);
		System.out.println("name: " + oauth2User.getAttribute("name"));
		if (!userOptional.isPresent()) {
			System.out.println("null");

			// Thêm mới vào database nếu không tồn tại
			Customer customer = new Customer();
			customer.setEMAIL(email);
			customer.setEXIST(true);
			customer.setROLE("ROLE_USER");
			customer.setProvider(Provider.GOOGLE);
			customer.setFULLNAME(oauth2User.getAttribute("name"));
			customerRepository.save(customer);

			// Lấy thông tin mới từ database
			userOptional = customerRepository.findByEMAIL(email);
		}

		Set<GrantedAuthority> authorities = new HashSet<>();

		userOptional.ifPresent(customer -> {
			// Lấy giá trị trong cột role để xác định quyền của người dùng
			String role = customer.getROLE();

			// Chuyển đổi giá trị cột role thành danh sách GrantedAuthority
			authorities.add(new SimpleGrantedAuthority(role));
		});

		return authorities;
	}

}