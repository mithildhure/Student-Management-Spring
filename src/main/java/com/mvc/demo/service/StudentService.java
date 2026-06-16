package com.mvc.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mvc.demo.model.Student;
import com.mvc.demo.repo.StudentRepo;

@Service
public class StudentService {

	@Autowired
	StudentRepo studentrepo;
	
//	INSERT
	public ResponseEntity<Student> insertStudent(Student student){
		return new ResponseEntity<Student>(studentrepo.save(student), HttpStatus.OK);
	}
	
//	UPDATE BY ID
	public ResponseEntity<Student> updateStudent(Integer id,String first_name, String last_name, Integer age, Integer standard, Double fees){
		if (studentrepo.existsById(id)) {
			Optional<Student> o = studentrepo.findById(id);
			Student s = o.get();
			s.setFirst_name(first_name);
			s.setLast_name(last_name);
			s.setAge(age);
			s.setStandard(standard);
			s.setFees(fees);
			return new ResponseEntity<Student>(studentrepo.save(s), HttpStatus.OK);
		} else {
			return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
		}
	}
	
//	DELETE BY ID
	public ResponseEntity<Student> deleteStudent(Integer id){
		if (studentrepo.existsById(id)) {
			studentrepo.deleteById(id);
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
		}else {
			return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
		}
	}
	
//	Fetch All
	public List<Student> fetchAll(){
		return studentrepo.findAll();
	}
	
//	Pagination
	public Page<Student> fetchPagination(Integer pageNumber){
		Pageable pageable = PageRequest.of(pageNumber-1, 10);
		return studentrepo.findAll(pageable);
	}
	
}
