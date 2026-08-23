package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "articles")
public class Article extends BaseEntity {

    private String title;
    private String category;
    private String author;

    @Column(length = 8000)
    private String content;

    private String coverImageUrl;
    private boolean published = false;
}
