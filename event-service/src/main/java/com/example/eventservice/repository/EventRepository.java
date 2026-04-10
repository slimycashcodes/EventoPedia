package com.example.eventservice.repository;

import com.example.eventservice.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<List<Event>> findByRollNumber(String rollNumber);
    
    @Query("{ 'date': { $gte: ?0, $lte: ?1 } }")
    List<Event> findByDateRange(java.time.LocalDate start, java.time.LocalDate end);
    
    List<Event> findByFacultyId(String facultyId);

    // Alternative for month filtering if we want to be simpler in the repository
    // We can filter in the service layer or use a custom query.
}
