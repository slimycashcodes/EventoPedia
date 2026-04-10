package com.example.eventservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String studentName;
    private String rollNumber;
    private String eventName;
    private String location;
    private LocalDate date;
    private String description;
    private String facultyId;

    public Event() {}

    public Event(String id, String studentName, String rollNumber, String eventName, String location, LocalDate date, String description, String facultyId) {
        this.id = id;
        this.studentName = studentName;
        this.rollNumber = rollNumber;
        this.eventName = eventName;
        this.location = location;
        this.date = date;
        this.description = description;
        this.facultyId = facultyId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFacultyId() { return facultyId; }
    public void setFacultyId(String facultyId) { this.facultyId = facultyId; }
}
