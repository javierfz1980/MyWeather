package com.myweather.shared;

/**
 * Created by javierfz on 7/9/17.
 *
 * Some utilities in order to configure some behaviors
 */
public final class ConfigUtils {

   /**
    * Some constants
    */
   public final static String MONGO_DB = "mongodb";
   public final static String H2_DB = "h2database";

   /**
    * Some configuration
    */
   public final static Boolean initializeFakeContents = false;
   public final static String dbType = MONGO_DB;

   /**
    * Private constructor in order to not allow instantiation
    *
    */
   private ConfigUtils () {
      throw new AssertionError();
   }
}
