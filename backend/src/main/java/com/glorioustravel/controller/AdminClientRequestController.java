package com.glorioustravel.controller;

import com.glorioustravel.entity.ClientRequest;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.ClientRequestRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "requests".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/requests")
@RequiredArgsConstructor
public class AdminClientRequestController {

    private final ClientRequestRepository repository;

    @GetMapping
    public List<ClientRequest> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ClientRequest getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ClientRequest introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<ClientRequest> create(@Valid @RequestBody ClientRequest clientRequest) {
        ClientRequest saved = repository.save(clientRequest);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ClientRequest update(@PathVariable Long id, @Valid @RequestBody ClientRequest payload) {
        ClientRequest existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ClientRequest introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("ClientRequest introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
