package com.myweather.api.services.models;

/**
 * Created by javierfz on 7/13/17.
 */
public class CustomResponse {

   private Boolean status;
   private String message;

   public Boolean getStatus() {
      return status;
   }

   public String getMessage() {
      return message;
   }

   public void setStatus(Boolean status) {
      this.status = status;
   }

   public void setMessage(String message) {
      this.message = message;
   }
}
