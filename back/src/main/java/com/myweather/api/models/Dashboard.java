package com.myweather.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


/**
 * Created by javierfz on 7/11/17.
 */
@Document(collection = "dashboards")
public class Dashboard {

   @Id
   private String id;
   private String name;
   @DBRef
   private List<Weather> weathers;

   public String getId() {
      return id;
   }

   public String getName() {
      return name;
   }

   public List<Weather> getWeathers() {
      return weathers;
   }

   public void setId(String id) {
      this.id = id;
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setWeathers(List<Weather> weathers) {
      this.weathers = weathers;
   }

   // constructor
   public Dashboard(String name) {
      this.name = name;
   }

   public Dashboard() {}

   @Override
   public String toString() {
      return "Dashboard{" +
            ", id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", cities='" + weathers + '\'' +
            '}';
   }
}
