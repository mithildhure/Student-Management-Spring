package com.mvc.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.demo.dto.StudentDto;
import com.mvc.demo.model.Student;
import com.mvc.demo.service.StudentService;

@RestController
public class StudentController {

	@Autowired
	StudentService studentservice;
	
	@GetMapping("/fetch")
	public Page<Student> fetchByPage(@RequestParam Integer page) {
		return studentservice.fetchPagination(page);
	}
	
	@GetMapping("/fetchAll")
	public List<Student> fetch() {
		return studentservice.fetchAll();
	}	
	
	@PostMapping("/save")
	public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
		return studentservice.insertStudent(student);
	}
	
	@PutMapping("/update")
	public ResponseEntity<Student> updateStudent(@RequestParam Integer id, @RequestBody StudentDto dto) {
		return studentservice.updateStudent(id, dto);
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<Student> deleteStudent(@RequestParam Integer id){
		return studentservice.deleteStudent(id);
	}
	
	@GetMapping("/sorting")
	public List<Student> sortStudent(@RequestParam String sort, @RequestParam(required = false, defaultValue = "asc") String order) {
		return studentservice.fetchBySorting(sort, order);
	}
	
	
	
}
