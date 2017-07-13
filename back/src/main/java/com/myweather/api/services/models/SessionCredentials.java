package com.myweather.api.services.models;

/**
 * Created by javierfz on 7/13/17.
 */
public class SessionCredentials {

   private String user;
   private String password;

   public String getUser() {
      return user;
   }

   public String getPassword() {
      return password;
   }

   public void setUser(String user) {
      this.user = user;
   }

   public void setPassword(String password) {
      this.password = password;
   }
}
