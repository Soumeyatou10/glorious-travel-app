package com.glorioustravel.controller;

import com.glorioustravel.entity.Video;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.VideoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "videos".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/videos")
@RequiredArgsConstructor
public class AdminVideoController {

    private final VideoRepository repository;

    @GetMapping
    public List<Video> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Video getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Video> create(@Valid @RequestBody Video video) {
        Video saved = repository.save(video);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Video update(@PathVariable Long id, @Valid @RequestBody Video payload) {
        Video existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Video introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Video introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
