package com.example.Backend.common.base;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime; // Or java.time.Instant or java.util.Date

@Getter
@Setter
@MappedSuperclass // Quan trọng: Để các trường được ánh xạ vào bảng của lớp con
@EntityListeners(AuditingEntityListener.class) // Quan trọng: Kích hoạt listener của Spring Data JPA
public abstract class Auditable<U> { // U là kiểu dữ liệu của người dùng (String trong trường hợp của bạn)

    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false) // Không cho phép null, không cho cập nhật sau khi tạo
    private U createdBy;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false) // Không cho phép null, không cho cập nhật sau khi tạo
    private LocalDateTime createdDate; // Dùng LocalDateTime hoặc Instant

    @LastModifiedBy
    @Column(name = "last_modified_by", nullable = false) // Không cho phép null
    private U lastModifiedBy;

    @LastModifiedDate
    @Column(name = "last_modified_date", nullable = false)
    private LocalDateTime lastModifiedDate;
}