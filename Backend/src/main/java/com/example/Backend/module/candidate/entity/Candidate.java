package com.example.Backend.module.candidate.entity;

import com.example.Backend.common.base.Auditable;
import com.example.Backend.module.auth.entity.User;
import com.example.Backend.common.enums.Position;
import com.example.Backend.common.enums.Status;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Entity
@Data
@RequiredArgsConstructor
public class Candidate extends Auditable<User> {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String email;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private Position currentPosition;
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(cascade = CascadeType.ALL)
    private User ownerHr;

}
