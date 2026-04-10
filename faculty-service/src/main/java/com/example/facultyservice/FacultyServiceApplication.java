package com.example.facultyservice;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class FacultyServiceApplication {
    public static void main(String[] args) {
        org.springframework.boot.SpringApplication.run(FacultyServiceApplication.class, args);
    }
}
