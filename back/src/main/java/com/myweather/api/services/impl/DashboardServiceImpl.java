package com.myweather.api.services.impl;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.DashboardMongoRepository;
import com.myweather.api.services.DashboardService;
import com.myweather.api.services.models.CustomResponse;
import com.sun.javafx.binding.StringFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public class DashboardServiceImpl implements DashboardService {

   private final Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);

   @Autowired
   DashboardMongoRepository repository;

   @Override
   public void insert(Dashboard dsb) {
      repository.insert(dsb);
   }

   @Override
   public Dashboard update(Dashboard dashboard) {
      try {
         repository.save(dashboard);
         logger.info(String.format("Dashboard %s saved on db", dashboard));
      } catch (Exception ex) {
         logger.info(String.format("Dashboard %s could not be saved on db. %s", dashboard, ex.getMessage()));
      }
      return dashboard;
   }
}
