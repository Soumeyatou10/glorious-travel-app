package com.glorioustravel.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * Gere l'enregistrement des fichiers (photos/videos) sur le disque local du
 * serveur, dans app.upload.dir/{photos|videos}. Retourne une URL relative
 * (/uploads/photos/xxx.jpg) servie par WebConfig.
 */
@Service
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    public String store(MultipartFile file, String subFolder) {
        try {
            String extension = "";
            String original = file.getOriginalFilename();
            if (original != null && original.contains(".")) {
                extension = original.substring(original.lastIndexOf('.'));
            }
            String fileName = UUID.randomUUID() + extension;

            Path targetDir = Paths.get(uploadDir, subFolder);
            Files.createDirectories(targetDir);

            Path targetPath = targetDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + subFolder + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Impossible d'enregistrer le fichier : " + e.getMessage(), e);
        }
    }
}
