package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "testimonials")
public class Testimonial extends BaseEntity {

    private String clientLabel;       // "Client S.M." (nom abrege pour la confidentialite)
    private String destination;
    private Integer rating = 5;       // 1-5
    private String imageUrl;

    @Column(length = 1000)
    private String caption;

    private boolean published = true;
}
