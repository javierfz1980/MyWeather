package com.myweather.api.controllers;

import com.myweather.api.models.Weather;
import com.myweather.api.services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by javierfz on 7/19/17.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${http.weathersPath}")
public class WeatherController {

   /**
    * Injects the Weather Serivce
    */
   @Autowired
   private WeatherService weatherService;


   /**
    * Fetches all weathers from db or yahoo
    *
    * @return
    */
   @RequestMapping(method = RequestMethod.POST)
   public ResponseEntity<Weather> getWeather(@Valid @RequestBody String input) {
      ResponseEntity response;
      List<Weather> weather = weatherService.getWeather(input);
      response = ResponseEntity
            .status(HttpStatus.OK)
            .body(weather);

      return response;
   }
}
