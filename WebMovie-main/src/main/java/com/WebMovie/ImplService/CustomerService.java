package com.WebMovie.ImplService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Entity.Provider;
import com.WebMovie.Exception.CustomerAlreadyExistsException;
import com.WebMovie.Repository.CustomerRepository;
import com.WebMovie.Service.ICustomerService;
import com.WebMovie.Service.MailService;
import com.WebMovie.WebSecurityConfig.CustomOAuth2User;
import com.WebMovie.WebSecurityConfig.UserInfoDetails;

@Service
public class CustomerService implements ICustomerService {

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	@Autowired
	MailService mailService;

	@Override
	public Customer addCustomer(Customer customer) {
		// TODO Auto-generated method stub
		if (emailExists(customer.getEMAIL())) {
			throw new CustomerAlreadyExistsException(customer.getEMAIL() + "exists");
		}
		customer.setEXIST(true);
		customer.setROLE("ROLE_USER");
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		return customerRepository.save(customer);
	}

	public boolean emailExists(String email) {
		return customerRepository.findByEMAIL(email).isPresent();
	}

	@Override
	public List<Customer> getAlls() {
		// TODO Auto-generated method stub
		return customerRepository.findAll();
	}

	@Override
	public Customer updateCustomer(Customer customer, Integer id) {
		// TODO Auto-generated method stub

		// customer.setEXIST(true);
		// customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));

		customer.setEXIST(true);
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));

		mailService.sendMailUpdateCustomer(customer);
		return customerRepository.save(customer);
	}

	@Override
	public Customer getCustomerGetById(Integer id) {
		// TODO Auto-generated method stub
		return customerRepository.findById(id).get();
	}

	@Override
	public Customer login(String email, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteCustomer(Integer id) {
		// TODO Auto-generated method stub
		customerRepository.deleteById(id);
	}

	@Override
	public Optional<Customer> findCustomerByNAME(String name) {
		// TODO Auto-generated method stub
		return customerRepository.findCustomerByNAME(name);
	}

	@Override
	public Optional<Customer> findCustomerByEMAIL(String EAMIL) {
		// TODO Auto-generated method stub
		return customerRepository.findCustomerByEMAIL(EAMIL);
	}

	@Override
	public String getLoggedInUserId() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			Object principal = authentication.getPrincipal();
			if (principal instanceof UserInfoDetails) {
				UserInfoDetails use = (UserInfoDetails) authentication.getPrincipal();
				Integer idUser = use.getId();
				return String.valueOf(idUser);
			} else if (principal instanceof OAuth2User) {
				CustomOAuth2User oauth2User = (CustomOAuth2User) principal;
				String providerName = oauth2User.getEmail();
				Customer customer = customerRepository.getUserByEmail(providerName);
				if (customer != null) {
					Integer id = customer.getID();
					return String.valueOf(id);
				}
			}
		}
		return null;
	}

	@Override
	public Customer findByEmail(String email) {
		// TODO Auto-generated method stub
		return customerRepository.findByEMAIL(email).get();
	}

	@Override
	public Customer findCustomerByEmail(String email) {
		return customerRepository.findCustomerByEmail1(email);
	}

	@Override
	public Customer updatePassowrd(Customer customer) {
		// TODO Auto-generated method stub
		customer.setPASSWORD(bCryptPasswordEncoder.encode(customer.getPASSWORD()));
		return customerRepository.save(customer);
	}

	@Override
	public void updatePassword(String password, Integer id) {
		customerRepository.updatePassword(password, id);

	}

	@Override
	public Optional<Customer> findCustomerById(Integer id) {
		// TODO Auto-generated method stub
		return customerRepository.findByID(id);
	}

	@Override
	public Optional<Customer> findCustomerByEMAILAndProvider(String email, Provider provider) {
		// TODO Auto-generated method stub
		return customerRepository.findCustomerByEMAILAndProvider(email, provider);
	}

	@Override
	public Customer getDataUserLogin() {
		// Hàm lấy ra dữ liệu tài khoản đăng nhập của người dùng.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication instanceof OAuth2AuthenticationToken) {
			// Đăng nhập bằng Google hoặc một dịch vụ OAuth2 khác
			String email = getEmailFromOAuth2Authentication((OAuth2AuthenticationToken) authentication);
			// return customerService.findByEmail(email);
			return customerRepository.findByEMAIL(email).get();
		} else {
			// Đăng nhập bằng tài khoản thông thường
			String email = authentication.getName();
			// return customerService.findByEmail(email);
			return customerRepository.findByEMAIL(email).get();
		}
	}

	// Hàm được sử dụng để lấy ra email khi người dùng sử dụng phương thức đăng nhập
	// bằng google
	private String getEmailFromOAuth2Authentication(OAuth2AuthenticationToken oauthToken) {
		return oauthToken.getPrincipal().getAttribute("email");
	}
}
