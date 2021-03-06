package com.myweather.api.config.security;

import com.myweather.api.config.security.jwt.JWTAuthorizationFilter;
import com.myweather.api.config.security.jwt.JWTLoginAuthenticationFilter;
import com.myweather.api.services.SessionService;
import com.myweather.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Security builder for configuring the security for each path.
 * Security configuration for all GET/POST/PUT/DELETE requests the api access is only for people that are authenticated.
 *
 * Created by javierfz on 7/13/17.
 */

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${http.usersPath}")
    private String usersPath;

    @Value("${http.sessionPath}")
    private String sessionPath;

    @Value("${http.weathersPath}")
    private String weathersPath;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private SessionService sessionService;

    // TODO TSK15
    //@Autowired
    //private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers(this.sessionPath + "/signup")
                .antMatchers(this.weathersPath + "/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers(this.sessionPath + "/**").permitAll()
                .anyRequest().authenticated()
                .and()
                // filter the login in order to provide a valid token when for successful logins
                .addFilterBefore(new JWTLoginAuthenticationFilter(this.sessionPath + "/signin", authenticationManager(), sessionService),  UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of a valid token
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), sessionService));
    }

    // TODO TSK15
    /*@Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }*/

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}