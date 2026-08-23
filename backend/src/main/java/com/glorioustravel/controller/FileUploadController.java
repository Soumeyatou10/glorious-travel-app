package com.glorioustravel.controller;

import com.glorioustravel.dto.FileUploadResponse;
import com.glorioustravel.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Upload de photos/videos depuis l'espace admin. Le fichier est enregistre sur
 * le disque local (voir app.upload.dir) et l'URL renvoyee est a stocker sur
 * l'entite correspondante (Photo.url ou Video.url) via son propre endpoint CRUD.
 */
@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping("/photo")
    public ResponseEntity<FileUploadResponse> uploadPhoto(@RequestParam("file") MultipartFile file) {
        String url = fileStorageService.store(file, "photos");
        return ResponseEntity.ok(new FileUploadResponse(url, file.getOriginalFilename()));
    }

    @PostMapping("/video")
    public ResponseEntity<FileUploadResponse> uploadVideo(@RequestParam("file") MultipartFile file) {
        String url = fileStorageService.store(file, "videos");
        return ResponseEntity.ok(new FileUploadResponse(url, file.getOriginalFilename()));
    }
}
