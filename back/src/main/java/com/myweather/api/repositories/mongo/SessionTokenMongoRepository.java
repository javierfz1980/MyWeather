package com.myweather.api.repositories.mongo;

import com.myweather.api.models.SessionToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by vmware on 9/26/17.
 */
@Repository
public interface SessionTokenMongoRepository extends MongoRepository<SessionToken, Integer> {

    SessionToken getByUserEmail(String userEmail);

    SessionToken getByToken(String token);

    SessionToken getByTokenAndUserEmail(String token, String userEmail);
}
