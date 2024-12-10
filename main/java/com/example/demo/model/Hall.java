package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "halls")
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private int capacity;

    @NotBlank
    private String location;

    private String imageUrl;
    
    @OneToOne(mappedBy = "hall", cascade = CascadeType.ALL)
    private HallDetails hallDetails;

    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings; // Reference to the Booking entity

    // Getters and Setters if needed
}
