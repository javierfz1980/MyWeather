package com.myweather.api.services.impl;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.DashboardMongoRepository;
import com.myweather.api.repositories.mongo.UserMongoRepository;
import com.myweather.api.services.UserService;
import com.myweather.api.models.helpers.CustomResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public class UserServiceImpl implements UserService {

   private final Logger logger =  LoggerFactory.getLogger(UserServiceImpl.class);

   /**
    * Injects the DashboardService
    */
   @Autowired
   private DashboardMongoRepository dashboardRepository;


   /**
    * Injects the UserRepository
    */
   @Autowired
   private UserMongoRepository userRepository;


   /**
    * Inserts a new User into the userRepository
    * @param user
    * @return boolean with the result of the insert operation
    */
   @Override
   public CustomResponse insert(User user) {
      CustomResponse customResponse = new CustomResponse();
      Boolean status = false;
      String message = "";

      try {
         if (this.getByEmail(user.getEmail()) == null) {
            // new default dashboard for the user
            Dashboard dashboard = new Dashboard();
            dashboard.setName(user.getDefaultDashboardName());
            dashboard.setWeathers(new ArrayList<>());
            // inserts the dashboard in order to get the ID
            dashboardRepository.insert(dashboard);
            user.addDashboard(dashboard);
            userRepository.insert(user);
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
    * Retrieves an user from the userRepository by email address.
    *
    * @param email
    * @return
    */
   @Override
   public User getByEmail(String email) {
      User user;
      try{
         user = userRepository.getByEmail(email);
         logger.info(String.format("User with email %s found on db", email));
         return user;
      } catch (Exception ex) {
         logger.error(String.format("User with email %s not found on db", email));
         return null;
      }
   }


   /**
    * Retrieves an user from the userRepository by id.
    *
    * @param id
    * @return
    */
   @Override
   public User getById(String id) {
      User user;
      try{
         user = userRepository.getById(id);
         logger.info(String.format("User with id %s found on db", id));
         return user;
      } catch (Exception ex) {
         logger.error(String.format("User with id %s not found on db", id));
         return new User();
      }
   }


   /**
    * Modifies an existing user from the userRepository.
    *
    * @param user
    * @return
    */
   @Override
   public User update(User user) {
      try{
         userRepository.save(user);
         logger.info(String.format("User with id %s saved successfully", user.getId()));
      } catch (Exception ex) {
         logger.error(String.format("User with id %s could not be saved", user.getId()));
      }
      return user;
   }


}
