package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "photos")
public class Photo extends BaseEntity {

    private String title;
    private String url;               // /uploads/photos/xxx.jpg
    private String category;          // "Galerie", "Destination", ...
    private boolean published = true;
}
