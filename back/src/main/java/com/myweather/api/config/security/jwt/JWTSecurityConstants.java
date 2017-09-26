package com.myweather.api.config.security.jwt;

import org.springframework.beans.factory.annotation.Value;

/**
 * Created by vmware on 9/25/17.
 */
public class JWTSecurityConstants {

    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

}
