package com.example.demo.service;

import com.example.demo.model.Facilitator;
import com.example.demo.repository.FacilitatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilitatorService {
    
        @Autowired
        private FacilitatorRepository facilitatorRepository;
    
        @Autowired
        private PasswordEncoder passwordEncoder;
    
        public Facilitator createFacilitator(Facilitator facilitator) {
            facilitator.setPassword(passwordEncoder.encode(facilitator.getPassword()));
            return facilitatorRepository.save(facilitator);
        }
    
        public List<Facilitator> getAllFacilitators() {
            return facilitatorRepository.findAll();
        }
    
        public Facilitator getFacilitatorById(Long id) {
            return facilitatorRepository.findById(id)
                    .orElseThrow();
        }
    
        public Facilitator updateFacilitator(Long id, Facilitator updatedFacilitator) {
            Facilitator existingFacilitator = getFacilitatorById(id);
            existingFacilitator.setName(updatedFacilitator.getName());
            existingFacilitator.setEmail(updatedFacilitator.getEmail());
            existingFacilitator.setPassword(passwordEncoder.encode(updatedFacilitator.getPassword()));
            return facilitatorRepository.save(existingFacilitator);
        }
    
        public void deleteFacilitator(Long id) {
            facilitatorRepository.deleteById(id);
        }
    
}
