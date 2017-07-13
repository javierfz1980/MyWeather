package com.myweather.api.models;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by javierfz on 7/11/17.
 */
@Document(collection = "cities")
public class City {

   private String name;

   public String get_name() {
      return name;
   }

   public void set_name(String name) {
      this.name = name;
   }
}
