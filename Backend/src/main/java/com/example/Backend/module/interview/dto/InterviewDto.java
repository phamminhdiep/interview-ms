package com.example.Backend.module.interview.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@RequiredArgsConstructor
public class InterviewDto {
    private UUID id;
    private String title;
    private String candidate;
    private String interviewer;
    private String schedule;
    private String result;
    private String status;
    private String job;
}
