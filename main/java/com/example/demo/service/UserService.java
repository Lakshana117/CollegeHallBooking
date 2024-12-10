package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.*;
import com.example.demo.repository.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private HeadRepository headRepository;

    @Autowired
    private FacilitatorRepository facilitatorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        // Save user based on role
        if (user.getRoles().contains("STUDENT")) {
            Student student = new Student();
            // Copy common attributes
            student.setName(user.getName());
            student.setEmail(user.getEmail());
            student.setPassword(passwordEncoder.encode(user.getPassword()));
            student.setRoles(user.getRoles());
            student.setDept(user instanceof Student ? ((Student) user).getDept() : null);
            return studentRepository.save(student);

        } else if (user.getRoles().contains("FACULTY")) {
            Faculty faculty = new Faculty();
            faculty.setName(user.getName());
            faculty.setEmail(user.getEmail());
            faculty.setPassword(passwordEncoder.encode(user.getPassword()));
            faculty.setRoles(user.getRoles());
            faculty.setDept(user instanceof Faculty ? ((Faculty) user).getDept() : null);
            return facultyRepository.save(faculty);

        } else if (user.getRoles().contains("HEAD")) {
            Head head = new Head();
            head.setName(user.getName());
            head.setEmail(user.getEmail());
            head.setPassword(passwordEncoder.encode(user.getPassword()));
            head.setRoles(user.getRoles());
            head.setDept(user instanceof Head ? ((Head) user).getDept() : null);
            return headRepository.save(head);

        } else if (user.getRoles().contains("FACILITATOR")) {
            Facilitator facilitator = new Facilitator();
            facilitator.setName(user.getName());
            facilitator.setEmail(user.getEmail());
            facilitator.setPassword(passwordEncoder.encode(user.getPassword()));
            facilitator.setRole(user.getRoles());
            return facilitatorRepository.save(facilitator);

        } else {
            // Default to saving as a generic user
            return userRepository.save(user);
        }
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            // Update common attributes
            existingUser.setName(userDetails.getName());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            existingUser.setRoles(userDetails.getRoles());

            // Handle specific roles if needed
            if (userDetails.getRoles().contains("STUDENT") && existingUser instanceof Student) {
                ((Student) existingUser).setDept(userDetails instanceof Student ? ((Student) userDetails).getDept() : null);
                return studentRepository.save((Student) existingUser);

            } else if (userDetails.getRoles().contains("FACULTY") && existingUser instanceof Faculty) {
                ((Faculty) existingUser).setDept(userDetails instanceof Faculty ? ((Faculty) userDetails).getDept() : null);
                return facultyRepository.save((Faculty) existingUser);

            } else if (userDetails.getRoles().contains("HEAD") && existingUser instanceof Head) {
                ((Head) existingUser).setDept(userDetails instanceof Head ? ((Head) userDetails).getDept() : null);
                return headRepository.save((Head) existingUser);

            } else if (userDetails.getRoles().contains("FACILITATOR") && existingUser instanceof Facilitator) {
                
                return facilitatorRepository.save((Facilitator) existingUser);

            } else {
                return userRepository.save(existingUser);
            }
        } else {
            return null; // User not found
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}


