package com.myweather.api.services.impl;

import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.UserMongoRepository;
import com.myweather.api.services.SessionService;
import com.myweather.api.models.helpers.SessionCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by vmware on 7/13/17.
 */
@Service
public class SessionServiceImpl implements SessionService {

   private final Logger logger = LoggerFactory.getLogger(SessionServiceImpl.class);

   /**
    * Injects the User Serivce
    */
   @Autowired
   private UserMongoRepository userRepository;

   /**
    *
    * @param sessionCredentials
    * @return
    */
   @Override
   public User authenticate(SessionCredentials sessionCredentials) {
      String email = sessionCredentials.getEmail();
      String password = sessionCredentials.getPassword();
      User user;

      try {
         user = userRepository.getByEmailAndPassword(email, password);
         logger.info(String.format("User with email %s and password %s found on db", email, password));
      } catch (Exception ex) {
         logger.error(String.format("User with email %s and password %s could not be found on db", email, password));
         user = null;
      }

      return user;
   }
}
