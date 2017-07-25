package com.myweather.api.services;


import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.services.models.CustomResponse;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface DashboardService {

   /**
    * Insert a new Dashboard into db
    * @param dashboard
    */
   void insert(Dashboard dashboard);

   /**
    *
    * @param dashboard
    * @return
    */
   Dashboard update(Dashboard dashboard);


}
