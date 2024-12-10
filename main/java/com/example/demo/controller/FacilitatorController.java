package com.example.demo.controller;

import com.example.demo.model.Facilitator;
import com.example.demo.service.FacilitatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/facilitators")
public class FacilitatorController {

    @Autowired
    private FacilitatorService facilitatorService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Facilitator createFacilitator(@RequestBody Facilitator facilitator) {
        return facilitatorService.createFacilitator(facilitator);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Facilitator> getAllFacilitators() {
        return facilitatorService.getAllFacilitators();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'FACILITATOR')")
    public Facilitator getFacilitatorById(@PathVariable Long id) {
        return facilitatorService.getFacilitatorById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN','FACILITATOR')")
    public Facilitator updateFacilitator(@PathVariable Long id, @RequestBody Facilitator facilitator) {
        return facilitatorService.updateFacilitator(id, facilitator);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteFacilitator(@PathVariable Long id) {
        facilitatorService.deleteFacilitator(id);
    }

    @GetMapping("/{id}/bookings")
    @PreAuthorize("hasAuthority('FACILITATOR')")
    public String getFacilitatorBookings(@PathVariable Long id) {
        // Replace with actual logic to fetch bookings
        return "Bookings for Facilitator ID: " + id;
    }
}
