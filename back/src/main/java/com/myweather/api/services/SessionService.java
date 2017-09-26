package com.myweather.api.services;

import com.myweather.api.models.SessionToken;
import com.myweather.api.models.User;
import com.myweather.api.models.helpers.SessionCredentials;
import org.springframework.stereotype.Service;

/**
 * Created by javierfz on 7/13/17.
 */
@Service
public interface SessionService {

   void saveToken(SessionToken sessionToken);

   boolean deleteToken(SessionToken sessionToken);

   SessionToken getSessionTokenByUserEmail(String userEmail);

   SessionToken getSessionTokenByToken(String token);

   SessionToken getSessionTokenByTokenAndEmail(String token, String email);
}
