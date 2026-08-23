package com.glorioustravel.controller;

import com.glorioustravel.entity.Client;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.ClientRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "clients".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/clients")
@RequiredArgsConstructor
public class AdminClientController {

    private final ClientRepository repository;

    @GetMapping
    public List<Client> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Client getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Client> create(@Valid @RequestBody Client client) {
        Client saved = repository.save(client);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Client update(@PathVariable Long id, @Valid @RequestBody Client payload) {
        Client existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Client introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
