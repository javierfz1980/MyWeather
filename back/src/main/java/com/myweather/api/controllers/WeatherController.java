package com.myweather.api.controllers;

import com.google.gson.JsonObject;
import com.myweather.api.models.User;
import com.myweather.api.models.weather.Weather;
import com.myweather.api.services.UserService;
import com.myweather.api.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.LinkedList;

/**
 * Created by javierfz on 7/19/17.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/weather")
public class WeatherController {

   /**
    * Injects the Weather Serivce
    */
   @Autowired
   private WeatherService weatherService;

   /**
    *
    * @return
    */
   @RequestMapping(method = RequestMethod.POST)
   public ResponseEntity<Weather> getWeatherForInput(@Valid @RequestBody String input) {
      ResponseEntity response;
      LinkedList<Weather> weather = weatherService.getWeatherMatches(input);
      response = ResponseEntity
            .status(HttpStatus.OK)
            .body(weather);

      return response;
   }
}
