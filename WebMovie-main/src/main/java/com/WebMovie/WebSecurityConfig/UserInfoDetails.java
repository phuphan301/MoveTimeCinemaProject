package com.WebMovie.WebSecurityConfig;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.WebMovie.Entity.Customer;

public class UserInfoDetails implements UserDetails {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private Customer user;
    private Integer id;
    private String name;
    private String password;
    private String fullname;
    private List<GrantedAuthority> roles;

    public UserInfoDetails(Customer user) {
        this.user = user;
        this.id = user.getID();
        this.name = user.getEMAIL();
        this.fullname = user.getFULLNAME();
        this.password = user.getPASSWORD();
        this.roles = Arrays.stream(user.getROLE().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    public Integer getId() {
        return this.id;
    }

    public String getFullName() {
        return this.user.getFULLNAME();
    }
    
    public String getEmail() {
    	return this.user.getEMAIL();
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
