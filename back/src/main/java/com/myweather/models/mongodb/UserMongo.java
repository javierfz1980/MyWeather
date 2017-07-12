package com.myweather.models.mongodb;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;

/**
 * Created by javierfz on 7/9/17.
 *
 * User model for mongodb
 *
 * The @Document annotation specifies a users collection.
 * This tells Spring Data MongoDB to store a User document to the users collection.
 * This collection will be created if it doesn’t exist.
 * The @Document annotation is optional, and if we don’t use one, the collection will be named with the class name.
 *
 */
@Document(collection = "users")
public class UserMongo {

   /**
    * Private attributes of User Model
    *
    * All documents in MongDB have an _id field as the primary key.
    * The id field annotated with @Id maps to the MongoDB document’s _id.
    * It’s not mandatory to use the @Id annotation if the primary key field is named id .
    * However, many still use the annotation for readability.
    */
   @Id
   private String id;
   private String name;
   private String lastname;
   @Indexed(unique = true)
   private String email;
   private String password;
   private String gender;
   private int age;
   private Collection<DashboardMongo> dashboards;

   /**
    * Getters and Setters
    *
    */
   public String getId() {
      return id;
   }

   public String getName() {
      return name;
   }

   public String getLastname() {
      return lastname;
   }

   public String getEmail() {
      return email;
   }

   public String getPassword() {
      return password;
   }

   public String getGender() {
      return gender;
   }

   public int getAge() {
      return age;
   }

   public Collection<DashboardMongo> getDashboards() {
      return dashboards;
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setLastname(String lastname) {
      this.lastname = lastname;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public void setGender(String gender) {
      this.gender = gender;
   }

   public void setAge(int age) {
      this.age = age;
   }

   public void setDashboards(Collection<DashboardMongo> dashboards) {
      this.dashboards = dashboards;
   }

   /**
    * Constructor.
    *
    * Only name and password are mandatory in order to create a new User.
    */
   public UserMongo() {
   }

   public UserMongo(String email, String password) {
      this.email = email;
      this.password = password;
   }

   @Override
   public String toString() {
      return "User{" +
            ", id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", lastname='" + lastname + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", sex='" + gender + '\'' +
            ", age=" + age +
            '}';
   }


}
