package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student extends User {
    private String contact;
    private String dept;
    private String batch;
    private String section ;
    private String registerNo;

    @ManyToOne
    @JoinColumn(name = "facultyId")
    private Faculty faculty;
}
