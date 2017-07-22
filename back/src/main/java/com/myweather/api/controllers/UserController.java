package com.myweather.api.controllers;

import com.myweather.api.models.User;
import com.myweather.api.models.weather.Weather;
import com.myweather.api.services.UserService;
import com.myweather.api.services.models.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

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
@RequestMapping("/users")
public class UserController {


   /**
    * Injects the User Serivce
    */
   @Autowired
   private UserService userService;


   /**
    * Looks into the repository in order to return all the users
    *
    * @return ResponseEntity with all the users and Status OK
    */
   @RequestMapping(method = RequestMethod.GET)
   public ResponseEntity<Collection> getAll() {
      ResponseEntity response;
      response = ResponseEntity
            .status(HttpStatus.OK)
            .body((Collection<User>) userService.getAll());

      return response;
   }


   /**
    * Creates a new User into the repository
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.POST)
   public ResponseEntity<String> insert(@Valid @RequestBody User user) {
      ResponseEntity response;
      CustomResponse customResponse = userService.insert(user);
      HttpStatus status = (customResponse.getStatus()) ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(customResponse.getMessage());

      return response;
   }


   /**
    * Modifies an existing User
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
   public ResponseEntity<User> save(@Valid @RequestBody User user) {
      ResponseEntity response;
      User updatedUser = userService.update(user);
      HttpStatus status = (updatedUser != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(updatedUser);

      return response;
   }


   /**
    * Adds a Weather to an User Dashboard
    *
    * @return ResponseEntity with Status result
    */

   @RequestMapping(method = RequestMethod.POST, value = "/{userId}/dashboards/{dashboardIs}")
   public ResponseEntity<User> insertWeather(@Valid @RequestBody User user) {
      return this.save(user);
   }


   /**
    * Adds a Weather to an User Dashboard
    *
    * @return ResponseEntity with Status result
    */
   /*
   @RequestMapping(method = RequestMethod.POST, value = "/{userId}/dashboards/{dashboardIs}")
   public ResponseEntity<CustomResponse> insertWeather(@Valid @RequestBody Weather weather, @PathVariable String userId, @PathVariable String dashboardIs) {
      ResponseEntity response;
      CustomResponse customResponse = userService.addWeatherToDashboard(weather, userId, dashboardIs);
      HttpStatus status = (customResponse.getStatus()) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(customResponse.getMessage());

      return response;
   }
   */

   /*
   @RequestMapping(method = RequestMethod.GET, value = "/{id}")
   public ResponseEntity<Pie> getPieWithId(@PathVariable Long id) {
      return new ResponseEntity<>(repository.findOne(id),HttpStatus.OK);
   }

   @RequestMapping(method = RequestMethod.GET, params = {"name"})
   public ResponseEntity<Collection<Pie>> findPieWithName(@RequestParam(value="name") String name) {
      return new ResponseEntity<>(repository.findByName(name), HttpStatus.OK);
   }

   @RequestMapping(method = RequestMethod.POST)
   public ResponseEntity<?> addPie(@RequestBody Pie input) {
      return new ResponseEntity<>(repository.save(input), HttpStatus.CREATED);
   }
   */
}
