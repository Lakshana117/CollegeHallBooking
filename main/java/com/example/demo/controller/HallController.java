package com.example.demo.controller;

import com.example.demo.model.Hall;
import com.example.demo.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    @Autowired
    private HallService hallService;

    // Get all halls (Admin, Faculty, HOD, and Students can view)
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY', 'FACILITATOR','HEAD', 'STUDENT')")
    public List<Hall> getAllHalls() {
        return hallService.getAllHalls();
    }

    // Get a specific hall by ID (Admin, Faculty, and HOD can view)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACULTY','FACILITATOR', 'HEAD','STUDENT')")
    public Hall getHallById(@PathVariable Long id) {
        return hallService.getHallById(id);
    }

    // Create a new hall (Only Admin can create)
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Hall createHall(@RequestBody Hall hall) {
        return hallService.saveOrUpdateHall(hall);
    }

    // Update an existing hall (Only Admin can update)
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Hall updateHall(@PathVariable Long id, @RequestBody Hall hall) {
        hall.setId(id); // Ensure the ID is set for update
        return hallService.saveOrUpdateHall(hall);
    }

    // Delete a hall by ID (Only Admin can delete)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String deleteHall(@PathVariable Long id) {
        hallService.deleteHall(id);
        return "Hall with id " + id + " has been deleted.";
    }
}
