package com.myweather.api.repositories.mongo;

import com.myweather.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by javierfz on 7/9/17.
 *
 * Interface that extends MongoRepository and adds a method for finding a specific Users by its email
 *
 * Created by javierfz on 7/9/17.
 */
@Repository
public interface UserMongoRepository extends MongoRepository<User, Integer> {

   User getById(String id);

   User getByEmail(String email);

   User getByEmailAndPassword(String email, String password);

}