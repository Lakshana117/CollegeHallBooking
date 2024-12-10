package com.example.demo.repository;

import com.example.demo.model.Faculty;
import com.example.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByEmail(String email);
    List<Student> findByDept(String dept);
    List<Student> findBySection(String section);

    List<Student> findByBatch(String batch);
    List<Student> findByName(String name);
    List<Student> findByDeptAndName(String dept, String name);
    List<Student> findByDeptAndId(String dept, Long id);
    List<Student> findByDeptAndSection(String dept, String section);
    List<Student> findByDeptAndBatchAndSection(String dept, String batch, String section);
    List<Student> findByFaculty(Faculty faculty);
    List<Student> findByDeptAndBatch(String dept, String batch);
    List<Student> findByBatchAndDept(String batch, String dept);

    List<Student> findByFacultyId(Long facultyId);
    List<Student> findByDeptAndEmail(String dept, String email);
    List<Student> findByRegisterNo(String registerNo);  // New method
    List<Student> findByBatchAndDeptAndSection(String batch, String dept, String section);
    List<Student> findByFacultyEmail(String facultyEmail);
    void deleteByName(String name);
    
    void deleteByEmail(String email);
}
