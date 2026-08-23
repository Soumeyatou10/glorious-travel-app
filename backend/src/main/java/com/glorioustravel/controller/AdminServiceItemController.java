package com.glorioustravel.controller;

import com.glorioustravel.entity.ServiceItem;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.ServiceItemRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "services".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/services")
@RequiredArgsConstructor
public class AdminServiceItemController {

    private final ServiceItemRepository repository;

    @GetMapping
    public List<ServiceItem> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ServiceItem getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceItem introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<ServiceItem> create(@Valid @RequestBody ServiceItem serviceItem) {
        ServiceItem saved = repository.save(serviceItem);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ServiceItem update(@PathVariable Long id, @Valid @RequestBody ServiceItem payload) {
        ServiceItem existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceItem introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("ServiceItem introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
