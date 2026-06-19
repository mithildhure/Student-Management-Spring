package com.mvc.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mvc.demo.dto.UserDto;
import com.mvc.demo.model.User;
import com.mvc.demo.repo.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	
//	Register
	@Transactional(rollbackOn = Exception.class)
	public ResponseEntity<User> register(UserDto userDto) {
		User user = new User();
		user.setUName(userDto.getUName());
		user.setUsername(userDto.getUsername());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		return new ResponseEntity<User>(userRepo.save(user), HttpStatus.OK);
	}
	
//	Login
	public ResponseEntity<User> login(UserDto userDto) {
		User user = userRepo.findByUsernameAndPassword(userDto.getUsername(), userDto.getPassword());
		if (user != null) {
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
	}
	
//	public
	
}
