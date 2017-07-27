package com.myweather.api.controllers;

import com.myweather.api.models.User;
import com.myweather.api.services.SessionService;
import com.myweather.api.models.helpers.SessionCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
@RequestMapping("${http.sessionPath}")
public class SessionController {

   /**
    * Injects the Session Service
    */
   @Autowired
   private SessionService sessionService;


   /**
    * Login authentication
    *
    * @param sessionCredentials
    * @return
    */
   @RequestMapping(method = RequestMethod.POST)
   public ResponseEntity<User> authenticate(@Valid @RequestBody SessionCredentials sessionCredentials) {
      ResponseEntity response;
      User user = sessionService.authenticate(sessionCredentials);
      HttpStatus status = (user != null) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

      response = ResponseEntity
            .status(status)
            .body(user);

      return response;
   }

   /**
    * Logut authentication
    *
    * @param sessionCredentials
    * @return
    * TODO ....
    */
   /*
   @RequestMapping(method = RequestMethod.POST)
   public ResponseEntity<User> authenticate(@Valid @RequestBody SessionCredentials sessionCredentials) {

   }
   */
}
