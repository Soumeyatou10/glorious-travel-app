package com.glorioustravel.controller;

import com.glorioustravel.entity.Offer;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.OfferRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "offers".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/offers")
@RequiredArgsConstructor
public class AdminOfferController {

    private final OfferRepository repository;

    @GetMapping
    public List<Offer> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Offer getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Offer> create(@Valid @RequestBody Offer offer) {
        Offer saved = repository.save(offer);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Offer update(@PathVariable Long id, @Valid @RequestBody Offer payload) {
        Offer existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offer introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Offer introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
