package com.glorioustravel.controller;

import com.glorioustravel.entity.AdminUser;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.AdminUserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD des comptes administrateurs. Le mot de passe est toujours hache (BCrypt)
 * avant d'etre enregistre, et n'est jamais renvoye dans les reponses JSON
 * (voir @JsonProperty(WRITE_ONLY) sur AdminUser.password).
 */
@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public List<AdminUser> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public AdminUser getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<AdminUser> create(@Valid @RequestBody AdminUser adminUser) {
        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));
        return ResponseEntity.ok(repository.save(adminUser));
    }

    @PutMapping("/{id}")
    public AdminUser update(@PathVariable Long id, @RequestBody AdminUser payload) {
        AdminUser existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur introuvable (id=" + id + ")"));

        existing.setFullName(payload.getFullName());
        existing.setEmail(payload.getEmail());
        existing.setRole(payload.getRole());
        existing.setActive(payload.isActive());

        // Le mot de passe n'est change que si un nouveau a ete fourni
        if (payload.getPassword() != null && !payload.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(payload.getPassword()));
        }
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Utilisateur introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
