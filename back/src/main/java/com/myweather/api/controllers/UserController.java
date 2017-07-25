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
@RequestMapping("${http.usersPath}")
public class UserController {


   /**
    * Injects the User Serivce
    */
   @Autowired
   private UserService userService;


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
   public ResponseEntity<User> update(@Valid @RequestBody User user) {
      ResponseEntity response;
      User updatedUser = userService.update(user);
      HttpStatus status = (updatedUser != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(updatedUser);

      return response;
   }

}
