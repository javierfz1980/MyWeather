package com.myweather.api.services;

import com.myweather.api.models.User;
import com.myweather.api.services.models.SessionCredentials;
import org.springframework.stereotype.Service;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface SessionService {

   User validateCredentials(SessionCredentials sessionCredentials);
}
