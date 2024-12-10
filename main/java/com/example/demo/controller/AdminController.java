package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.model.Facilitator;
import com.example.demo.model.Head;
import com.example.demo.model.Faculty;
import com.example.demo.model.Student;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // CRUD operations for Admin
    @PostMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.saveAdmin(admin));
    }
    

    // CRUD operations for Student
    @PostMapping("/students")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(adminService.saveStudent(student));
    }

    @PutMapping("/students/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(adminService.updateStudent(id, student));
    }

    @DeleteMapping("/students/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteStudentById(@PathVariable Long id) {
        adminService.deleteStudentById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/students")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('FACULTY') or hasAuthority('HEAD')")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = adminService.getAllStudents();
        return ResponseEntity.ok(students);
    }



    @GetMapping("/students/{dept}/name/{name}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('HEAD')")
    public List<Student> getStudentsByDeptAndName(@PathVariable String dept, @PathVariable String name) {
        return adminService.getStudentsByDeptAndEmail(dept, name);
    }

    @GetMapping("/students/{dept}/email/{email}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('HEAD')")
    public List<Student> getStudentsByDeptAndEmail(@PathVariable String dept, @PathVariable String email) {
        return adminService.getStudentsByDeptAndEmail(dept, email);
    }

    @DeleteMapping("/students/{dept}/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteStudentByDeptAndEmail(@PathVariable String dept, @PathVariable String email) {
        adminService.deleteStudentByDeptAndEmail(dept, email);
        return ResponseEntity.noContent().build();
    }

    // CRUD operations for Faculty
    @PostMapping("/faculties")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Faculty> createFaculty(@RequestBody Faculty faculty) {
        return ResponseEntity.ok(adminService.saveFaculty(faculty));
    }

    @GetMapping("/faculties")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('HEAD')")
    public ResponseEntity<List<Faculty>> getAllFaculties() {
        List<Faculty> faculties = adminService.getAllFaculties();
        return ResponseEntity.ok(faculties);
    }

    @DeleteMapping("/faculties/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteFacultyById(@PathVariable Long id) {
        adminService.deleteFacultyById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/faculties/email/{email}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('HEAD')")
    public ResponseEntity<Faculty> getFacultyByEmail(@PathVariable String email) {
        Faculty faculty = adminService.getFacultyByEmail(email);
        return faculty != null ? ResponseEntity.ok(faculty) : ResponseEntity.notFound().build();
    }

    @PutMapping("/faculties/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable Long id, @RequestBody Faculty faculty) {
        return ResponseEntity.ok(adminService.updateFaculty(id, faculty));
    }

    // CRUD operations for Head
    @PostMapping("/heads")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Head> createHead(@RequestBody Head head) {
        return ResponseEntity.ok(adminService.saveHead(head));
    }

    @GetMapping("/heads")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Head>> getAllHeads() {
        List<Head> heads = adminService.getAllHeads();
        return ResponseEntity.ok(heads);
    }

    @DeleteMapping("/heads/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteHeadById(@PathVariable Long id) {
        adminService.deleteHeadById(id);
        return ResponseEntity.noContent().build();
    }

    // Inside AdminController

// CRUD operations for Facilitator
@PostMapping("/facilitators")
@PreAuthorize("hasAuthority('ADMIN')")
public ResponseEntity<Facilitator> createFacilitator(@RequestBody Facilitator facilitator) {
    return ResponseEntity.ok(adminService.saveFacilitator(facilitator));
}

@GetMapping("/facilitators")
@PreAuthorize("hasAuthority('ADMIN') or hasAuthority('HEAD')")
public ResponseEntity<List<Facilitator>> getAllFacilitators() {
    List<Facilitator> facilitators = adminService.getAllFacilitators();
    return ResponseEntity.ok(facilitators);
}

@GetMapping("/facilitators/{id}")
@PreAuthorize("hasAuthority('ADMIN')")
public ResponseEntity<Facilitator> getFacilitatorById(@PathVariable Long id) {
    Facilitator facilitator = adminService.getFacilitatorById(id);
    return facilitator != null ? ResponseEntity.ok(facilitator) : ResponseEntity.notFound().build();
}

@PutMapping("/facilitators/{id}")
@PreAuthorize("hasAuthority('ADMIN')")
public ResponseEntity<Facilitator> updateFacilitator(@PathVariable Long id, @RequestBody Facilitator facilitator) {
    return ResponseEntity.ok(adminService.updateFacilitator(id, facilitator));
}

@DeleteMapping("/facilitators/{id}")
@PreAuthorize("hasAuthority('ADMIN')")
public ResponseEntity<Void> deleteFacilitatorById(@PathVariable Long id) {
    adminService.deleteFacilitatorById(id);
    return ResponseEntity.noContent().build();
}

}
