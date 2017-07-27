package com.myweather.api.services;

import com.myweather.api.models.Weather;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by javierfz on 7/19/17.
 */
@Service
public interface WeatherService {

   List<Weather> getWeather(String input);

}
