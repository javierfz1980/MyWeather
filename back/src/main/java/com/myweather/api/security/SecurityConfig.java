package com.myweather.api.security;

import com.myweather.api.models.User;
import com.myweather.api.services.UserService;
import com.sun.javafx.binding.StringFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


/**
 * Tells tp Spring Security to use the users from the Mongo DB Collection as valid credentials.
 *
 * UserDetailsService implementation uses the UserService to look up the user and see if there is an user in our repository with that email.
 * If there is we return a org.springframework.security.core.userdetails.User object with the details from our User Account.
 * The org.springframework.security.core.userdetails.User object is much more robust than our User implementation.
 * It supports things like password expiration and accounts being locked.
 * It also supports the concept of roles, allowing you to have roles like USER or ADMIN to separate out permissions to perform certain operations.
 *
 * In implementation everyone has the USER role, but we might want to have additional roles...
 */
@Configuration
class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

   private final Logger logger = LoggerFactory.getLogger(WebSecurityConfiguration.class);

   @Autowired
   UserService userService;
   //UserMongoRepository userRepositori;

   @Override
   public void init(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(userDetailsService());
   }

   @Bean
   UserDetailsService userDetailsService() {

      return new UserDetailsService() {

         @Override
         public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
            User user = userService.getByEmail(email);
            if(user.getId() != null) {
               logger.info(String.format("User %s is authenticated", email));
               return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                     true, true, true, true,
                     AuthorityUtils.createAuthorityList("USER"));
            } else {
               logger.error(String.format("User %s is not authenticated", email));
               throw new UsernameNotFoundException("could not find the user '" + email + "', user not Authenticated...");
            }
         }

      };
   }
}


/**
 * Security builder for configuring the security for each path.
 * Security configuration for all GET/POST/PUT/DELETE requests the api access is only for people that are authenticated.
 *
 * Created by javierfz on 7/13/17.
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

   @Value("${http.usersPath}")
   private String usersPath;

   @Value("${http.sessionPath}")
   private String sessionPath;

   @Value("${http.dashboardsPath}")
   private String dashboardsPath;

   @Value("${http.weathersPath}")
   private String weathersPath;

   @Override
   protected void configure(HttpSecurity http) throws Exception {
      http
            .csrf().disable()
            .authorizeRequests()
            // users
            .antMatchers(HttpMethod.GET, this.usersPath + "/**").authenticated()
            //.antMatchers(HttpMethod.POST, this.usersPath + "/**").authenticated()
            .antMatchers(HttpMethod.PUT, this.usersPath + "/**").authenticated()
            // dashboards
            .antMatchers(HttpMethod.GET, this.dashboardsPath + "/**").authenticated()
            .antMatchers(HttpMethod.POST, this.dashboardsPath + "/**").authenticated()
            .antMatchers(HttpMethod.PUT, this.dashboardsPath + "/**").authenticated()
            // weathers
            .antMatchers(HttpMethod.GET, this.weathersPath + "/**").authenticated()
            //.antMatchers(HttpMethod.POST, this.weathersPath + "/**").authenticated()
            .antMatchers(HttpMethod.PUT, this.weathersPath + "/**").authenticated()
            // session
            .antMatchers(HttpMethod.GET, this.sessionPath + "/**").authenticated()
            .antMatchers(HttpMethod.POST, this.sessionPath + "/**").authenticated()
            .antMatchers(HttpMethod.PUT, this.sessionPath + "/**").authenticated()
            // all the rest...
            .anyRequest().permitAll()
            //.anyRequest().authenticated()
            .and()
            .httpBasic().and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
   }

}