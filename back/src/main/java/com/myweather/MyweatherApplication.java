package com.myweather;

import com.github.javafaker.Faker;
import com.myweather.models.User;
import com.myweather.respositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MyWeatherApplication {

	/**
	 * Data Faker in order to fake somo initial users
	 */
	private final Faker faker = new Faker();

	public static void main(String[] args) {
		SpringApplication.run(MyWeatherApplication.class, args);
	}

	/**
	 * Initialize the repository with some fake contents
	 * @param repository
	 * @return
	 */
	@Bean
	public CommandLineRunner initializeDb(UserRepository repository){
		return (args) -> {
			repository.deleteAll();
			repository.save(new User("javierfz1980@gmail.com", "asdasd"));
			repository.save(new User("asd@asd.asd", "asdasd"));
			//Insert some random pies
			for(int i = 0; i < 20; i++) {
				repository.save(new User(faker.internet().emailAddress(), faker.lorem().word()));
			}
		};
	}

}
