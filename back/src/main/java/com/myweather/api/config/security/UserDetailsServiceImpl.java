package com.myweather.api.config.security;


import com.myweather.api.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by vmware on 9/25/17.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    UserService userService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.myweather.api.models.User user = userService.getByEmail(email);
        if(user.getId() != null) {
            logger.info(String.format("User '%s' is authenticated", email));
            org.springframework.security.core.userdetails.User userCred = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                    true, true, true, true,
                    AuthorityUtils.createAuthorityList("USER"));
            return userCred;
        } else {
            logger.error(String.format("User %s is not authenticated", email));
            throw new UsernameNotFoundException("could not find the user '" + email + "', user not Authenticated...");
        }
    }
}