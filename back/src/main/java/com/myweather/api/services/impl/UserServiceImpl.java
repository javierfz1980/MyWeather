package com.myweather.api.services.impl;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.UserMongoRepository;
import com.myweather.api.services.UserService;
import com.myweather.api.services.models.CustomResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public class UserServiceImpl implements UserService {

   private final Logger logger =  LoggerFactory.getLogger(UserServiceImpl.class);

   /**
    * Injects the UserRepository
    */
   @Autowired
   private UserMongoRepository repository;


   /**
    * Inserts a new User into the repository
    * @param user
    * @return boolean with the result of the insert operation
    */
   @Override
   public CustomResponse insert(User user) {
      CustomResponse customResponse = new CustomResponse();
      Boolean status = false;
      String message = "";

      try {
         if (this.getByEmail(user.getEmail()).getId() == null) {
            // new default dashboard for the user
            Dashboard dashboard = new Dashboard();
            dashboard.setName(user.getDashboard());
            dashboard.setWeathers(new ArrayList<>());
            user.addDashboard(dashboard);
            repository.insert(user);
            status = true;
            message = String.format("User with email %s and id %s successfully inserted on db", user.getEmail(), user.getId());

         } else {
            message = String.format("User with email %s could not be inserted on db because already exist", user.getEmail());
         }

      } catch (Exception ex) {
         logger.error(String.format("User with email %s could not be inserted on db", user.getEmail()), ex.getMessage());
      }

      customResponse.setStatus(status);
      customResponse.setMessage(message);
      logger.error(message);

      return customResponse;
   }


   /**
    * Retrieves an user from the repository by email address.
    *
    * @param email
    * @return
    */
   @Override
   public User getByEmail(String email) {
      User user;
      try{
         user = repository
               .getByEmail(email)
               .orElseThrow(() -> new Exception(String.format("User with email %s could not be found on db", email)));
         logger.info(String.format("User with email %s found on db", email));
         return user;
      } catch (Exception ex) {
         logger.error(String.format("User with email $s not found on db", email));
         return new User();
      }
   }


   /**
    * Modifies an existing user from the repository.
    *
    * @param user
    * @return
    */
   @Override
   public User update(User user) {
      String message;
      Boolean status;
      try{
         repository.save(user);
         logger.info(String.format("User with id %s saved successfully", user.getId()));
      } catch (Exception ex) {
         logger.error(String.format("User with id %s could not be saved", user.getId()));
      }
      return user;
   }


   /**
    * Retrieves all the users from the repository
    *
    * @return
    */
   @Override
   public List<User> getAll() {
      return repository.findAll();
   }


   /**
    *
    * @param weather
    * @param userId
    * @param dashboardId
    * @return
    */
   /*
   public CustomResponse addWeatherToDashboard(Weather weather, String userId, String dashboardId) {
      CustomResponse customResponse = new CustomResponse();
      repository.
      return customResponse;
   }
   */
}
