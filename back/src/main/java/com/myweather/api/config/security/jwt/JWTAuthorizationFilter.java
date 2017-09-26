package com.myweather.api.config.security.jwt;

import com.myweather.api.services.SessionService;
import com.myweather.api.services.impl.DashboardServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * Filter that attempts to validate the Authorization jwt bearer on the requests
 *
 * Created by vmware on 9/25/17.
 */
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    SessionService sessionService;
    private final Logger logger = LoggerFactory.getLogger(DashboardServiceImpl.class);

    public JWTAuthorizationFilter(AuthenticationManager authManager, SessionService sessionService) {
        super(authManager);
        this.sessionService = sessionService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {

        logger.info(String.format("filtering request by jwt Authorization header"));
        UsernamePasswordAuthenticationToken authentication = JWTAuthenticationService.getAuthentication(req, sessionService);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }
}