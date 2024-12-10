package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Head;
import com.example.demo.model.Student;

public interface HeadRepository extends JpaRepository<Head, Long> {
    Optional<Head> findByEmail(String email);
    List<Head> findByDept(String dept);
    Optional<Student> findStudentByEmail(String email);
    String getDeptById(Long id);
}

