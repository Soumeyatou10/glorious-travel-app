package com.glorioustravel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * Demande envoyee via le formulaire du site public (section "Parler a un conseiller").
 */
@Getter
@Setter
@Entity
@Table(name = "client_requests")
public class ClientRequest extends BaseEntity {

    @NotBlank
    private String fullName;
    private String phone;
    private String destination;
    private String projectType;       // Etudes, Travail, Visite, Immigration

    @Column(length = 2000)
    private String message;

    // NOUVELLE, EN_COURS, DOSSIER_PRET, CLOTUREE
    private String status = "NOUVELLE";
}
