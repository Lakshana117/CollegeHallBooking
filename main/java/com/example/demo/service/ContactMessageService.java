package com.example.demo.service;

import com.example.demo.model.ContactMessage;
import com.example.demo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // Save a new contact message
    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        return contactMessageRepository.save(contactMessage);
    }

    // Get all contact messages
    public List<ContactMessage> getAllContactMessages() {
        return contactMessageRepository.findAll();
    }

    // Get a contact message by ID
    public ContactMessage getContactMessageById(Long id) {
        return contactMessageRepository.findById(id).orElse(null);
    }

    // Delete a contact message by ID
    public void deleteContactMessageById(Long id) {
        contactMessageRepository.deleteById(id);
    }
}
