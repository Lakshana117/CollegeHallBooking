package com.example.demo.controller;

import com.example.demo.model.HallDetails;
import com.example.demo.service.HallDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hall-details")
public class HallDetailsController {

    @Autowired
    private HallDetailsService hallDetailsService;

    // Get all hall details
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<HallDetails> getAllHallDetails() {
        return hallDetailsService.getAllHallDetails();
    }

    // Get specific hall details by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('FACULTY') or hasAuthority('HEAD') or hasAuthority('FACILITATOR')")
    public HallDetails getHallDetailsById(@PathVariable Long id) {
        return hallDetailsService.getHallDetailsById(id);
    }

    // Get hall details by Hall ID
    @GetMapping("/hall/{hallId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public HallDetails getHallDetailsByHallId(@PathVariable Long hallId) {
        return hallDetailsService.getHallDetailsByHallId(hallId);
    }

    // Add new hall details
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public HallDetails addHallDetails(@RequestBody HallDetails hallDetails) {
        return hallDetailsService.saveHallDetails(hallDetails);
    }

    // Update hall details
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public HallDetails updateHallDetails(@PathVariable Long id, @RequestBody HallDetails updatedDetails) {
        return hallDetailsService.updateHallDetails(id, updatedDetails);
    }

    // Delete hall details
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteHallDetails(@PathVariable Long id) {
        hallDetailsService.deleteHallDetails(id);
    }
}
