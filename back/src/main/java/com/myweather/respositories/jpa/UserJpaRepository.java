package com.myweather.respositories.jpa;

import com.myweather.models.h2db.UserH2;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by javierfz on 7/9/17.
 *
 * Interface that extends CurdRepository and adds a method for finding a specific UserH2 by its email
 *
 */
public interface UserJpaRepository extends CrudRepository<UserH2, Long> {

   /**
    * Looks into the repository searching by name
    * @param email
    * @return List<UserH2>
    */
   List<UserH2> findByEmail(String email);

}
