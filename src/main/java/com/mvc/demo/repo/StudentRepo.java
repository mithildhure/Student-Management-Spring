package com.mvc.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mvc.demo.model.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer>{
	
	    @Query("SELECT s FROM Student s WHERE LOWER(s.firstname) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.lastname) LIKE LOWER(CONCAT('%', :search, '%'))")
	    List<Student> searchStudents(String search);
	
	
}
