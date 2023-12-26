package com.WebMovie.Service;

import java.util.List;
import java.util.Optional;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Entity.Provider;

public interface ICustomerService {
	Customer addCustomer(Customer customer);
	List<Customer> getAlls();
	Customer updateCustomer(Customer customer, Integer id);
	Customer getCustomerGetById(Integer id);
	Customer login(String email, String password);
	void deleteCustomer(Integer id);

	Optional<Customer> findCustomerByNAME(String name);
	Optional<Customer> findCustomerByEMAIL(String EAMIL);

	String getLoggedInUserId();

	Customer findByEmail(String email);

	Customer findCustomerByEmail(String email);
	Customer updatePassowrd(Customer customer);

	void updatePassword(String password, Integer id);

	Optional<Customer> findCustomerById(Integer id);
	Optional<Customer> findCustomerByEMAILAndProvider(String email, Provider provider);
	
	Customer getDataUserLogin();
}
