package com.glorioustravel.controller;

import com.glorioustravel.entity.Destination;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.DestinationRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "destinations".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/destinations")
@RequiredArgsConstructor
public class AdminDestinationController {

    private final DestinationRepository repository;

    @GetMapping
    public List<Destination> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Destination getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Destination> create(@Valid @RequestBody Destination destination) {
        Destination saved = repository.save(destination);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Destination update(@PathVariable Long id, @Valid @RequestBody Destination payload) {
        Destination existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Destination introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
