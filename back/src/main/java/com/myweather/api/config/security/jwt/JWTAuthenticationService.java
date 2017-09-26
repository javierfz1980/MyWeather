package com.myweather.api.config.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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
     * sets the authentication header to the request response
     * @param res
     * @param email
     */
    static void setAuthentication (HttpServletResponse res, String email) {
        String token = Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + JWTSecurityConstants.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, JWTSecurityConstants.SECRET)
                .compact();
        res.setHeader("Access-Control-Expose-Headers", "Authorization");
        res.addHeader(JWTSecurityConstants.HEADER_STRING, JWTSecurityConstants.TOKEN_PREFIX + token);
    }

    /**
     * gets the authentication header from request
     *
     * @param request
     * @return
     */
    static UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(JWTSecurityConstants.HEADER_STRING);
        if (token != null) {
            // parse the token.
            String user = Jwts.parser()
                    .setSigningKey(JWTSecurityConstants.SECRET)
                    .parseClaimsJws(token.replace(JWTSecurityConstants.TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();

            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
            }
            return null;
        }
        return null;
    }
}
