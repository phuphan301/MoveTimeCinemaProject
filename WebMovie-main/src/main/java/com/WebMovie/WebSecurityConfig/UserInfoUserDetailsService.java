package com.WebMovie.WebSecurityConfig;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.WebMovie.Entity.Customer;
import com.WebMovie.Service.ICustomerService;

@Configuration
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private ICustomerService userService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Customer> user = userService.findCustomerByEMAIL(username);
        return user.map(UserInfoDetails::new).orElseThrow(()->new UsernameNotFoundException("HEY username not found"));
    }
}
