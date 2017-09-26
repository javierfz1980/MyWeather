package com.myweather.api.config.security.jwt;

import com.myweather.api.models.SessionToken;
import com.myweather.api.services.SessionService;
import com.myweather.api.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;

/**
 * Authentication service that sets and gets Jwt token athentications
 *
 * Created by vmware on 9/25/17.
 */
public class JWTAuthenticationService {

    /**
     * sets the authentication header to the request response on login and stores the token
     * @param res
     * @param email
     */
    static void setAuthentication (HttpServletResponse res, String email, SessionService sessionService) {
        String token = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + JWTSecurityConstants.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, JWTSecurityConstants.SECRET)
                .compact();

        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        res.addHeader(JWTSecurityConstants.HEADER_STRING, JWTSecurityConstants.TOKEN_PREFIX + token);

        renewUserToken(JWTSecurityConstants.TOKEN_PREFIX + token, email, sessionService);
    }

    /**
     * gets the authentication header from request
     *
     * @param request
     * @return
     */
    static UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request, SessionService sessionService) {
        String token = request.getHeader(JWTSecurityConstants.HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(JWTSecurityConstants.SECRET)
                    .parseClaimsJws(token.replace(JWTSecurityConstants.TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();

            SessionToken sessionToken = sessionService.getSessionTokenByUserEmail(user);

            if (user != null && sessionToken != null &&
                    user.equals(sessionToken.getUserEmail()) && token.equals(sessionToken.getToken())) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }

    private static void renewUserToken (String token, String email, SessionService sessionService) {
        SessionToken sessionToken;
        sessionToken = sessionService.getSessionTokenByUserEmail(email);

        if (sessionToken != null ) {
            sessionToken.setToken(token);
        } else {
            sessionToken = new SessionToken();
            sessionToken.setToken(token);
            sessionToken.setUserEmail(email);
        }

        sessionService.saveToken(sessionToken);
    }
}
