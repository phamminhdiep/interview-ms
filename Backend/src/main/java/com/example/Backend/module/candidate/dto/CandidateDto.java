package com.example.Backend.module.candidate.dto;

import com.example.Backend.common.enums.Position;
import com.example.Backend.common.enums.Status;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@RequiredArgsConstructor
public class CandidateDto {
    private UUID id;
    private String name;
    private String email;
    private String phoneNumber;
    private Position currentPosition;
    private Status status;
    private String ownerHrEmail;

}
