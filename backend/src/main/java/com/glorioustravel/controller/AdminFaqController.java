package com.glorioustravel.controller;

import com.glorioustravel.entity.Faq;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.FaqRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "faqs".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/faqs")
@RequiredArgsConstructor
public class AdminFaqController {

    private final FaqRepository repository;

    @GetMapping
    public List<Faq> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Faq getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faq introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Faq> create(@Valid @RequestBody Faq faq) {
        Faq saved = repository.save(faq);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Faq update(@PathVariable Long id, @Valid @RequestBody Faq payload) {
        Faq existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faq introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Faq introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
