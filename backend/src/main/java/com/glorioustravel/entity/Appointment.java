package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "appointments")
public class Appointment extends BaseEntity {

    private String clientName;
    private String clientPhone;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String type;              // "Premier entretien", "Suivi de dossier"...

    // CONFIRME, A_CONFIRMER, ANNULE, TERMINE
    private String status = "A_CONFIRMER";
}
