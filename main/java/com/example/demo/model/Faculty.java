package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Faculty extends User {
    private String contact;
    private String dept;
    private String classBeingMentored;
    private String photo;
    
    @ManyToOne
    @JoinColumn(name = "head_id")
    private Head head;

    @JsonIgnore
    @OneToMany(mappedBy = "faculty")
    private List<Student> students;
}
