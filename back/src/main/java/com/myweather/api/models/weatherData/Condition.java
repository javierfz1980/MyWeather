package com.myweather.api.models.weatherData;

/**
 * Created by javierfz on 7/20/17.
 */
public class Condition {

   /**
    * Internal properties
    */
   private String text;
   private int code;
   private int temp;
   private String date;

   /**
    * Setters
    */
   public void setText(String text) {
      this.text = text;
   }

   public void setCode(int code) {
      this.code = code;
   }

   public void setTemp(int temp) {
      this.temp = temp;
   }

   public void setDate(String date) {
      this.date = date;
   }

   /**
    * Getters
    */
   public String getText() {
      return text;
   }

   public int getCode() {
      return code;
   }

   public int getTemp() {
      return temp;
   }

   public String getDate() {
      return date;
   }


   /**
    * Constructor
    */
   public Condition() {}



   @Override
   public String toString() {
      return "Condition{" +
            ", text='" + text + '\'' +
            ", code='" + code + '\'' +
            ", temp='" + temp + '\'' +
            ", date='" + date +
            '}';
   }
}