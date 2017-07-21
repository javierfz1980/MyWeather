package com.myweather.api.services;

import com.myweather.api.models.SearchStr;
import com.myweather.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

/**
 * Created by vmware on 7/21/17.
 */
@Service
public interface SearchStrService {

   Boolean findBySearch(String str);

   Boolean insert(SearchStr searchStr);

}
