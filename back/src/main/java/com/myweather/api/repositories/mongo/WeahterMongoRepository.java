package com.myweather.api.repositories.mongo;

import com.myweather.api.models.weather.Weather;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by javierfz on 7/20/17.
 */
@Repository
public interface WeahterMongoRepository extends MongoRepository<Weather, Integer> {

   //get weather by title like *input* no case sensitive
   @Query(value="{'title':{$regex: ?0, $options: 'i'}}")
   List<Weather> getWeather(String input);

}