package com.myweather.api.services.impl;

import com.google.gson.JsonObject;
import com.myweather.api.models.Weather;
import com.myweather.api.repositories.mongo.WeatherMongoRepository;
import com.myweather.api.services.WeatherService;
import com.myweather.api.utils.yahoo.YahooWeatherUtils;
import com.myweather.api.utils.yahoo.YahooWeatherClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by javierfz on 7/19/17.
 */
@Service
public class WeatherServiceImpl implements WeatherService {

   private static Logger logger = LoggerFactory.getLogger(WeatherServiceImpl.class);

   /**
    * Injects the UserRepository
    */
   @Autowired
   private WeatherMongoRepository repository;


   /**
    * Tries to look on internal Weather repository 1st. If there is no matches locally, the fetch weathers from Yahoo.
    *
    * @param input
    * @return
    */
   @Override
   public List<Weather> getWeather(String input) {

      List<Weather> weatherList = this.searchOnMongo(input);

      if (weatherList.size() > 0) {
         logger.info(String.format("there are string matches on local db for input: %s", input));
      } else {
         logger.info(String.format("string doesn't match local db for input: %s . Fetching from Yahoo.", input));
         weatherList = this.searchOnYahoo(input);
      }

      if(weatherList==null)weatherList = new ArrayList<>();
      return weatherList;
   }



   /**
    *
    * @param input
    * @return
    */
   private List<Weather> searchOnMongo(String input) {
      return repository.getWeather(input);
   }

   /**
    *
    * @param input
    * @return
    */
   private List<Weather> searchOnYahoo(String input) {
      List<Weather> weatherList;

      try {
         //TODO implement Yahoo query builder in order te allow different querys
         YahooWeatherClient yahoo = new YahooWeatherClient();
         String query = String.format(YahooWeatherClient.QUERY_STR, input);
         JsonObject requestResult = yahoo.query(query);

         if(requestResult != null) {
            weatherList = YahooWeatherUtils.createWeather(requestResult);
            logger.info(String.format("there are string matches on Yahoo db for input %s ", input));
            repository.save(weatherList);
            logger.info(String.format("Yahoo results saved on local db"));

         } else {
            weatherList = null;
            logger.info(String.format("there are no string matches on Yahoo db for input %s ", input));
         }

      } catch (Exception exeption) {

         weatherList = null;
         logger.info(String.format("There was an error fetching weatherData from Yahoo"));
      }

      return weatherList;
   }

}
