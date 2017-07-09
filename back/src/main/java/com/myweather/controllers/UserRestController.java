package com.myweather.controllers;

import com.myweather.models.h2db.UserH2;
import com.myweather.models.mongodb.UserMongo;
import com.myweather.respositories.jpa.UserJpaRepository;
import com.myweather.respositories.mongo.UserMongoRepository;
import com.myweather.shared.ConfigUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
@RestController
@RequestMapping("/users")
public class UserRestController {

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

      if (ConfigUtils.dbType == ConfigUtils.H2_DB) {
         response = new ResponseEntity<>((Collection<UserH2>) jpaRepository.findAll(), HttpStatus.OK);

      } else if(ConfigUtils.dbType == ConfigUtils.MONGO_DB) {
         response = new ResponseEntity<>((Collection<UserMongo>) mongoRepository.findAll(), HttpStatus.OK);

      } else {
         response = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

      }

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
