package com.mvc.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.demo.dto.UserDto;
import com.mvc.demo.model.User;
import com.mvc.demo.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody UserDto userDto) {		
		return userService.login(userDto);
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody UserDto userDto) {		
		return userService.register(userDto);
	}
	
	
}
