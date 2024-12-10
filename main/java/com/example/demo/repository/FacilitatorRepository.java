package com.example.demo.repository;

import com.example.demo.model.Facilitator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FacilitatorRepository extends JpaRepository<Facilitator, Long> {
    Optional<Facilitator> findByEmail(String email);
}
