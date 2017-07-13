package com.myweather.api.repositories.mongo;

import com.myweather.api.models.City;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by javierfz on 7/9/17.
 *
 * Interface that extends MongoRepository and adds a method for finding a specific Cities by its name
 *
 * Created by javierfz on 7/9/17.
 */
public interface CityMongoRepository extends MongoRepository<City, Integer> {

   City findByName(String name);

}
