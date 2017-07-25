package com.myweather.api.controllers;

import com.myweather.api.models.Dashboard;
import com.myweather.api.models.User;
import com.myweather.api.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by vmware on 7/23/17.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("${http.dashboardsPath}")
public class DashboardController {

   @Autowired
   DashboardService dashboardService;

   /**
    * Updates an existing Dasboard
    *
    * @return ResponseEntity with Status result
    */
   @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
   public ResponseEntity<User> update(@Valid @RequestBody Dashboard dashboard) {
      ResponseEntity response;
      Dashboard updatedUser = dashboardService.update(dashboard);
      HttpStatus status = (updatedUser != null) ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;

      response = ResponseEntity
            .status(status)
            .body(updatedUser);

      return response;
   }
}
