package com.myweather.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by vmware on 9/26/17.
 */
@Document(collection = "sessionToken")
public class SessionToken {

    @Id
    private String id;
    private String token;
    @Indexed(unique = true)
    private String userEmail;

    public String getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return "User{" +
                ", id='" + id + '\'' +
                ", token='" + token + '\'' +
                ", userEmail='" + userEmail + '\'' +
                '}';
    }
}