package com.myweather.api.models;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

/**
 * Created by vmware on 7/21/17.
 */
@Document(collection = "searchStrs")
public class SearchStr {

   @Id
   private String id;
   private String search;

   public void setSearch(String search) {
      this.search = search;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getSearch() {
      return search;
   }

   public String getId() {
      return id;
   }

}
