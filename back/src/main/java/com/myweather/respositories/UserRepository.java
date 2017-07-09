package com.myweather.respositories;

import com.myweather.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by javierfz on 7/9/17.
 *
 * Interface that extends CurdRepository and adds a method for finding a specific User by its email
 *
 */
public interface UserRepository extends CrudRepository<User, Long> {

   /**
    * Looks into the repository searching by name
    * @param email
    * @return List<User>
    */
   List<User> findByEmail(String email);

}
