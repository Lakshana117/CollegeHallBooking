package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String eventName;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String eventDetails;

    @NotNull
    @Future(message = "Event date must be in the future")
    private LocalDate eventDate;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

    @NotBlank
    private String numberOfAttendees;

    @Column(columnDefinition = "TEXT")
    private String additionalRequest;

    // Nullable fields for different user roles
    private String dept; // For faculty and HOD
    private String sec; // For students

    // Relationships
    @ManyToOne
    @JoinColumn(name = "hall_id")
    private Hall hall;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Add any other required relationships or fields here
}
