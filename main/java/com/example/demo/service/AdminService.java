package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private HeadRepository headRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
private FacilitatorRepository facilitatorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get all students grouped by department
    public Map<String, List<Student>> getStudentsByDept() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept));
    }

    // Get students by specific department
    public List<Student> getStudentsByDept(String dept) {
        return studentRepository.findByDept(dept);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

   
    // Get all students grouped by department and batch
    public Map<String, Map<String, List<Student>>> getStudentsByDeptAndBatch() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept,
                        Collectors.groupingBy(Student::getBatch)));
    }

    // Get students by department and batch
    public List<Student> getStudentsByDeptAndBatch(String dept, String batch) {
        return studentRepository.findByDeptAndBatch(dept, batch);
    }

    // Get all students grouped by department, batch, and class
    public Map<String, Map<String, Map<String, List<Student>>>> getStudentsByDeptBatchAndClass() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .collect(Collectors.groupingBy(Student::getDept,
                        Collectors.groupingBy(Student::getBatch,
                                Collectors.groupingBy(Student::getSection))));
    }

    // Get students by department, batch, and section
    public List<Student> getStudentsByDeptBatchAndSection(String dept, String batch, String section) {
        return studentRepository.findByDeptAndBatchAndSection(dept, batch, section);
    }

    // Get all faculties
    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    // Get faculty by email
    public Faculty getFacultyByEmail(String email) {
        List<Faculty> faculties = facultyRepository.findByEmail(email);
        return faculties.isEmpty() ? null : faculties.get(0);
    }

    // Get faculties by department
    public List<Faculty> getFacultiesByDept(String dept) {
        return facultyRepository.findByDept(dept);
    }

    // Get faculties by class being mentored
    public List<Faculty> getFacultiesByClass(String classBeingMentored) {
        return facultyRepository.findByClassBeingMentored(classBeingMentored);
    }

    // Get all heads
    public List<Head> getAllHeads() {
        return headRepository.findAll();
    }

    // Get heads by department
    public List<Head> getHeadsByDept(String dept) {
        return headRepository.findByDept(dept);
    }

    // CRUD operations for Admin
    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public Admin updateAdmin(Long id, Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setId(id);
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    // CRUD operations for Student
    public Student saveStudent(Student student) {
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setRoles("STUDENT");
        userRepository.save(student);
        return studentRepository.save(student);
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student updateStudent(Long id, Student student) {
        student.setId(id);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    public void deleteStudentById(Long id) {
        studentRepository.deleteById(id);
    }

    

    // CRUD operations for Faculty
    public Faculty saveFaculty(Faculty faculty) {
        faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
        faculty.setRoles("FACULTY");
        userRepository.save(faculty);
        return facultyRepository.save(faculty);
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id).orElse(null);
    }

    public Faculty updateFaculty(Long id, Faculty faculty) {
        faculty.setId(id);
        faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
        return facultyRepository.save(faculty);
    }

    public void deleteFacultyById(Long id) {
        facultyRepository.deleteById(id);
    }

    // CRUD operations for Head
    public Head saveHead(Head head) {
        head.setPassword(passwordEncoder.encode(head.getPassword()));
        head.setRoles("HEAD");
        userRepository.save(head);
        return headRepository.save(head);
    }

    public Head getHeadById(Long id) {
        return headRepository.findById(id).orElse(null);
    }

    public Head updateHead(Long id, Head head) {
        head.setId(id);
        head.setPassword(passwordEncoder.encode(head.getPassword()));
        return headRepository.save(head);
    }

    public void deleteHeadById(Long id) {
        headRepository.deleteById(id);
    }

    public void deleteStudentByDeptAndEmail(String dept, String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteStudentByDeptAndEmail'");
    }

    public List<Student> getStudentsByDeptAndEmail(String dept, String name) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStudentsByDeptAndEmail'");
    }
    // Inside AdminService



// CRUD operations for Facilitator
public Facilitator saveFacilitator(Facilitator facilitator) {
    facilitator.setPassword(passwordEncoder.encode(facilitator.getPassword()));
    facilitator.setRole("FACILITATOR");
    userRepository.save(facilitator);
    return facilitatorRepository.save(facilitator);
}

public Facilitator getFacilitatorById(Long id) {
    return facilitatorRepository.findById(id).orElse(null);
}

public List<Facilitator> getAllFacilitators() {
    return facilitatorRepository.findAll();
}

public Facilitator updateFacilitator(Long id, Facilitator facilitator) {
    facilitator.setId(id);
    facilitator.setPassword(passwordEncoder.encode(facilitator.getPassword()));
    return facilitatorRepository.save(facilitator);
}

public void deleteFacilitatorById(Long id) {
    facilitatorRepository.deleteById(id);
}


}

