package com.myweather.api.services.impl;

import com.google.gson.JsonObject;
import com.myweather.api.models.Weather;
import com.myweather.api.repositories.mongo.WeatherMongoRepository;
import com.myweather.api.services.PollingService;
import com.myweather.api.utils.yahoo.YahooWeatherClient;
import com.myweather.api.utils.yahoo.YahooWeatherUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by vmware on 7/26/17.
 */
@Service
public class PollingServiceImpl implements PollingService {

   /**
    * Injects the WeatherService in order to fetch all the weathers and save them.
    */
   @Autowired
   WeatherMongoRepository repository;

   private Logger logger = LoggerFactory.getLogger(PollingServiceImpl.class);
   private final YahooWeatherClient yahoo = new YahooWeatherClient();


   /**
    * Starts polling
    */
   @Scheduled(fixedDelay = (5 * 60 * 1000))
   public void startPolling() {
      logger.info(String.format("weather polling: started, interval: %s", (10 * 60 * 1000)));
      try {
         List<Weather> weatherList;
         //TODO implement Yahoo query builder in order te allow different querys
         String currentWeathers = YahooWeatherUtils.getAllWeathersAsCommaSeparated(repository.findAll());
         String query = String.format(YahooWeatherClient.BULK_QUERY_STR, currentWeathers);
         JsonObject requestResult = yahoo.query(query);

         if(requestResult != null) {
            weatherList = YahooWeatherUtils.createWeather(requestResult);
            repository.save(weatherList);
            logger.info(String.format("weather polling: all weathers (%s) on db were successfully updated", currentWeathers));

         } else {
            logger.info(String.format("weather polling: weathers (%s) on db could not be updated %s ", currentWeathers));
         }

      } catch (Exception exeption) {
         logger.info(String.format("weather polling: There was an error fetching weatherData from Yahoo"));
      }

   }

}
