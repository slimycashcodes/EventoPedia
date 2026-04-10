package com.example.facultyservice.service;

import com.example.facultyservice.entity.Faculty;
import com.example.facultyservice.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;

    public Faculty register(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public Optional<Faculty> login(String email, String password) {
        Optional<Faculty> faculty = facultyRepository.findByEmail(email);
        if (faculty.isPresent() && faculty.get().getPassword().equals(password)) {
            return faculty;
        }
        return Optional.empty();
    }
}
