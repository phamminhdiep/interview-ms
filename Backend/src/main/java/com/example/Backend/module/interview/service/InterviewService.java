package com.example.Backend.module.interview.service;

import com.example.Backend.module.interview.dto.InterviewDto;
import com.example.Backend.module.interview.entity.Interview;
import com.example.Backend.module.interview.repository.InterviewRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Data
@RequiredArgsConstructor
public class InterviewService {
    private final InterviewRepository interviewRepository;
    private final ModelMapper modelMapper;

    public Page<InterviewDto> findAll(int pageNumber, int pageSize) {
        Pageable sortedPageable = PageRequest.of(pageNumber, pageSize);
        Page<Interview> interviewPage = interviewRepository.findAll(sortedPageable);
        return interviewPage.map(this::convertToDto);

    }

    public InterviewDto save(InterviewDto interviewDto) {
        Interview interview = convertToEntity(interviewDto);
        Interview savedInterview = interviewRepository.save(interview);
        return convertToDto(savedInterview);
    }

    public InterviewDto update(UUID id, InterviewDto interviewDto) {
        Interview interview = convertToEntity(interviewDto);
        interview.setId(id);
        Interview updatedInterview = interviewRepository.save(interview);
        return convertToDto(updatedInterview);
    }

    public void delete(UUID id) {
        interviewRepository.deleteById(id);
    }

    public InterviewDto findById(UUID id) {
        Interview interview = interviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Interview not found"));
        return convertToDto(interview);
    }

    public InterviewDto convertToDto(Interview interview) {
        return modelMapper.map(interview, InterviewDto.class);
    }

    public Interview convertToEntity(InterviewDto interviewDto) {
        return modelMapper.map(interviewDto, Interview.class);
    }
}
