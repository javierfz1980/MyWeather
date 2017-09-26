package com.myweather.api.config.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myweather.api.models.helpers.SessionCredentials;
import com.myweather.api.services.impl.DashboardServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Login filter that validates the authentication and add the token to the header response
 *
 * Created by vmware on 9/25/17.
 */
public class JWTLoginAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);

    // AuthenticationManager instance
    private AuthenticationManager authenticationManager;

    public JWTLoginAuthenticationFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        authenticationManager = authManager;
    }

    /**
     * Filter that attempts to authenticate the user with the provided SessionCredentials on the request body
     *
     * @param req
     * @param res
     * @return
     * @throws AuthenticationException
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            SessionCredentials creds = new ObjectMapper()
                    .readValue(req.getInputStream(), SessionCredentials.class);
            logger.info(String.format("Authenticating user %s", creds.getEmail()));

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    creds.getEmail(),
                    creds.getPassword(),
                    new ArrayList<>()));
        } catch (IOException e) {
            logger.info(String.format("Authentication failed"));
            throw new RuntimeException(e);
        }
    }

    /**
     * If the user authentication is valid it adds the jwt token to the response
     *
     * @param req
     * @param res
     * @param chain
     * @param auth
     * @throws IOException
     * @throws ServletException
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String email = ((User) auth.getPrincipal()).getUsername();
        JWTAuthenticationService.setAuthentication(res, email);
        logger.info(String.format("Authentication success for user %s", email));
        logger.info(String.format("jwt token added to the response header"));
    }
}