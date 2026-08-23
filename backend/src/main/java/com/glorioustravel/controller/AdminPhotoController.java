package com.glorioustravel.controller;

import com.glorioustravel.entity.Photo;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.PhotoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "photos".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/photos")
@RequiredArgsConstructor
public class AdminPhotoController {

    private final PhotoRepository repository;

    @GetMapping
    public List<Photo> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Photo getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Photo introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Photo> create(@Valid @RequestBody Photo photo) {
        Photo saved = repository.save(photo);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Photo update(@PathVariable Long id, @Valid @RequestBody Photo payload) {
        Photo existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Photo introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Photo introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
