package com.example.Backend.module.candidate.dto;

import com.example.Backend.common.enums.Status;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CandidateSearchRequest {
    private String name;
    private Status status;
    private int pageNumber = 0;
    private int pageSize = 10;

}
