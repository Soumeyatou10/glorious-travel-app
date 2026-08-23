package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * Parametres globaux du site (une seule ligne en base).
 */
@Getter
@Setter
@Entity
@Table(name = "site_settings")
public class SiteSettings extends BaseEntity {

    private String agencyName;
    private String slogan;
    private String logoUrl;
    private String whatsappNumber;
    private String address;
    private String email;
    private String hoursWeekdays;
    private String hoursSaturday;
    private String facebookUrl;
    private String tiktokUrl;
    private String primaryColor = "#0A4DA0";
    private String secondaryColor = "#D62828";
}
