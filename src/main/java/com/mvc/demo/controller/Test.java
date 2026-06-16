package com.mvc.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class Test {

	@GetMapping("/login")
	public String login() {
		return "login.jsp";
	}
	
	@PostMapping("/login")
	public String welcome(@RequestBody String username) {
		System.out.println(username);
		
		return "welcome.jsp";
	}
	
}
