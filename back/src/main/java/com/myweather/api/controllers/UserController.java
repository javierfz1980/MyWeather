package com.myweather.api.controllers;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.models.Weather;
import com.myweather.api.models.helpers.SessionCredentials;
import com.myweather.api.services.DashboardService;
import com.myweather.api.services.UserService;
import com.myweather.api.models.helpers.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by javierfz on 7/9/17.
 *
 * Controller for endpoint /users
 *
 * @RestController -> Annotation to be a REST-endpoint
 * @RequestMapping("/users") -> resolves /user requests
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${http.usersPath}")
public class UserController {


   /**
    * Injects the User Serivce
    */
   @Autowired
   private UserService userService;

   /**
    * Injects the Dashborads Serivce
    */
   @Autowired
   DashboardService dashboardService;

   /**
    * Password encryption
    */
   private BCryptPasswordEncoder bCryptPasswordEncoder;




   // USERS /////////////////////////////////////////////////////////////////////////////

   /**
    * Retrieves an user
    *
    * @param id
    * @return
    */
   @RequestMapping(method = RequestMethod.GET, value = "/{id:.+}")
   public ResponseEntity<User> authenticate(@PathVariable String id) {
      ResponseEntity response;
      User user = userService.getByEmail(id);
      HttpStatus status = (user != null) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

      response = ResponseEntity
              .status(status)
              .body(user);

      return response;
   }

   /**
    * Modifies an existing User
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
   public ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
      ResponseEntity response;
      // TODO TSK15
      //user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
      User updatedUser = userService.update(user);
      HttpStatus status = (updatedUser != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(updatedUser);

      return response;
   }



   // USER DASHBOARDS ////////////////////////////////////////////////////////////////////

   /**
    * Retireves all dashboard for an User
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.GET, value = "/{userId}/dashboards")
   public ResponseEntity<Dashboard> getDashboard(@PathVariable String userId) {
      ResponseEntity response;
      List<Dashboard> dashboards = dashboardService.getDashboards(userId);
      HttpStatus status = (dashboards != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
              .status(status)
              .body(dashboards);

      return response;
   }

   /**
    * Creates a dashboard for an User
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.POST, value = "/{userId}/dashboards")
   public ResponseEntity<Dashboard> insertDashboard(@Valid @RequestBody Dashboard dashboard,
                                                    @PathVariable String userId) {
      ResponseEntity response;
      Dashboard dashboardBody = dashboardService.insert(userId, dashboard);
      HttpStatus status = (dashboardBody != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(dashboardBody);

      return response;
   }

   /**
    * Deletes an existing Dashboard for an User
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.DELETE, value = "/{userId}/dashboards/{dashboardId}")
   public ResponseEntity<CustomResponse> deleteDashboard(@Valid @RequestBody Dashboard dashboard,
                                                    @PathVariable String userId,
                                                    @PathVariable String dashboardId) {
      ResponseEntity response;
      CustomResponse res = dashboardService.delete(userId, dashboardId, dashboard);
      HttpStatus status = (res.getStatus()) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(res.getMessage());

      return response;
   }

   /**
    * Updates a dashboard for an User
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.PUT, value = "/{userId}/dashboards/{dashboardId}")
   public ResponseEntity<Dashboard> updateDashboard(@Valid @RequestBody Dashboard dashboard) {
      ResponseEntity response;
      Dashboard updatedDashboard = dashboardService.update(dashboard);
      HttpStatus status = (updatedDashboard != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(updatedDashboard);

      return response;
   }



   // USER DASHBOARDS WEATHERS ///////////////////////////////////////////////////////////

   /**
    * Creates a weather for an User Dashboard
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.POST, value = "/{userId}/dashboards/{dashboardId}/weathers")
   public ResponseEntity<Weather> insertWeatherOnDashboard(@Valid @RequestBody Weather weather,
                                                           @PathVariable String userId,
                                                           @PathVariable String dashboardId) {
      ResponseEntity response;
      Weather res = dashboardService.addWeather(userId, dashboardId, weather);
      HttpStatus status = (res != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(res);

      return response;
   }

   /**
    * Deletes a weather for an User Dashboard
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.DELETE, value = "/{userId}/dashboards/{dashboardId}/weathers/{weatherId}")
   public ResponseEntity<Weather> deleteWeatherOnDashboard(@PathVariable String userId,
                                                           @PathVariable String dashboardId,
                                                           @PathVariable String weatherId) {
      ResponseEntity response;
      Weather res = dashboardService.removeWeather(userId, dashboardId, weatherId);
      HttpStatus status = (res != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(res);

      return response;
   }
}
