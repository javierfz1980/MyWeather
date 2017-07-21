package com.myweather.api.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.myweather.api.models.weather.Weather;
import com.myweather.api.models.weather.data.Condition;
import com.myweather.api.models.weather.data.Forecast;
import com.myweather.api.repositories.mongo.WeahterMongoRepository;
import com.myweather.api.services.WeatherService;
import com.myweather.utils.Reflection;
import com.myweather.yahoo.YahooRequester;
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

   private static final ObjectMapper JSON_MAPPER = new ObjectMapper();
   private static org.slf4j.Logger logger = LoggerFactory.getLogger(WeatherServiceImpl.class);


   /**
    * Injects the UserRepository
    */
   @Autowired
   private WeahterMongoRepository repository;


   /*public Collection<Weather> findByName(String like) {
      try{
         Query query = new Query();
         query.addCriteria(Criteria.where("title").regex(toLikeRegex(like)));
         return repository.find(query, Weather.class);
      } catch(PatternSyntaxException e) {
         return Collections.emptyList();
      }
   }

   private String toLikeRegex(String source) {
      return source.replaceAll("\\*", ".*");
   }*/


   /**
    * Service try to look on internal Weather repository 1st. If there is no matches locally, the fetch weathers from Yahoo.
    *
    * @param input
    * @return
    */
   @Override
   public List<Weather> getWeatherByTitleLike(String input) {

      List<Weather> weather = repository.findByTitleLike(input);

      if (weather.size()>0) {
         logger.info(String.format("there are string matches on local db for input: %s", input));

      } else {
         logger.info(String.format("string doesn't match local db for input: %s . Fetching from Yahoo.", input));

         try {
            //TODO implement Yahoo query builder in order te allow different querys
            YahooRequester yahoo = new YahooRequester();
            JsonObject requestResult = yahoo.query(input);

            if(requestResult != null) {
               weather = createWeather(requestResult);
               logger.info(String.format("there are string matches on Yahoo db for input %s ", input));
               repository.save(weather);
               logger.info(String.format("Yahoo results saved on local db"));

            } else {
               weather = null;
               logger.info(String.format("there are no string matches on Yahoo db for input %s ", input));
            }

         } catch (Exception exeption) {

            weather = null;
            logger.info(String.format("There was an error fetching data from Yahoo"));
         }
      }

      if(weather==null)weather = new ArrayList<>();
      return weather;
   }


   /**
    * Create a Weather Model for each result of the query
    *
    * @param object
    * @return
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
    */
   private Condition createCondition(JsonObject condition) {
      return Reflection.buildObject(new Condition(), condition);
   }

   /**
    * Extracts the WOEID from the link
    *
    * @param link
    * @return
    */
   private String extractWoeidFromLink(String link) {
      String[] parts = link.split("-");
      String id = parts[1].substring(0, parts[1].length()-1);
      return id;
   }

   /**
    * Converts Date string into Date object
    *
    * @param dateStr
    * @return
    */
   /*
   private Date formatDate(String dateStr) {
      SimpleDateFormat format = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss zzz", Locale.ENGLISH);
      //SimpleDateFormat format = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm zzz", Locale.ENGLISH);
      try {
         return format.parse(dateStr);
      } catch (Exception ex) {
         return new Date();
      }

   }
   */

}
