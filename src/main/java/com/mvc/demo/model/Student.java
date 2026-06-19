package com.mvc.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
//	NEVER USE UNDERSCORE FLW NAMING CONVENTION 
//	ILL UPDATE IN NEXT ONE
	private String firstname;
	private String lastname;
	private Integer age;
	private Integer standard;
	private Double fees;
	
	
}
