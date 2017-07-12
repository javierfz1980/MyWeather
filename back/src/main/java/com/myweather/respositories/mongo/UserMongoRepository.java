package com.myweather.respositories.mongo;

import com.myweather.models.mongodb.UserMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by javierfz on 7/9/17.
 *
 * Interface that extends MongoRepository and adds a method for finding a specific UserMongo by its email
 *
 */
/**
 * Created by javierfz on 7/9/17.
 */
public interface UserMongoRepository extends MongoRepository<UserMongo, Integer> {

   UserMongo findByEmail(String email);

}