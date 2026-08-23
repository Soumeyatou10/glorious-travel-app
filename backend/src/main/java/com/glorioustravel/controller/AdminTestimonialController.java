package com.glorioustravel.controller;

import com.glorioustravel.entity.Testimonial;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.TestimonialRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "testimonials".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/testimonials")
@RequiredArgsConstructor
public class AdminTestimonialController {

    private final TestimonialRepository repository;

    @GetMapping
    public List<Testimonial> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Testimonial getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Testimonial> create(@Valid @RequestBody Testimonial testimonial) {
        Testimonial saved = repository.save(testimonial);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Testimonial update(@PathVariable Long id, @Valid @RequestBody Testimonial payload) {
        Testimonial existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Testimonial introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
