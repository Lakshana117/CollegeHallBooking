package com.example.demo.repository;

import com.example.demo.model.HallDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HallDetailsRepository extends JpaRepository<HallDetails, Long> {
    HallDetails findByHallId(Long hallId);
}
