package com.myweather.api.models.weather.data;


/**
 * Created by javierfz on 7/20/17.
 */
public class Forecast {

   /**
    * Internal properties
    */
   private String day;
   private String date;
   private int low;
   private int high;
   private String text;
   private int code;

   /**
    * setters
    */
   public void setDay(String day) {
      this.day = day;
   }

   public void setDate(String date) {
      this.date = date;
   }

   public void setLow(int low) {
      this.low = low;
   }

   public void setHigh(int high) {
      this.high = high;
   }

   public void setText(String text) {
      this.text = text;
   }

   public void setCode(int code) {
      this.code = code;
   }

   /**
    * getters
    */
   public String getDay() {
      return day;
   }

   public String getDate() {
      return date;
   }

   public int getLow() {
      return low;
   }

   public int getHigh() {
      return high;
   }

   public String getText() {
      return text;
   }

   public int getCode() {
      return code;
   }

   /**
    * Constructor
    */
   public Forecast(){}


   @Override
   public String toString() {
      return "Forecast{" +
            ", day='" + day + '\'' +
            ", date='" + date + '\'' +
            ", low='" + low + '\'' +
            ", high='" + high + '\'' +
            ", text='" + text + '\'' +
            ", code='" + code +
            '}';
   }

}