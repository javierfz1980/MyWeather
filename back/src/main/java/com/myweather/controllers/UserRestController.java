package com.myweather.controllers;

import com.myweather.models.h2db.UserH2;
import com.myweather.models.mongodb.UserMongo;
import com.myweather.respositories.jpa.UserJpaRepository;
import com.myweather.respositories.mongo.UserMongoRepository;
import com.myweather.shared.ConfigUtils;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by javierfz on 7/9/17.
 *
 * Controller for endpoint /users
 *
 */

/**
 * Annotation to be a REST-endpoint
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserRestController {

   /**
    * Default responses
    */
   private final String ERROR = "Internal server error";
   private final String NO_DB = "No databas selected";
   private final String USER_EXISTS = "User already exist";
   private final String USER_CREATED = "User succesfully created";

   /**
    * Injects the UserJpaRepository
    */
   @Autowired
   private UserJpaRepository jpaRepository;

   /**
    * Injects the MongoRepository
    */
   @Autowired
   private UserMongoRepository mongoRepository;


   /**
    * Looks into the repository in order to return all the users
    *
    * @return ResponseEntity with all the users and Status OK
    */
   @RequestMapping(method = RequestMethod.GET)
   public ResponseEntity<Collection> getAllUsers() {
      ResponseEntity response;

      // all customers from h2
      if (ConfigUtils.dbType == ConfigUtils.H2_DB) {
         response = ResponseEntity
               .status(HttpStatus.OK)
               .body((Collection<UserH2>) jpaRepository.findAll());

      // all customers from mongo
      } else if(ConfigUtils.dbType == ConfigUtils.MONGO_DB) {
         response = ResponseEntity
               .status(HttpStatus.OK)
               .body((Collection<UserMongo>) mongoRepository.findAll());

      // no db configured
      } else {
         response = ResponseEntity
               .status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(this.NO_DB);
      }

      return response;

   }


   /**
    * Creates a new User
    *
    * @return Status result
    */
   @RequestMapping(method = RequestMethod.PUT)
   public ResponseEntity<Collection> insertNewlUser(@RequestBody UserMongo user) {
      ResponseEntity response;
      Boolean inserted = false;
      UserMongo existingUser;

      if (ConfigUtils.dbType == ConfigUtils.H2_DB) {
         // Todo

      } else if (ConfigUtils.dbType == ConfigUtils.MONGO_DB) {
         //existingUser = mongoRepository.findByEmail(user.getEmail());
         //if (existingUser == null) {
            try{
               mongoRepository.insert(user);
               response = ResponseEntity
                     .status(HttpStatus.CREATED)
                     .body(this.USER_CREATED);
            } catch (Exception exp) {
               inserted = false;
               response = ResponseEntity
                     .status(HttpStatus.INTERNAL_SERVER_ERROR)
                     .body(exp.toString());
            }
         //}

      // no db configured
      } else {
         response = ResponseEntity
               .status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(this.NO_DB);
      }

      /*
      // user created
      if (inserted) {
         response = ResponseEntity
               .status(HttpStatus.CREATED)
               .body(this.USER_CREATED);

      // user not created
      } else {
         response = ResponseEntity
               .status(HttpStatus.INTERNAL_SERVER_ERROR)
               .body(HttpStatus.INTERNAL_SERVER_ERROR);

      }
      */

      // user already exist
      /*if (existingUser != null) {
         response = ResponseEntity
               .status(HttpStatus.CONFLICT)
               .body(this.USER_EXISTS);
      }*/

      return response;

   }

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
