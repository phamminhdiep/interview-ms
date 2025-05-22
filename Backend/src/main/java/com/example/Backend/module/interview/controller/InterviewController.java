package com.example.Backend.module.interview.controller;

import com.example.Backend.module.interview.dto.InterviewDto;
import com.example.Backend.module.interview.service.InterviewService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/interview")
@Data
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class InterviewController {
    private final InterviewService interviewService;

    @GetMapping("/get-all")
    public ResponseEntity<Page<InterviewDto>> getAllInterviews(@RequestParam int pageNumber, @RequestParam int pageSize) {
        return ResponseEntity.ok().body(interviewService.findAll(pageNumber, pageSize));
    }

    @PostMapping("/create")
    public ResponseEntity<InterviewDto> createInterview(@RequestBody InterviewDto interviewDto) {
        return ResponseEntity.ok().body(interviewService.save(interviewDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<InterviewDto> updateInterview(@PathVariable UUID id, @RequestBody InterviewDto interviewDto) {
        return ResponseEntity.ok().body(interviewService.save(interviewDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable UUID id) {
        interviewService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<InterviewDto> getInterviewById(@PathVariable UUID id) {
        return ResponseEntity.ok().body(interviewService.findById(id));
    }

}
