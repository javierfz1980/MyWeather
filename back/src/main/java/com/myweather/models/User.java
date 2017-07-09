package com.myweather.models;

/**
 * Created by javierfz on 7/9/17.
 *
 * User Model
 *
 */
public class User {

   private String email;
   private String password;

   public User (String email, String password) {
      this.email = email;
      this.password = password;
   }

   //for JPA
   public User () {}

   /**
    * Returns the current email
    *
    * @return string
    */
   public String getEmail() {
      return email;
   }

   /**
    * Returns the current password
    *
    * @return string
    */
   public String getPassword() {
      return password;
   }



}
