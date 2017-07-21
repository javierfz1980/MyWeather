package com.myweather.api.services.impl;

import com.myweather.api.models.SearchStr;
import com.myweather.api.repositories.mongo.SearchStrMongoRepository;
import com.myweather.api.services.SearchStrService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by vmware on 7/21/17.
 */
@Service
public class SearchStrServiceImpl implements SearchStrService {

   private final Logger logger = LoggerFactory.getLogger(SearchStrServiceImpl.class);

   /**
    *
    */
   @Autowired
   SearchStrMongoRepository repository;


   /**
    *
    * @param str
    * @return
    */
   @Override
   public Boolean findBySearch(String str) {
      Boolean res;
      SearchStr searchStr;
      try {
         searchStr = repository.findBySearch(str);
         if (searchStr != null ) {
            this.logger.info(String.format("Search \"%s\" already exists ond local db search history.", str));
            res = true;
         } else {
            this.logger.info(String.format("Search \"%s\" doesn't exists ond local db search history.", str));
            res = false;
         }
      } catch (Exception ex) {
         this.logger.info(String.format("There was an error looking for search \"%s\" on local db.", str));
         res = false;
      }
      return res;
   }

   /**
    *
    * @param searchStr
    * @return
    */
   @Override
   public Boolean insert(SearchStr searchStr){
      Boolean res;
      try {
         repository.insert(searchStr);
         res = true;
      } catch (Exception ex) {
         res = false;
      }
      return res;
   }

}
