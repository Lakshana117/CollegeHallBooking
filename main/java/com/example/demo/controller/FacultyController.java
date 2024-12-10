package com.example.demo.controller;

import com.example.demo.model.Faculty;
import com.example.demo.service.FacultyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD')")
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        List<Faculty> facultyList = facultyService.getAllFaculty();
        return ResponseEntity.ok(facultyList);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Faculty> createFaculty(@RequestBody Faculty faculty) {
        Faculty createdFaculty = facultyService.addFaculty(faculty);
        return ResponseEntity.ok(createdFaculty);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD')")
    public ResponseEntity<List<Faculty>> getFacultyByEmail(@PathVariable String email) {
        List<Faculty> faculty = facultyService.getFacultyByEmail(email);
        return ResponseEntity.ok(faculty);
    }

    @GetMapping("/dept/{dept}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD')")
    public ResponseEntity<List<Faculty>> getFacultyByDept(@PathVariable String dept) {
        List<Faculty> faculty = facultyService.getFacultyByDept(dept);
        return ResponseEntity.ok(faculty);
    }

    @GetMapping("/dept/{dept}/class/{classBeingMentored}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD')")
    public ResponseEntity<List<Faculty>> getFacultyByDeptAndClassBeingMentored(@PathVariable String dept, @PathVariable String classBeingMentored) {
        List<Faculty> faculty = facultyService.getFacultyByDeptAndClassBeingMentored(dept, classBeingMentored);
        return ResponseEntity.ok(faculty);
    }

    @DeleteMapping("/email/{email}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteFacultyByEmail(@PathVariable String email) {
        facultyService.deleteFacultyByEmail(email);
        return ResponseEntity.noContent().build();
    }
}
