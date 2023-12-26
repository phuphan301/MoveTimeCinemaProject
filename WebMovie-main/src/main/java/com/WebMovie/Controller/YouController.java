package com.WebMovie.Controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.WebMovie.WebSecurityConfig.UserInfoDetails;

public class YouController {
	public String getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String username = authentication.getName();
	        UserInfoDetails use = (UserInfoDetails) authentication.getPrincipal();
	        Integer idUser = use.getId();
	        System.out.println(username);
	        System.out.println(idUser);
        }
        return null;
    }
}
