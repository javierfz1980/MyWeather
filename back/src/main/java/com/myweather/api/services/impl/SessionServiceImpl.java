package com.myweather.api.services.impl;

import com.myweather.api.models.SessionToken;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.SessionTokenMongoRepository;
import com.myweather.api.repositories.mongo.UserMongoRepository;
import com.myweather.api.services.SessionService;
import com.myweather.api.models.helpers.SessionCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;


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
   private SessionTokenMongoRepository sessionTokenMongoRepository;


   @Override
   public void saveToken(SessionToken sessionToken) {
      try {
         sessionTokenMongoRepository.save(sessionToken);
         logger.info(String.format("Session Token stored for user %s", sessionToken.getUserEmail()));

      } catch (Exception ex) {
         logger.info(String.format("Session Token could not be stored for user %s, %s", sessionToken.getUserEmail(), ex));
      }
   }

   @Override
   public boolean deleteToken(SessionToken sessionToken) {
      boolean succeed;
      try {
         sessionTokenMongoRepository.delete(sessionToken);
         succeed = true;
         logger.info(String.format("Session Token deleted for user %s", sessionToken.getUserEmail()));

      } catch (Exception ex) {
         succeed = false;
         logger.info(String.format("Session Token could not be deleted for user %s", sessionToken.getUserEmail()));
      }
      return succeed;
   }

   @Override
   public SessionToken getSessionTokenByUserEmail(String userEmail){
      try {
         SessionToken sessionToken = sessionTokenMongoRepository.getByUserEmail(userEmail);
         logger.info(String.format("Session Token found and valid for user %s", userEmail));
         return sessionToken;

      } catch (Exception ex) {
         logger.info(String.format("Session Token is not valid for user %s", userEmail));
         return null;
      }
   }

   @Override
   public SessionToken getSessionTokenByToken(String token){
      try {
         SessionToken sessionToken = sessionTokenMongoRepository.getByToken(token);
         logger.info(String.format("Session Token found and valid for %s", token));
         return sessionToken;

      } catch (Exception ex) {
         logger.info(String.format("Session Token is not valid for %s", token));
         return null;
      }
   }

   @Override
   public SessionToken getSessionTokenByTokenAndEmail(String token, String email){
      try {
         SessionToken sessionToken = sessionTokenMongoRepository.getByTokenAndUserEmail(token, email);
         logger.info(String.format("Session Token found and valid for %s", token));
         return sessionToken;

      } catch (Exception ex) {
         logger.info(String.format("Session Token is not valid for %s", token));
         return null;
      }
   }



   /**
    *
    * @param sessionCredentials
    * @return
    */
   /*@Override
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
   }*/
}
