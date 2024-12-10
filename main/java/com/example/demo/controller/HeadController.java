package com.example.demo.controller;

import com.example.demo.model.Head;
import com.example.demo.model.Faculty;
import com.example.demo.model.Student;
import com.example.demo.service.HeadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/heads")
public class HeadController {

    @Autowired
    private HeadService headService;

    // Faculty endpoints
    @PostMapping("/faculty")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty faculty) {
        Faculty createdFaculty = headService.addFaculty(faculty);
        return ResponseEntity.ok(createdFaculty);
    }

    @GetMapping("/faculty/email/{email}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<Faculty> getFacultyByEmail(@PathVariable String email) {
        Faculty faculty = headService.getFacultyByEmail(email);
        return faculty != null ? ResponseEntity.ok(faculty) : ResponseEntity.notFound().build();
    }

    @GetMapping("/faculty/class/{classBeingMentored}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<List<Faculty>> getFacultyByClassBeingMentored(@PathVariable String classBeingMentored) {
        List<Faculty> facultyList = headService.getFacultiesByClassBeingMentored(classBeingMentored);
        return ResponseEntity.ok(facultyList);
    }

    @GetMapping("/faculty/all")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        List<Faculty> facultyList = headService.getAllFaculties();
        return ResponseEntity.ok(facultyList);
    }

    // Student endpoints
    @PostMapping("/students")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student createdStudent = headService.addStudent(student);
        return ResponseEntity.ok(createdStudent);
    }

    @DeleteMapping("/students/{id}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<Void> deleteStudentById(@PathVariable Long id) {
        headService.deleteStudentById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/students/{id}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = headService.getStudentById(id);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @GetMapping("/students/all")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = headService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/students/email/{email}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Student student = headService.getStudentByEmail(email);
        return student != null ? ResponseEntity.ok(student) : ResponseEntity.notFound().build();
    }

    @GetMapping("/students/department/{dept}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<List<Student>> getStudentsByDept(@PathVariable String dept) {
        List<Student> students = headService.getStudentsByDept(dept);
        return ResponseEntity.ok(students);
    }


    // Head endpoints
    @GetMapping("/id/{id}")
    @PreAuthorize("hasAuthority('HEAD')")
    public ResponseEntity<Head> getHeadById(@PathVariable Long id) {
        Head head = headService.getHeadById(id);
        return head != null ? ResponseEntity.ok(head) : ResponseEntity.notFound().build();
    }
}
