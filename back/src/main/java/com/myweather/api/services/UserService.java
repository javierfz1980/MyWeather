package com.myweather.api.services;

import com.myweather.api.models.User;
import com.myweather.api.models.weather.Weather;
import com.myweather.api.services.models.CustomResponse;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface UserService {

   /**
    * Insert a new User into db
    * @param user
    */
   CustomResponse insert(User user);

   /**
    * Retreives an User from db
    */
   User getByEmail(String email);

   /**
    * Modifies an User from db
    */
   User update(User user);

   /**
    * Retreives an User from db
    */
   List<User> getAll();

   /**
    *
    * @param weather
    * @param userId
    * @param dashboardId
    * @return
    */
   //CustomResponse addWeatherToDashboard(Weather weather, String userId, String dashboardId);
}
