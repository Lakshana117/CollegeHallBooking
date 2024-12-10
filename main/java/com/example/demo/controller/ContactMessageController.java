package com.example.demo.controller;

import com.example.demo.model.ContactMessage;
import com.example.demo.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

    @Autowired
    private ContactMessageService contactMessageService;

    // Endpoint to save a new contact message - accessible to all authenticated users
    @PreAuthorize("hasAnyAuthority('STUDENT', 'FACULTY','FACILITATOR', 'HEAD')")
    @PostMapping
    public ResponseEntity<ContactMessage> createContactMessage(@RequestBody ContactMessage contactMessage) {
        ContactMessage savedMessage = contactMessageService.saveContactMessage(contactMessage);
        return ResponseEntity.ok(savedMessage);
    }

    // Endpoint to get all contact messages - restricted to ADMIN and HOD roles
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllContactMessages() {
        List<ContactMessage> messages = contactMessageService.getAllContactMessages();
        return ResponseEntity.ok(messages);
    }

    // Endpoint to get a contact message by ID - restricted to ADMIN and HOD roles
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getContactMessageById(@PathVariable Long id) {
        ContactMessage message = contactMessageService.getContactMessageById(id);
        if (message != null) {
            return ResponseEntity.ok(message);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a contact message by ID - restricted to ADMIN role
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContactMessageById(@PathVariable Long id) {
        contactMessageService.deleteContactMessageById(id);
        return ResponseEntity.noContent().build();
    }
}
