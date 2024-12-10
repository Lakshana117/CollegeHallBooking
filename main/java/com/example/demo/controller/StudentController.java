package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Student;
import com.example.demo.service.HeadService;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private HeadService headService;

    @GetMapping("/all")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD')")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{StudentId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD', 'STUDENT')")
    public Student getStudentById(@PathVariable Long StudentId) {
        return studentService.getStudentById(StudentId);
    }

    @GetMapping("/faculty/facultyId/{facultyId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentByFacultyId(@PathVariable Long facultyId) {
        return studentService.getStudentByFacultyId(facultyId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Student createStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }
    

    @PutMapping("/updateByRegisterNo/{registerNo}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Student updateStudentByRegisterNo(@PathVariable String registerNo, @RequestBody Student studentDetails) {
        return studentService.updateStudentByRegisterNo(registerNo, studentDetails);
    }

    @PutMapping("/updateByEmail/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Student updateStudentByEmail(@PathVariable String email, @RequestBody Student studentDetails) {
        return studentService.updateStudentByEmail(email, studentDetails);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByEmail(@PathVariable String email) {
        return studentService.getStudentsByEmail(email);
    }

    @GetMapping("/dept/head/{headId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByDept(@PathVariable Long headId) {
        String dept = headService.getDeptById(headId);
        return studentService.getStudentsByDept(dept);
    }

    @GetMapping("/dept/{dept}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByDept(@PathVariable String dept) {
        return studentService.getStudentsByDept(dept);
    }

    @GetMapping("/batch/{batch}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByBatch(@PathVariable String batch) {
        return studentService.getStudentsByBatch(batch);
    }

    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByName(@PathVariable String name) {
        return studentService.getStudentsByName(name);
    }

    @GetMapping("/dept/{dept}/name/{name}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return studentService.getStudentsByDeptAndName(dept, name);
    }

    @GetMapping("/dept/{dept}/sec/{sec}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByDeptAndSection(@PathVariable String dept, @PathVariable String sec) {
        return studentService.getStudentsByDeptAndSection(dept, sec);
    }

    @GetMapping("/registerNo/{registerNo}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'HEAD')")
    public List<Student> getStudentsByRegisterNo(@PathVariable String registerNo) {
        return studentService.getStudentsByRegisterNo(registerNo);
    }

    @DeleteMapping("/name/{name}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteStudentByName(@PathVariable String name) {
        studentService.deleteStudentByName(name);
    }

    @DeleteMapping("/email/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteStudentByEmail(@PathVariable String email) {
        studentService.deleteStudentByEmail(email);
    }
}
