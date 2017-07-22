package com.myweather.yahoo;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URI;

/**
 * Created by javierfz on 7/19/17.
 */
public class YahooRequester {

   private final String URL = "https://query.yahooapis.com/v1/public/yql";
   private final String QUERY_STR = "select item, location from weather.forecast where woeid in (select woeid from geo.places where text=\"*%s*\")";
   private final String QUERY = "q";
   private final String FORMAT = "format";
   private final String FORMAT_VAL = "json";

   private final org.slf4j.Logger logger =  LoggerFactory.getLogger(YahooRequester.class);

   public YahooRequester() {

   }

   public JsonObject query(String city) {
      URI uri = createUri(city);
      try (CloseableHttpClient httpClient = HttpClientBuilder.create().build()) {
         HttpGet request = new HttpGet(uri);
         HttpResponse result = httpClient.execute(request);
         Integer status = result.getStatusLine().getStatusCode();
         HttpEntity entity = result.getEntity();
         //String res = EntityUtils.toString(entity);
         JsonObject json = new JsonParser().parse(EntityUtils.toString(entity)).getAsJsonObject();

         if (status == HttpStatus.SC_OK) {
            logger.info(String.format("Yahoo query %s successfully executed", uri));
            return json;
         } else {
            logger.error(String.format("Failed to execute query %s : ", uri));
            return null;
         }

      } catch (IOException ex) {

         logger.error(String.format("Failed to execute Yahoo query %s : $s", uri, ex.getMessage()));
         return null;
      }
   }

   private URI createUri(String city) {
      try {

         URIBuilder uri = new URIBuilder(URL);
         String finalQuery = String.format(QUERY_STR, city);
         uri.addParameter(QUERY, finalQuery);
         uri.addParameter(FORMAT, FORMAT_VAL);

         logger.info(String.format("New URI created: %s", finalQuery));
         return uri.build();

      } catch (Exception ex) {

         logger.error(String.format("Failed to create URI: %s", ex.getMessage()));
         return null;
      }
   }


}
