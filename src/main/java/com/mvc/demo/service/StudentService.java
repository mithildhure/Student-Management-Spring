package com.mvc.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mvc.demo.dto.StudentDto;
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
	public ResponseEntity<Student> updateStudent(Integer id, StudentDto stud){
		if (studentrepo.existsById(id)) {
			Optional<Student> o = studentrepo.findById(id);
			Student s = o.get();
			s.setFirst_name(stud.getFirstname());
			s.setLast_name(stud.getLastname());
			s.setAge(stud.getAge());
			s.setStandard(stud.getStandard());
			s.setFees(stud.getFees());
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
	
//	Sorting
	public List<Student> fetchBySorting(String sort, String order) {
		
		List<Student> students = null;
		
		if (order.equals("desc")) {
			students =  studentrepo.findAll(Sort.by(sort).descending());
		}else {
			students = studentrepo.findAll(Sort.by(sort));
		}
		return students;
	}
	
//	Filter
	
	
	
	
}
