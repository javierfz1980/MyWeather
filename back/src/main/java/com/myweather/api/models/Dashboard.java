package com.myweather.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;


/**
 * Created by javierfz on 7/11/17.
 */
@Document(collection = "dashboards")
public class Dashboard {

   @Id
   private String id;
   private String name;
   private Collection<City> cities;

   public String getId() {
      return id;
   }

    public String getName() {
      return name;
   }

   public Collection<City> getCities() {
      return cities;
   }

   public void setId(String id) {
      this.id = id;
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setCities(Collection<City> cities) {
      this.cities = cities;
   }

   // constructor
   public Dashboard(String name) {
      this.name = name;
   }

   @Override
   public String toString() {
      return "Dashboard{" +
            ", id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", cities='" + cities + '\'' +
            '}';
   }
}
