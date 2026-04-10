package com.example.eventservice.service;

import com.example.eventservice.entity.Event;
import com.example.eventservice.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public Event updateEvent(String id, Event eventDetails, String facultyId) throws Exception {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new Exception("Event not found"));
        
        if (!event.getFacultyId().equals(facultyId)) {
            throw new Exception("Unauthorized: You can only update your own events");
        }
        
        event.setStudentName(eventDetails.getStudentName());
        event.setRollNumber(eventDetails.getRollNumber());
        event.setEventName(eventDetails.getEventName());
        event.setLocation(eventDetails.getLocation());
        event.setDate(eventDetails.getDate());
        event.setDescription(eventDetails.getDescription());
        
        return eventRepository.save(event);
    }

    public void deleteEvent(String id, String facultyId) throws Exception {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new Exception("Event not found"));
        
        if (!event.getFacultyId().equals(facultyId)) {
            throw new Exception("Unauthorized: You can only delete your own events");
        }
        
        eventRepository.delete(event);
    }

    public List<Event> getEventsByMonth(int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate start = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();
        return eventRepository.findByDateRange(start, end);
    }

    public List<Event> getEventsByRollNumber(String rollNumber) {
        // Flat map or just return list if repo is fixed
        return eventRepository.findAll().stream()
                .filter(e -> e.getRollNumber().equals(rollNumber))
                .toList();
    }

    public List<Event> getEventsByFacultyId(String facultyId) {
        return eventRepository.findByFacultyId(facultyId);
    }
}
