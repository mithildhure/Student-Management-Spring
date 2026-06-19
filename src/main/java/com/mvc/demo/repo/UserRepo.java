package com.mvc.demo.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mvc.demo.model.User;


@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

	User findByUsernameAndPassword(String username, String password);
	
}
