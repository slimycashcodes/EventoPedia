package com.example.eventservice.controller;

import com.example.eventservice.entity.Event;
import com.example.eventservice.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @RequestBody Event event, @RequestHeader("Faculty-Id") String facultyId) {
        try {
            return ResponseEntity.ok(eventService.updateEvent(id, event, facultyId));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id, @RequestHeader("Faculty-Id") String facultyId) {
        try {
            eventService.deleteEvent(id, facultyId);
            return ResponseEntity.ok("Event deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @GetMapping("/month/{year}/{month}")
    public ResponseEntity<List<Event>> getEventsByMonth(@PathVariable int year, @PathVariable int month) {
        return ResponseEntity.ok(eventService.getEventsByMonth(year, month));
    }

    @GetMapping("/student/{rollNumber}")
    public ResponseEntity<List<Event>> getEventsByRollNumber(@PathVariable String rollNumber) {
        return ResponseEntity.ok(eventService.getEventsByRollNumber(rollNumber));
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<List<Event>> getEventsByFacultyId(@PathVariable String facultyId) {
        return ResponseEntity.ok(eventService.getEventsByFacultyId(facultyId));
    }
}
