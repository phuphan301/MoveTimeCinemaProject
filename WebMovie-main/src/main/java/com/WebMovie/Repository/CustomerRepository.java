package com.WebMovie.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Entity.Provider;


public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	Optional<Customer> findByEMAIL(String eMAIL);

	@Query(value = "select * from customer where FULLNAME = ?1", nativeQuery = true)
    Optional<Customer> findCustomerByNAME(String name);

	@Query(value = "select * from customer where EMAIL = ?1", nativeQuery = true)
    Optional<Customer> findCustomerByEMAIL(String EAMIL);

	@Query(value = "select * from Customer where EMAIL = ?1", nativeQuery = true)
	Customer findCustomerByEmail1(String email);

	@Query("update Customer c SET c.PASSWORD = ?1 WHERE c.ID = ?2")
	void updatePassword(@Param("password")String password, @Param("id")Integer id);

	Optional<Customer> findByID(Integer iD);

	@Query("SELECT u FROM Customer u WHERE u.EMAIL = :email")
	public Customer getUserByEmail(@Param("email") String email);

	@Query("SELECT c FROM Customer c WHERE c.EMAIL = :email AND c.provider = :provider")
    Optional<Customer> findCustomerByEMAILAndProvider(
            @Param("email") String email,
            @Param("provider") Provider provider
    );
}
