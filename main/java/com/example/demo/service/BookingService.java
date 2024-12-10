package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        // Add validation to ensure startTime and endTime are futuristic
        if (booking.getStartTime().isAfter(booking.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByEmail(email);
    }

    public List<Booking> getBookingsByDept(String dept) {
        return bookingRepository.findByDept(dept);
    }

    public List<Booking> getBookingsByDeptAndSec(String dept, String sec) {
        return bookingRepository.findByDeptAndSec(dept, sec);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        Booking existingBooking = getBookingById(id);

        existingBooking.setName(updatedBooking.getName());
        existingBooking.setEventName(updatedBooking.getEventName());
        existingBooking.setEventDetails(updatedBooking.getEventDetails());
        existingBooking.setEventDate(updatedBooking.getEventDate());
        existingBooking.setStartTime(updatedBooking.getStartTime());
        existingBooking.setEndTime(updatedBooking.getEndTime());
        existingBooking.setNumberOfAttendees(updatedBooking.getNumberOfAttendees());
        existingBooking.setAdditionalRequest(updatedBooking.getAdditionalRequest());
        return bookingRepository.save(existingBooking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
