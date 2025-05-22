package com.example.Backend.module.candidate.controller;

import com.example.Backend.common.enums.Status;
import com.example.Backend.module.candidate.dto.CandidateDto;
import com.example.Backend.module.candidate.dto.CandidateSearchRequest;
import com.example.Backend.module.candidate.repository.CandidateRepository;
import com.example.Backend.module.candidate.service.CandidateService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/candidate")
@Data
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CandidateController {
    private final CandidateService candidateService;

    @GetMapping("/get-all")
    public ResponseEntity<Page<CandidateDto>> getAllCandidates(@RequestParam int pageNumber, @RequestParam int pageSize) {
        return ResponseEntity.ok().body(candidateService.findAll(pageNumber, pageSize));
    }

    @PostMapping("/get-by-name-and-status")
    public ResponseEntity<Page<CandidateDto>> getCandidatesByNameAndStatus(
            @RequestBody CandidateSearchRequest candidateSearchRequest) {
        return ResponseEntity.ok().body(candidateService.findByNameAndStatus(candidateSearchRequest));
    }

    @PostMapping("/create")
    public ResponseEntity<CandidateDto> createCandidate(@RequestBody CandidateDto candidateDto) {
        return ResponseEntity.ok().body(candidateService.save(candidateDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CandidateDto> updateCandidate(@PathVariable UUID id, @RequestBody CandidateDto candidateDto) {
        return ResponseEntity.ok().body(candidateService.save(candidateDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable UUID id) {
        candidateService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<CandidateDto> getCandidateById(@PathVariable UUID id) {
        return ResponseEntity.ok().body(candidateService.findById(id));
    }

}
