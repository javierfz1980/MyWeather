package com.myweather.api.services;


import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface DashboardService {

   /**
    * Insert a new Dashboard into db
    * @param dsb
    */
   void insert(Dashboard dsb);

   /**
    * Retreives an Dashboard from db
    */
   Dashboard getByName(String name);

   /**
    * Retreives an User from db
    */
   List<User> getAll();

}
