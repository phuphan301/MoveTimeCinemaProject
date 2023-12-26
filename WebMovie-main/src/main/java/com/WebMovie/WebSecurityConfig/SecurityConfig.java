package com.WebMovie.WebSecurityConfig;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.WebMovie.Service.CustomerServiceGoogle;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean /** AUTHORIZATION */
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable()
                .authorizeHttpRequests()

                .requestMatchers("/home/**", "/", "/home", "/home/resetPassword",
                        "/my-websocket-endpoint",
                        "/my-websocket-endpoint/**",
                        "/dat/**",
                        "/signup", "/js/**", "/css/**", "/images/**",
                        "/add", "/add/userNoExist",
                        "/api/movie/all", "/movie/**", "/v1/movie/**",
                        "/page/**", "/api/cinema/all",
                        "/api/room/all","/api/chat/**",
                        "/api/movie_scheduled/all", "/listMovieSheduled/**",
                        "/api/movie_scheduled/detail/**", "/api/movie_scheduled/date/**",
                        "/api/seat_scheduled/**", "/api/seat_scheduled", "/api/movie_scheduled/**",
                        "/api/seat/**",
                        "/api/booking/**", "/api/booking", "/api/booking/update/**", "/api/voucher/**",
                        "/pay", "/pay/**", "/api/pay", "/api/pay/**", "/mail/**",
                        "/api/resetPassword/**", "/changePassword/**", "/api/user/**", "/api/find/**", "/error/**",
                        "/api/comment/**", "/api/comment", "/oauth2/**", "/cloudinary/upload")
                .permitAll()
                .requestMatchers("/booking/**", "/checkout/**", "/historyBooking/**", "/login-success").authenticated()
                .requestMatchers("/home/**", "/user/**").authenticated()
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/**", "/rest/**").authenticated()
                .and()
                .formLogin(formLogin -> formLogin
                        .loginPage("/signin")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/home")
                        .permitAll())
                .oauth2Login()
                .loginPage("/signin")
                .userInfoEndpoint()
                .userService(oauthUserService)
                .and()
                .successHandler(new AuthenticationSuccessHandler() {

                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                            Authentication authentication) throws IOException, ServletException {
                        System.out.println("AuthenticationSuccessHandler invoked");
                        System.out.println("Authentication name: " + authentication.getName());
                        CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();

                        customerService.processOAuthPostLoginGoogle(oauthUser.getEmail());

                        response.sendRedirect("/home");
                    }
                })
                .and()
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/home"))
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedPage("/error/404"))
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserInfoUserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public RedirectStrategy redirectStrategy() {
        return new DefaultRedirectStrategy();
    }

    @Autowired
    private CustomOAuth2UserService oauthUserService;

    @Autowired
    private CustomerServiceGoogle customerService;
}
