package com.glorioustravel.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "admin_users")
public class AdminUser extends BaseEntity {

    @NotBlank
    private String fullName;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password; // hache (BCrypt) - jamais renvoye au frontend

    // ADMINISTRATEUR_PRINCIPAL, GESTION_DOSSIERS, COMMUNITY_MANAGER...
    private String role;

    private boolean active = true;
}
