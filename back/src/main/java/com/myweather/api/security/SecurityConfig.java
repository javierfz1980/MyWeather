package com.myweather.api.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

/**
 * Security builder for configuring the security for each path.
 * Security configuration for all POST/PUT/DELETE requests the api access is only for people that are authenticated.
 *
 * Created by javierfz on 7/13/17.
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

   @Override
   protected void configure(HttpSecurity http) throws Exception {
      http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/users/**").authenticated()
            //.antMatchers(HttpMethod.POST, "/api/**").authenticated()
            //.antMatchers(HttpMethod.PUT, "/api/**").authenticated()
            //.antMatchers(HttpMethod.DELETE, "/api/**").authenticated()
            .anyRequest().permitAll()
            //.anyRequest().authenticated()
            .and()
            .httpBasic().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
   }

}
