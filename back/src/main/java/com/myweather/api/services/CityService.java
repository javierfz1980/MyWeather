package com.myweather.api.services;

import com.myweather.api.models.City;
import com.myweather.api.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface CityService {

   /**
    * Insert a new City into db
    * @param dsb
    */
   void insert(City dsb);

   /**
    * Retreives an City from db
    */
   City getUserByEmail(String email);


   /**
    * Retreives an User from db
    */
   List<User> getAll();

}
