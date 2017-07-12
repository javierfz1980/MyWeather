package com.myweather.respositories.mongo;

import com.myweather.models.mongodb.DashboardMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by vmware on 7/12/17.
 */
public interface DashboardMongoRepository extends MongoRepository<DashboardMongo, Integer> {

   DashboardMongo findByName(String name);

}
