package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "facilitators")
public class Facilitator extends User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
   

    // Relationships if needed
    @Column(nullable = false)
    private String role = "FACILITATOR"; // Default role
}
