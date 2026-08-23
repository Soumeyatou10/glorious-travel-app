package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "faqs")
public class Faq extends BaseEntity {

    @Column(length = 500)
    private String question;

    @Column(length = 3000)
    private String answer;

    private String category;
    private Integer displayOrder = 0;
    private boolean published = true;
}
