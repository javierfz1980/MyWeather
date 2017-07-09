package com.myweather;

import com.github.javafaker.Faker;
import com.myweather.models.h2db.UserH2;
import com.myweather.models.mongodb.UserMongo;
import com.myweather.respositories.jpa.UserJpaRepository;
import com.myweather.shared.ConfigUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.MongoRepository;

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
	 * @param jpaRepository the instance of the JPA Repository
	 * @param mongoRepository the instance of the Mongo Repository
	 *
	 * @return
	 */
	@Bean
	public CommandLineRunner initializeDb(UserJpaRepository jpaRepository, MongoRepository mongoRepository){
		if (ConfigUtils.dbType == ConfigUtils.H2_DB) {
			return (args) -> {
				jpaRepository.deleteAll();
				jpaRepository.save(new UserH2("javierfz1980@gmail.com", "asdasd"));
				jpaRepository.save(new UserH2("asd@asd.asd", "asdasd"));
				//Insert some random pies
				for(int i = 0; i < 20; i++) {
					jpaRepository.save(new UserH2(faker.internet().emailAddress(), "h2_"+faker.lorem().word()));
				}
			};
		} else {
			if (ConfigUtils.initializeFakeContents) {
				return (args) -> {
					mongoRepository.deleteAll();
					UserMongo myUser = new UserMongo("javierfz1980@gmail.com", "asdasd");
					myUser.setAge(37);
					myUser.setGender("male");
					myUser.setName("Javier");
					myUser.setLastname("Fernandez");
					mongoRepository.save(myUser);
					//Insert some random pies
					for(int i = 0; i < 20; i++) {
						UserMongo user = new UserMongo(faker.internet().emailAddress(), "mongo_"+faker.lorem().word());
						user.setName(faker.name().firstName());
						user.setLastname(faker.name().lastName());
						user.setAge(30);
						mongoRepository.save(user);
					}
				};
			} else {
				return (args) -> {};

			}

		}
	}

}
