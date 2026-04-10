package com.example.studentservice.controller;

import com.example.studentservice.entity.Student;
import com.example.studentservice.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.register(student));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student loginRequest) {
        Optional<Student> student = studentService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
