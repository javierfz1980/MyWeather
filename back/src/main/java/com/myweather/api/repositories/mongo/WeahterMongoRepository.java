package com.myweather.api.repositories.mongo;

import com.myweather.api.models.weather.Weather;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;


/**
 * Created by javierfz on 7/20/17.
 */
@Repository
public interface WeahterMongoRepository extends MongoRepository<Weather, Integer> {

   List<Weather> findByTitleLike(String input);

}
