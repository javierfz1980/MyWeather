package com.myweather.api.services.impl;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.DashboardMongoRepository;
import com.myweather.api.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public class DashboardServiceImpl implements DashboardService {

   @Autowired
   DashboardMongoRepository repository;

   @Override
   public void insert(Dashboard dsb) {
      repository.insert(dsb);
   }

   @Override
   public Dashboard getByName(String name) {
      return repository.getByName(name);
   }

   @Override
   public List<User> getAll() {
      return null;
   }
}
