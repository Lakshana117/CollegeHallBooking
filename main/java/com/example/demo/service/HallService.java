package com.example.demo.service;

import com.example.demo.model.Hall;
import com.example.demo.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    // Get all halls
    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    // Get a single hall by ID
    public Hall getHallById(Long id) {
        Optional<Hall> hall = hallRepository.findById(id);
        if (hall.isPresent()) {
            return hall.get();
        } else {
            throw new IllegalArgumentException("Hall not found with id: " + id);
        }
    }

    // Create or update a hall
    public Hall saveOrUpdateHall(Hall hall) {
        return hallRepository.save(hall);
    }

    // Delete a hall by ID
    public void deleteHall(Long id) {
        hallRepository.deleteById(id);
    }
}
