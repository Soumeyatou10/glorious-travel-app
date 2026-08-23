package com.glorioustravel.controller;

import com.glorioustravel.entity.Article;
import com.glorioustravel.exception.ResourceNotFoundException;
import com.glorioustravel.repository.ArticleRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CRUD complet reserve a l'espace administrateur pour la ressource "articles".
 * Protege par JWT (voir SecurityConfig : /api/admin/** necessite un token valide).
 */
@RestController
@RequestMapping("/api/admin/articles")
@RequiredArgsConstructor
public class AdminArticleController {

    private final ArticleRepository repository;

    @GetMapping
    public List<Article> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Article getOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable (id=" + id + ")"));
    }

    @PostMapping
    public ResponseEntity<Article> create(@Valid @RequestBody Article article) {
        Article saved = repository.save(article);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Article update(@PathVariable Long id, @Valid @RequestBody Article payload) {
        Article existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article introuvable (id=" + id + ")"));
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Article introuvable (id=" + id + ")");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
