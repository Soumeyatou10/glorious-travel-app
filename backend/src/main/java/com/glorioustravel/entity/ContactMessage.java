package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "contact_messages")
public class ContactMessage extends BaseEntity {

    private String senderName;
    private String subject;

    @Column(length = 3000)
    private String content;

    @Column(name = "is_read")
    private boolean read = false;
}
