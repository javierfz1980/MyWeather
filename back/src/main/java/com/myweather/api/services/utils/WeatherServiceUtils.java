package com.myweather.api.services.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.myweather.api.models.weather.Weather;
import com.myweather.api.models.weather.data.Condition;
import com.myweather.api.models.weather.data.Forecast;
import com.myweather.utils.Reflection;

import java.util.LinkedList;

/**
 * Created by vmware on 7/21/17.
 */
public class WeatherServiceUtils {

   /**
    * Create a Weather Model for each result of the query
    *
    * @param object
    * @return
    *
    */
   public static LinkedList<Weather> createWeather (JsonObject object) {
      LinkedList<Weather> weatherList = new LinkedList<Weather>();
      JsonArray results = object.getAsJsonObject("query").getAsJsonObject("results").getAsJsonArray("channel");
      for(int i=0; i<results.size(); i++){
         JsonObject item = results.get(i).getAsJsonObject().getAsJsonObject("item");
         JsonObject location = results.get(i).getAsJsonObject().getAsJsonObject("location");

         String woeid = WeatherServiceUtils.extractWoeidFromLink(item.get("link").getAsString());

         Weather weather = new Weather();
         weather.setId(woeid);
         weather.setTitle(location.get("city").getAsString() + ", " +
               location.get("region").getAsString() + ", " + location.get("country").getAsString() );
         weather.setDescription(item.get("title").getAsString());
         weather.setPubDate(item.get("pubDate").getAsString());
         weather.setLink(item.get("link").getAsString());
         weather.setWoeid(woeid);
         weather.setCondition(WeatherServiceUtils.createCondition(item.getAsJsonObject("condition")));
         weather.setForecast(WeatherServiceUtils.createForecasts(item));

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
    */
   private static LinkedList<Forecast> createForecasts(JsonObject item) {
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
    */
   private static Condition createCondition(JsonObject condition) {
      return Reflection.buildObject(new Condition(), condition);
   }

   /**
    * Extracts the WOEID from the link
    *
    * @param link
    * @return
    *
    */
   private static String extractWoeidFromLink(String link) {
      String[] parts = link.split("-");
      String id = parts[1].substring(0, parts[1].length()-1);
      return id;
   }

}
