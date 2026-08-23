package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "offers")
public class Offer extends BaseEntity {

    private String title;             // "Pack Etudiant Canada"
    private String destination;
    private String priceLabel;        // "A partir de 350 000 FCFA"

    @Column(length = 2000)
    private String description;

    private boolean published = true;
}
