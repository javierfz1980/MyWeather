package com.myweather.api.services.impl;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.UserMongoRepository;
import com.myweather.api.services.DashboardService;
import com.myweather.api.services.UserService;
import com.myweather.api.services.models.CustomResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    * Injects the DashboardService
    */
   @Autowired
   private DashboardService dashboardService;


   /**
    * Inserts a new User into the repository
    * @param user
    * @return boolean with the result of the insert operation
    */
   @Override
   public CustomResponse insert(User user) {
      CustomResponse CustomResponse = new CustomResponse();
      Boolean status = false;
      String errorMessage = "";


      try {
         // new default dashboard for the user
         Dashboard dashboard = new Dashboard(user.getDashboard());
         user.addDashboard(dashboard);

         if (this.getByEmail(user.getEmail()).getId() == null) {
            // insert dashboard
            dashboardService.insert(dashboard);

            // insert user
            repository.insert(user);

            status = true;
            errorMessage = String.format("User with email %s and id %s successfully inserted on db", user.getEmail(), user.getId());

         } else {

            errorMessage = String.format("User with email %s could not be inserted on db because already exist", user.getEmail());
         }

      } catch (Exception ex) {

         logger.error(String.format("User with email %s could not be inserted on db", user.getEmail()), ex.getMessage());

      }

      CustomResponse.setStatus(status);
      CustomResponse.setErrorMessage(errorMessage);
      logger.error(errorMessage);

      return CustomResponse;
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
    * Retrieves all the users from the repository
    *
    * @return
    */
   @Override
   public List<User> getAll() {
      return repository.findAll();
   }
}
