package com.glorioustravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "service_items")
public class ServiceItem extends BaseEntity {

    @NotBlank
    private String title;             // "Vente de billets d'avion"
    private String icon;              // code/emoji utilise sur le site

    @Column(length = 2000)
    private String description;

    private Integer displayOrder = 0;
    private boolean published = true;
}
