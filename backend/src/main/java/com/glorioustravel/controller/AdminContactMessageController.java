package com.glorioustravel.controller;

import com.glorioustravel.entity.ContactMessage;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "messages".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/messages")
@RequiredArgsConstructor
public class AdminContactMessageController {

    private final ContactMessageRepository repository;

    @GetMapping
    public List<ContactMessage> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ContactMessage getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<ContactMessage> create(@Valid @RequestBody ContactMessage contactMessage) {
        ContactMessage saved = repository.save(contactMessage);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ContactMessage update(@PathVariable Long id, @Valid @RequestBody ContactMessage payload) {
        ContactMessage existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("ContactMessage introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
