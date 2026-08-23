package com.glorioustravel.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "videos")
public class Video extends BaseEntity {

    private String title;
    private String url;               // /uploads/videos/xxx.mp4
    private String thumbnailUrl;
    private String duration;          // "1:42"
    private boolean published = true;
}
