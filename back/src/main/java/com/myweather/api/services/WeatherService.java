package com.myweather.api.services;

import com.google.gson.JsonObject;
import com.myweather.api.models.weather.Weather;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.LinkedList;

/**
 * Created by javierfz on 7/19/17.
 */
@Service
public interface WeatherService {

   LinkedList<Weather> getWeatherMatches(String input);
}
