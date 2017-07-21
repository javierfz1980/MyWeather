package com.myweather.api.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.myweather.api.models.SearchStr;
import com.myweather.api.models.weather.Weather;
import com.myweather.api.models.weather.data.Condition;
import com.myweather.api.models.weather.data.Forecast;
import com.myweather.api.repositories.mongo.SearchStrMongoRepository;
import com.myweather.api.repositories.mongo.WeahterMongoRepository;
import com.myweather.api.services.SearchStrService;
import com.myweather.api.services.WeatherService;
import com.myweather.utils.Reflection;
import com.myweather.yahoo.YahooRequester;
import com.sun.javafx.binding.StringFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.PatternSyntaxException;

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
   private SearchStrService searchStrService;


   /**
    * Injects the UserRepository
    */
   @Autowired
   private WeahterMongoRepository repository;


   /**
    * Service try to look on internal Weather repository 1st. If there is no matches locally, the fetch weathers from Yahoo.
    *
    * @param input
    * @return
    */
   @Override
   public List<Weather> getWeatherByTitleLike(String input) {

      List<Weather> weatherList;

      if (searchAlreadyExists(input)) {
         weatherList = this.searchOnMongo(input);
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
      return repository.findByTitleNoCaseSensitive(input);
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
         YahooRequester yahoo = new YahooRequester();
         JsonObject requestResult = yahoo.query(input);

         if(requestResult != null) {
            weatherList = createWeather(requestResult);
            logger.info(String.format("there are string matches on Yahoo db for input %s ", input));
            repository.save(weatherList);
            logger.info(String.format("Yahoo results saved on local db"));

            // since there are results from yahoo, search is valid and should be saved for future querys
            this.saveValidSearch(input);

         } else {
            weatherList = null;
            logger.info(String.format("there are no string matches on Yahoo db for input %s ", input));
         }

      } catch (Exception exeption) {

         weatherList = null;
         logger.info(String.format("There was an error fetching data from Yahoo"));
      }

      return weatherList;
   }

   /**
    *
    * @param str
    * @return
    */
   private Boolean searchAlreadyExists(String str) {
      return  searchStrService.findBySearch(str);
   }

   /**
    *
    * @param str
    */
   private void saveValidSearch(String str) {
      SearchStr searchStr = new SearchStr();
      searchStr.setSearch(str);
      if (searchStrService.insert(searchStr)) {
         logger.info(String.format("search \"%s\" saved locally",str));
      } else {
         logger.info(String.format("search \"%s\" could not be saved locally",str));
      }
   }

   /**
    * Create a Weather Model for each result of the query
    *
    * @param object
    * @return
    *
    * TODO move to a WeatherServiceUtils
    */
   private LinkedList<Weather> createWeather (JsonObject object) {
      LinkedList<Weather> weatherList = new LinkedList<Weather>();
      JsonArray results = object.getAsJsonObject("query").getAsJsonObject("results").getAsJsonArray("channel");
      for(int i=0; i<results.size(); i++){
         JsonObject item = results.get(i).getAsJsonObject().getAsJsonObject("item");
         String woeid = this.extractWoeidFromLink(item.get("link").getAsString());
         Weather weather = new Weather();
         weather.setId(woeid);
         weather.setTitle(item.get("title").getAsString());
         weather.setPubDate(item.get("pubDate").getAsString());
         weather.setLink(item.get("link").getAsString());
         weather.setWoeid(woeid);
         weather.setCondition(this.createCondition(item.getAsJsonObject("condition")));
         weather.setForecast(this.createForecasts(item));

         weatherList.add(weather);
      }

      return weatherList;
   }

   /**
    * Returns a list of Forecast Model for each item
    *
    * @param item
    * @return
    *
    * TODO move to a WeatherServiceUtils
    */
   private LinkedList<Forecast> createForecasts(JsonObject item) {
      LinkedList<Forecast> forecastsList = new LinkedList<>();
      JsonArray forecasts = item.getAsJsonArray("forecast");
      for(int i=0; i<forecasts.size(); i++){
         JsonObject forecast = forecasts.get(i).getAsJsonObject();
         forecastsList.add(Reflection.buildObject(new Forecast(), forecast));
      }

      return forecastsList;
   }

   /**
    * Returns a Condition Model for each item
    *
    * @param condition
    * @return
    *
    * TODO move to a WeatherServiceUtils
    */
   private Condition createCondition(JsonObject condition) {
      return Reflection.buildObject(new Condition(), condition);
   }

   /**
    * Extracts the WOEID from the link
    *
    * @param link
    * @return
    *
    * TODO move to a WeatherServiceUtils
    */
   private String extractWoeidFromLink(String link) {
      String[] parts = link.split("-");
      String id = parts[1].substring(0, parts[1].length()-1);
      return id;
   }


}
