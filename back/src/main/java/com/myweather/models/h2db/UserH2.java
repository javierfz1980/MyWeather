package com.myweather.models.h2db;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by javierfz on 7/9/17.
 *
 * User model for h2
 *
 */
@Entity
public class UserH2 {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;

   private String email;
   private String password;

   public UserH2(String email, String password) {
      this.email = email;
      this.password = password;
   }

   //for JPA
   public UserH2() {}

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
