package com.myweather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MyWeatherApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyWeatherApplication.class, args);
	}

}
