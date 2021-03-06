package com.myweather.api.models;

import com.myweather.api.models.weatherData.Condition;
import com.myweather.api.models.weatherData.Forecast;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by javierfz on 7/20/17.
 */
@Document(collection = "weathers")
public class Weather {

   /**
    * Internal properties
    */
   @Id
   private String id;
   @Indexed(unique = true)
   private String woeid;
   private String title;
   private String description;
   private String link;
   private String pubDate;
   private Condition condition;
   private List<Forecast> forecast;

   /**
    * Getters
    */
   public String getId() {
      return id;
   }

   public String getWoeid() {
      return woeid;
   }

   public String getTitle() {
      return title;
   }

   public String getDescription() { return description; }

   public String getLink() {
      return link;
   }

   public String getPubDate() {
      return pubDate;
   }

   public Condition getCondition() {
      return condition;
   }

   public List<Forecast> getForecast() {
      return forecast;
   }

   /**
    * Setters
    */
   public void setId(String id) {
      this.id = id;
   }

   public void setWoeid(String woeid) {
      this.woeid = woeid;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public void setDescription(String description) { this.description = description; }

   public void setLink(String link) {
      this.link = link;
   }

   public void setPubDate(String pubDate) {
      this.pubDate = pubDate;
   }

   public void setCondition(Condition condition) {
      this.condition = condition;
   }

   public void setForecast(List<Forecast> forecast) {
      this.forecast = forecast;
   }

   /**
    * Constructor
    */
   public Weather(){}


   @Override
   public String toString() {
      return "Forecast{" +
            ", id='" + id + '\'' +
            ", woeid='" + woeid + '\'' +
            ", title='" + title + '\'' +
            ", description='" + description + '\'' +
            ", link='" + link + '\'' +
            ", pubDate='" + pubDate + '\'' +
            ", condition='" + condition + '\'' +
            ", forecast='" + forecast +
            '}';
   }
}