package com.myweather.api.repositories.mongo;

import com.myweather.api.models.SearchStr;
import com.myweather.api.models.weather.Weather;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by vmware on 7/21/17.
 */
public interface SearchStrMongoRepository extends MongoRepository<SearchStr, Integer> {

   SearchStr findBySearch(String str);

}
