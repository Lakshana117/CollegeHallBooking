package com.example.demo.repository;

import com.example.demo.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    @Query("SELECT f FROM Faculty f WHERE f.dept = :dept AND f.classBeingMentored = :classBeingMentored")
    List<Faculty> findFacultyByDeptAndClassBeingMentored(@Param("dept") String dept, @Param("classBeingMentored") String classBeingMentored);

    List<Faculty> findByEmail(String email);
    List<Faculty> findByDept(String dept);
    List<Faculty> findByClassBeingMentored(String classBeingMentored);
    List<Faculty> findByName(String name);
    List<Faculty> findByDeptAndClassBeingMentored(String dept, String classBeingMentored);
    void deleteByEmail(String email);
}
