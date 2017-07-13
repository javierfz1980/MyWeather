package com.myweather;

import com.github.javafaker.Faker;
import com.myweather.api.models.User;
import com.myweather.api.repositories.mongo.UserMongoRepository;
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
	 * Initialize the repository with some fake contents according to the selected DB on ConfigUtils
	 *
	 * @param userMongoRepository the instance of the Mongo Repository
	 *
	 * @return
	 */
	/*@Bean
	public CommandLineRunner initializeDb(UserMongoRepository userMongoRepository){
		return (args) -> {
			userMongoRepository.deleteAll();
			User myUser = new User("javierfz1980@gmail.com", "asdasd");
			myUser.setAge(37);
			myUser.setGender("male");
			myUser.setName("Javier");
			myUser.setLastname("Fernandez");
			userMongoRepository.save(myUser);
			//Insert some random pies
			for(int i = 0; i < 20; i++) {
				User user = new User(faker.internet().emailAddress(), "mongo_"+faker.lorem().word());
				user.setName(faker.name().firstName());
				user.setLastname(faker.name().lastName());
				user.setAge(30);
				userMongoRepository.save(user);
			}
		};
	}*/

}
