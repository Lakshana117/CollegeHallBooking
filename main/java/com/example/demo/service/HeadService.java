package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Head;
import com.example.demo.model.Faculty;
import com.example.demo.model.Student;
import com.example.demo.repository.HeadRepository;
import com.example.demo.repository.FacultyRepository;
import com.example.demo.repository.StudentRepository;

@Service
public class HeadService {

    @Autowired
    private HeadRepository headRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Add a new Head
    public Head addHead(Head head) {
        head.setPassword(passwordEncoder.encode(head.getPassword()));
        return headRepository.save(head);
    }

    public String getDeptById(Long id) {
        return headRepository.getDeptById(id);
    }

    // Update an existing Head
    public Head updateHead(String email, Head headDetails) {
        Optional<Head> optionalHead = headRepository.findByEmail(email);
        if (optionalHead.isPresent()) {
            Head head = optionalHead.get();
            head.setEmail(headDetails.getEmail());
            head.setPassword(passwordEncoder.encode(headDetails.getPassword()));
            head.setName(headDetails.getName());
            head.setDept(headDetails.getDept());

            return headRepository.save(head);
        } else {
            throw new RuntimeException("Head not found with email: " + email);
        }
    }

    // Delete a Head by email
    public void deleteHead(String email) {
        Optional<Head> optionalHead = headRepository.findByEmail(email);
        if (optionalHead.isPresent()) {
            headRepository.delete(optionalHead.get());
        } else {
            throw new RuntimeException("Head not found with email: " + email);
        }
    }

    // Get a Head by email
    public Head getHeadByEmail(String email) {
        return headRepository.findByEmail(email).orElse(null);
    }

    // Get a Head by ID
    public Head getHeadById(Long id) {
        return headRepository.findById(id).orElse(null);
    }

    // Get all Heads
    public List<Head> getAllHeads() {
        return headRepository.findAll();
    }

  

    // Faculty CRUD operations
    public Faculty addFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public Faculty updateFacultyById(Long id, Faculty facultyDetails) {
        Optional<Faculty> optionalFaculty = facultyRepository.findById(id);
        if (optionalFaculty.isPresent()) {
            Faculty faculty = optionalFaculty.get();
            faculty.setName(facultyDetails.getName());
            faculty.setEmail(facultyDetails.getEmail());
            faculty.setClassBeingMentored(facultyDetails.getClassBeingMentored());
            return facultyRepository.save(faculty);
        } else {
            return null;
        }
    }

    public void deleteFacultyById(Long id) {
        Optional<Faculty> optionalFaculty = facultyRepository.findById(id);
        if (optionalFaculty.isPresent()) {
            facultyRepository.delete(optionalFaculty.get());
        }
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id).orElse(null);
    }

    public Faculty getFacultyByEmail(String email) {
        List<Faculty> faculties = facultyRepository.findByEmail(email);
        if (!faculties.isEmpty()) {
            return faculties.get(0); // Assuming you want the first faculty in the list
        } else {
            return null;
        }
    }

    public List<Faculty> getFacultiesByClassBeingMentored(String classBeingMentored) {
        return facultyRepository.findByClassBeingMentored(classBeingMentored);
    }

    // Student CRUD operations
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudentById(Long id, Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student existingStudent = optionalStudent.get();
            existingStudent.setName(studentDetails.getName());
            existingStudent.setEmail(studentDetails.getEmail());
            existingStudent.setPassword(studentDetails.getPassword());
            
            existingStudent.setContact(studentDetails.getContact());
            
            existingStudent.setDept(studentDetails.getDept());
            existingStudent.setBatch(studentDetails.getBatch());
            existingStudent.setSection(studentDetails.getSection());
            existingStudent.setRegisterNo(studentDetails.getRegisterNo());
            return studentRepository.save(existingStudent);
        } else {
            return null;
        }
    }

    public void deleteStudentById(Long id) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            studentRepository.delete(optionalStudent.get());
        }
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student getStudentByEmail(String email) {
        return headRepository.findStudentByEmail(email).orElse(null);
    }

    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    public List<Student> getStudentsByFacultyEmail(String facultyEmail) {
        List<Faculty> faculties = facultyRepository.findByEmail(facultyEmail);
        if (!faculties.isEmpty()) {
            return studentRepository.findByFaculty(faculties.get(0)); // Assuming you want the first faculty in the list
        } else {
            return List.of();
        }
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    

    
       
    }

