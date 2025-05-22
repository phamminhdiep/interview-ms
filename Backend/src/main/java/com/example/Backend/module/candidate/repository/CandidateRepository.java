package com.example.Backend.module.candidate.repository;

import com.example.Backend.common.enums.Status;
import com.example.Backend.module.candidate.entity.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, UUID> {
    Page<Candidate> findByNameContainingIgnoreCaseAndStatus(
            String name,
            Status status,
            Pageable pageable
    );
}
