package com.myweather.api.repositories.mongo;

import com.myweather.api.models.Dashboard;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by vmware on 7/12/17.
 */
public interface DashboardMongoRepository extends MongoRepository<Dashboard, Integer> {

   Dashboard getById(String id);

}
