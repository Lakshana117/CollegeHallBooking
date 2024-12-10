package com.example.demo.service;

import com.example.demo.model.HallDetails;
import com.example.demo.repository.HallDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HallDetailsService {
    @Autowired
    private HallDetailsRepository hallDetailsRepository;

    public List<HallDetails> getAllHallDetails() {
        return hallDetailsRepository.findAll();
    }

    public HallDetails getHallDetailsById(Long id) {
        return hallDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("HallDetails not found for id: " + id));
    }

    public HallDetails getHallDetailsByHallId(Long hallId) {
        return hallDetailsRepository.findByHallId(hallId);
    }

    public HallDetails saveHallDetails(HallDetails hallDetails) {
        return hallDetailsRepository.save(hallDetails);
    }

    public HallDetails updateHallDetails(Long id, HallDetails updatedDetails) {
        Optional<HallDetails> existingDetailsOptional = hallDetailsRepository.findById(id);

        if (existingDetailsOptional.isPresent()) {
            HallDetails existingDetails = existingDetailsOptional.get();
            existingDetails.setName(updatedDetails.getName());
            existingDetails.setDescription(updatedDetails.getDescription());
            existingDetails.setCapacity(updatedDetails.getCapacity());
            existingDetails.setLocation(updatedDetails.getLocation());
            existingDetails.setImageUrl(updatedDetails.getImageUrl());
            return hallDetailsRepository.save(existingDetails);
        } else {
            throw new RuntimeException("HallDetails not found for id: " + id);
        }
    }

    public void deleteHallDetails(Long id) {
        hallDetailsRepository.deleteById(id);
    }
}
