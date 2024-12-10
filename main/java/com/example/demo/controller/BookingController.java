package com.example.demo.controller;

import com.example.demo.model.Booking;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('STUDENT', 'FACULTY', 'HEAD', 'ADMIN', 'FACILITATOR')")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD', 'FACULTY', 'STUDENT', 'FACILITATOR')")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{email}")
    @PreAuthorize("hasAnyAuthority('STUDENT', 'FACULTY', 'HEAD', 'ADMIN', 'FACILITATOR')")
    public List<Booking> getBookingsByEmail(@PathVariable String email) {
        return bookingService.getBookingsByEmail(email);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'HEAD', 'FACULTY', 'FACILITATOR', 'STUDENT')")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingService.updateBooking(id, updatedBooking);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}
