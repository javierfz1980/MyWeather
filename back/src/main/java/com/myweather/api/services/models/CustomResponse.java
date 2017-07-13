package com.myweather.api.services.models;

/**
 * Created by javierfz on 7/13/17.
 */
public class CustomResponse {

   private Boolean status;
   private String errorMessage;

   public Boolean getStatus() {
      return status;
   }

   public String getErrorMessage() {
      return errorMessage;
   }

   public void setStatus(Boolean status) {
      this.status = status;
   }

   public void setErrorMessage(String errorMessage) {
      this.errorMessage = errorMessage;
   }
}
