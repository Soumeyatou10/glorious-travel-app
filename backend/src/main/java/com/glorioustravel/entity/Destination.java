package com.glorioustravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "destinations")
public class Destination extends BaseEntity {

    @NotBlank
    private String name;              // "Canada"
    private String region;            // "Amerique du Nord"
    private String flightCode;        // "DLA -> YUL"

    @Column(length = 1000)
    private String shortDescription;

    @Column(length = 4000)
    private String fullDescription;

    private String imageUrl;
    private Integer displayOrder = 0;
    private boolean published = true;
}
