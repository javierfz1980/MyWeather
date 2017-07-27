package com.myweather.api.services.impl;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.models.Weather;
import com.myweather.api.repositories.mongo.DashboardMongoRepository;
import com.myweather.api.repositories.mongo.UserMongoRepository;
import com.myweather.api.repositories.mongo.WeatherMongoRepository;
import com.myweather.api.services.DashboardService;
import com.myweather.api.models.helpers.CustomResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public class DashboardServiceImpl implements DashboardService {

   private final Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);

   /**
    *
    */
   @Autowired
   DashboardMongoRepository dashboardRepository;

   /**
    *
    */
   @Autowired
   UserMongoRepository userRepository;

   /**
    *
    */
   @Autowired
   WeatherMongoRepository weatherRepository;

   /**
    *
    * @param userId
    * @param dashboard
    * @return
    */
   @Override
   public Dashboard insert(String userId, Dashboard dashboard) {
      try {
         dashboardRepository.insert(dashboard);
         User user = userRepository.getById(userId);
         user.getDashboards().add(dashboard);
         logger.info(String.format("Dashboard %s inserted for user %s", dashboard, userId));
      } catch (Exception ex) {
         logger.error(String.format("Dashboard %s could not be inserted for user %s. %s", dashboard, userId, ex.getMessage()));
      }
      return dashboard;
   }

   /**
    *
    * @param userId
    * @param dashboardId
    * @param dashboard
    * @return
    */
   @Override
   public CustomResponse delete(String userId, String dashboardId, Dashboard dashboard) {
      CustomResponse customResponse = new CustomResponse();
      Boolean status;
      String message;
      try {
         User user = userRepository.getById(userId);
         user.getDashboards().remove(dashboard);
         dashboardRepository.delete(dashboard);
         status = true;
         message = String.format("Dashboard %s deleted for user %s", dashboard, userId);
      } catch (Exception ex) {
         status = false;
         message = String.format("Dashboard %s could not be deleted for user %s. %s", dashboard, userId, ex.getMessage());

      }
      logger.info(message);
      customResponse.setStatus(status);
      customResponse.setMessage(message);
      return customResponse;
   }

   /**
    *
    * @param dashboard
    * @return
    */
   @Override
   public Dashboard update(Dashboard dashboard) {
      try {
         dashboardRepository.save(dashboard);
         logger.info(String.format("Dashboard %s saved on db", dashboard));
      } catch (Exception ex) {
         logger.error(String.format("Dashboard %s could not be saved on db. %s", dashboard, ex.getMessage()));
      }
      return dashboard;
   }


   /**
    *
    * @param userId
    * @param dashboardId
    * @param weather
    * @return
    */
   @Override
   public Weather addWeather(String userId, String dashboardId, Weather weather) {
      try {
         Dashboard dashboard = dashboardRepository.getById(dashboardId);
         dashboard.getWeathers().add(weather);
         dashboardRepository.save(dashboard);
         logger.info(String.format("Weather %s saved on dashboard %s for user %s", weather, dashboardId, userId));
      } catch (Exception ex) {
         logger.error(String.format("Weather %s could not be saved on dashboard %s for user %s. %s", weather, dashboardId, userId, ex.getMessage()));
      }
      return weather;
   }

   /**
    *
    * @param userId
    * @param dashboardId
    * @param weatherId
    * @return
    */
   @Override
   public Weather removeWeather(String userId, String dashboardId, String weatherId) {
      try {
         Weather weather = weatherRepository.getById(weatherId);
         Dashboard dashboard = dashboardRepository.getById(dashboardId);
         //dashboard.getWeathers().remove(weather);
         Iterator<Weather> it = dashboard.getWeathers().iterator();
         while (it.hasNext()) {
            Weather weatherIt = it.next();
            if (weatherIt.getId().equals(weather.getId())) {
               it.remove();
            }
         }
         dashboardRepository.save(dashboard);
         logger.info(String.format("Weather %s removed from dashboard %s for user %s", weather, dashboardId, userId));
         return weather;
      } catch (Exception ex) {
         logger.info(String.format("Weather %s could not be emoved from dashboard %s for user %s. %s", weatherId, dashboardId, userId, ex.getMessage()));
         return null;
      }

   }
}
