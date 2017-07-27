package com.myweather.api.services;


import com.myweather.api.models.Dashboard;
import com.myweather.api.models.Weather;
import com.myweather.api.models.helpers.CustomResponse;
import org.springframework.stereotype.Service;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface DashboardService {

   /**
    * Insert a new Dashboard into db
    * @param dashboard
    */
   Dashboard insert(String userId, Dashboard dashboard);

   /**
    * Insert a new Dashboard into db
    * @param dashboard
    */
   CustomResponse delete(String userId, String dashboardId, Dashboard dashboard);

   /**
    *
    * @param dashboard
    * @return
    */
   Dashboard update(Dashboard dashboard);


   /**
    *
    * @param userId
    * @param dashboardId
    * @param weather
    * @return
    */
   Weather addWeather(String userId, String dashboardId, Weather weather);

   /**
    *
    * @param userId
    * @param dashboardId
    * @param weatherId
    * @return
    */
   Weather removeWeather(String userId, String dashboardId, String weatherId);


}
