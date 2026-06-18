package com.mvc.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mvc.demo.dto.StudentDto;
import com.mvc.demo.model.Student;
import com.mvc.demo.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentservice;
	
	@GetMapping("/fetchPage")
	public ResponseEntity<Page<Student>> fetchByPage(@RequestParam Integer page) {
		return studentservice.fetchPagination(page);
	}
	
	@GetMapping("/fetchAll")
	public ResponseEntity<List<Student>> fetch() {
		return studentservice.fetchAll();
	}
	
	@GetMapping("/fetch/{id}")
	public ResponseEntity<Student> getMethodName(@PathVariable Integer id) {
		return studentservice.fetchStudentById(id);
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
	public ResponseEntity<List<Student>> sortStudent(@RequestParam String sort, @RequestParam(required = false, defaultValue = "asc") String order) {
		return studentservice.fetchBySorting(sort, order);
	}
	
}
