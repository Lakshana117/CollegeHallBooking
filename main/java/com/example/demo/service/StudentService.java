package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    public Student addStudent(Student student) {
        // Encode the password before saving
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        // Save the student directly to the repository
        return studentRepository.save(student);
    }
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }


    public List<Student> getStudentByFacultyId(Long facultyId) {
        return studentRepository.findByFacultyId(facultyId);
    }

    public Student updateStudent(Student studentDetails) {
        Optional<Student> studentOptional = studentRepository.findById(studentDetails.getId());
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setPassword(passwordEncoder.encode(studentDetails.getPassword()));
            student.setContact(studentDetails.getContact());
           
            student.setDept(studentDetails.getDept());
            student.setBatch(studentDetails.getBatch());
            student.setSection(studentDetails.getSection());
            return studentRepository.save(student);
        }
        throw new EntityNotFoundException("Student not found with id: " + studentDetails.getId());
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));
    }

    public List<Student> getStudentsByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    

    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }

    public List<Student> getStudentsByName(String name) {
        return studentRepository.findByName(name);
    }

    public List<Student> getStudentsByDeptAndName(String dept, String name) {
        return studentRepository.findByDeptAndName(dept, name);
    }

    public List<Student> getStudentsByDeptAndSection(String dept, String sec) {
        return studentRepository.findByDeptAndSection(dept, sec);
    }

    public void deleteStudentByName(String name) {
        List<Student> students = studentRepository.findByName(name);
        if (!students.isEmpty()) {
            studentRepository.delete(students.get(0)); // Assuming name is unique
        } else {
            throw new EntityNotFoundException("Student not found with name: " + name);
        }
    }

    public void deleteStudentByEmail(String email) {
        List<Student> students = studentRepository.findByEmail(email);
        if (!students.isEmpty()) {
            studentRepository.delete(students.get(0)); // Assuming email is unique
        } else {
            throw new EntityNotFoundException("Student not found with email: " + email);
        }
    }

    public List<Student> getStudentsByRegisterNo(String registerNo) {
        return studentRepository.findByRegisterNo(registerNo);
    }

    public Student updateStudentByRegisterNo(String registerNo, Student studentDetails) {
        List<Student> students = studentRepository.findByRegisterNo(registerNo);
        if (!students.isEmpty()) {
            Student existingStudent = students.get(0);
            existingStudent.setName(studentDetails.getName());
            existingStudent.setEmail(studentDetails.getEmail());
            existingStudent.setPassword(passwordEncoder.encode(studentDetails.getPassword()));
            
            existingStudent.setContact(studentDetails.getContact());
            
            existingStudent.setDept(studentDetails.getDept());
            existingStudent.setBatch(studentDetails.getBatch());
            existingStudent.setSection(studentDetails.getSection());
            existingStudent.setRegisterNo(studentDetails.getRegisterNo());
            return studentRepository.save(existingStudent);
        } else {
            throw new EntityNotFoundException("Student with registerNo " + registerNo + " not found");
        }
    }

    public Student updateStudentByEmail(String email, Student studentDetails) {
        List<Student> students = studentRepository.findByEmail(email);
        if (!students.isEmpty()) {
            Student existingStudent = students.get(0);
            existingStudent.setName(studentDetails.getName());
            existingStudent.setEmail(studentDetails.getEmail());
            existingStudent.setPassword(passwordEncoder.encode(studentDetails.getPassword()));
            
            existingStudent.setContact(studentDetails.getContact());
            
            existingStudent.setDept(studentDetails.getDept());
            existingStudent.setBatch(studentDetails.getBatch());
            existingStudent.setSection(studentDetails.getSection());
            existingStudent.setRegisterNo(studentDetails.getRegisterNo());
            return studentRepository.save(existingStudent);
        } else {
            throw new EntityNotFoundException("Student with email " + email + " not found");
        }
    }

    public List<Student> getStudentsByBatchDeptAndSection(String batch, String dept, String section) {
        return studentRepository.findByBatchAndDeptAndSection(batch, dept, section);
    }
}
