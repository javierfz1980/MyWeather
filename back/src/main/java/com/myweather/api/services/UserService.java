package com.myweather.api.services;

import com.myweather.api.models.User;
import com.myweather.api.models.helpers.CustomResponse;
import org.springframework.stereotype.Service;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface UserService {

   /**
    * Insert a new User into db
    * @param user
    */
   CustomResponse insert(User user);

   /**
    * Retreives an User from db
    */
   User getByEmail(String email);

   /**
    * Retreives an User from db
    */
   User getById(String id);

   /**
    * Modifies an User from db
    */
   User update(User user);

}
