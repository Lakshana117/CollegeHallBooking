package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Faculty;
import com.example.demo.repository.FacultyRepository;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty addFaculty(Faculty faculty) {
        faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }

    public List<Faculty> getFacultyByEmail(String email) {
        return facultyRepository.findByEmail(email);
    }

    public List<Faculty> getFacultyByDept(String dept) {
        return facultyRepository.findByDept(dept);
    }

    public List<Faculty> getFacultyByClassBeingMentored(String classBeingMentored) {
        return facultyRepository.findByClassBeingMentored(classBeingMentored);
    }

    public List<Faculty> getFacultyByDeptAndClassBeingMentored(String dept, String classBeingMentored) {
        return facultyRepository.findByDeptAndClassBeingMentored(dept, classBeingMentored);
    }

    public void deleteFacultyByEmail(String email) {
        try {
            System.out.println("Service: Deleting faculty with email: " + email);
            facultyRepository.deleteByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
