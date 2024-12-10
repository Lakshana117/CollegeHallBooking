package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "hall_details")
public class HallDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int capacity;

    private String location;

    private String imageUrl;

    @OneToOne
    @JoinColumn(name = "hall_id", referencedColumnName = "id")
    private Hall hall;
}
