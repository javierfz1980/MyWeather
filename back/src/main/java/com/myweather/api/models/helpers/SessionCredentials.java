package com.myweather.api.models.helpers;

/**
 * Created by javierfz on 7/13/17.
 */
public class SessionCredentials {

   private String email;
   private String password;

   public String getEmail() {
      return email;
   }

   public String getPassword() {
      return password;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public void setPassword(String password) {
      this.password = password;
   }
}
