package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "clients")
public class Client extends BaseEntity {

    private String fullName;
    private String phone;
    private String email;

    // Ex: "Canada - Etude", "Suisse - Travail"
    private String activeFile;

    // NOUVEAU, EN_COURS, DOSSIER_PRET, CLOTURE, ARCHIVE
    private String status = "NOUVEAU";

    @Column(length = 2000)
    private String notes;
}
