package com.mvc.demo.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserDto {

	private String uName;
	private String username;
	
	@Email(message = "Enter a valid Email!")
	private String email;
	private String password; 

}
