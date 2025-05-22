package com.example.Backend.module.candidate.service;

import com.example.Backend.common.enums.Status;
import com.example.Backend.module.candidate.dto.CandidateDto;
import com.example.Backend.module.candidate.dto.CandidateSearchRequest;
import com.example.Backend.module.candidate.entity.Candidate;
import com.example.Backend.module.candidate.repository.CandidateRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Data
@RequiredArgsConstructor
public class CandidateService {
    private final CandidateRepository candidateRepository;
    private final ModelMapper modelMapper;

    public Page<CandidateDto> findAll(int pageNumber, int pageSize) {
        Sort sort = Sort.by(
                Sort.Order.asc("status"),
                Sort.Order.desc("createdDate")
        );
        Pageable sortedPageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Candidate> candidatePage = candidateRepository.findAll(sortedPageable);
        return candidatePage.map(this::convertToDto);

    }

    public Page<CandidateDto> findByNameAndStatus(CandidateSearchRequest candidateSearchRequest) {
        Sort sort = Sort.by(
                Sort.Order.asc("status"),
                Sort.Order.desc("createdDate")
        );
        Pageable sortedPageable = PageRequest.of(candidateSearchRequest.getPageNumber(),
                candidateSearchRequest.getPageSize(), sort);
        Page<Candidate> candidatePage = candidateRepository.findByNameContainingIgnoreCaseAndStatus(
                candidateSearchRequest.getName(), candidateSearchRequest.getStatus(), sortedPageable);
        return candidatePage.map(this::convertToDto);
    }

    public CandidateDto save(CandidateDto candidateDto) {
        Candidate candidate = convertToEntity(candidateDto);
        Candidate savedCandidate = candidateRepository.save(candidate);
        return convertToDto(savedCandidate);
    }

    public CandidateDto update(UUID id, CandidateDto candidateDto) {
        Candidate candidate = convertToEntity(candidateDto);
        candidate.setId(id);
        Candidate updatedCandidate = candidateRepository.save(candidate);
        return convertToDto(updatedCandidate);
    }

    public void delete(UUID id) {
        candidateRepository.deleteById(id);
    }

    public CandidateDto findById(UUID id) {
        Candidate candidate = candidateRepository.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
        return convertToDto(candidate);
    }

    public CandidateDto convertToDto(Candidate staff) {
        return modelMapper.map(staff, CandidateDto.class);
    }

    public Candidate convertToEntity(CandidateDto staffDto) {
        return modelMapper.map(staffDto, Candidate.class);
    }
}
