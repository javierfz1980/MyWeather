package com.myweather.api.controllers;

import com.myweather.api.config.security.jwt.JWTSecurityConstants;
import com.myweather.api.models.SessionToken;
import com.myweather.api.models.User;
import com.myweather.api.models.helpers.CustomResponse;
import com.myweather.api.services.SessionService;
import com.myweather.api.models.helpers.SessionCredentials;
import com.myweather.api.services.UserService;
import io.jsonwebtoken.Jwts;
import org.apache.tomcat.util.http.parser.Authorization;
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
    * Injects the User Serivce
    */
   @Autowired
   private UserService userService;


   /**
    * Signup a new User into the repository
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.POST, value = "/signup")
   public ResponseEntity<String> signUp(@Valid @RequestBody User user) {
      ResponseEntity response;
      // TODO TSK15
      //user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
      CustomResponse customResponse = userService.insert(user);
      HttpStatus status = (customResponse.getStatus()) ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
              .status(status)
              .body(customResponse.getMessage());

      return response;
   }

   /**
    * Logout authentication (not reached because of JWTLoginAuthenticationFilter...
    *
    * @return
    */
   @RequestMapping(method = RequestMethod.POST, value = "/signout")
   public ResponseEntity<CustomResponse> signOut(@RequestHeader(value="Authorization") String token) {

      ResponseEntity response;
      String msg = "";
      boolean res = false;
      try {
         if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(JWTSecurityConstants.SECRET)
                    .parseClaimsJws(token.replace(JWTSecurityConstants.TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();
            SessionToken sessionToken = sessionService.getSessionTokenByTokenAndEmail(token, user);
            res = sessionService.deleteToken(sessionToken);
            msg = "Token deleted from server";
         }

      } catch (Exception ex) {
         res = false;
         msg = ex.getMessage();
      }

      CustomResponse cr = new CustomResponse();
      cr.setMessage(msg);
      cr.setStatus(res);
      HttpStatus status = (res) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
      response = ResponseEntity
              .status(status)
              .body(cr);

      return response;
   }


   /**
    * Login authentication (not reached because of JWTLoginAuthenticationFilter...
    *
    * @param sessionCredentials
    * @return
    */
   /*@RequestMapping(method = RequestMethod.POST, value = "/signin")
   public ResponseEntity<User> signIn(@Valid @RequestBody SessionCredentials sessionCredentials) {
      ResponseEntity response;
      User user = sessionService.authenticate(sessionCredentials);
      HttpStatus status = (user != null) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

      response = ResponseEntity
            .status(status)
            .body(user);

      return response;
   }*/
}
