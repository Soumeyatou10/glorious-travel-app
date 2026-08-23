package com.glorioustravel.controller;

import com.glorioustravel.entity.SiteSettings;
import com.glorioustravel.repository.SiteSettingsRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
@RequiredArgsConstructor
public class AdminSettingsController {

    private final SiteSettingsRepository repository;

    @GetMapping
    public SiteSettings get() {
        return repository.findAll().stream().findFirst().orElseGet(SiteSettings::new);
    }

    @PutMapping
    public SiteSettings update(@Valid @RequestBody SiteSettings payload) {
        SiteSettings existing = repository.findAll().stream().findFirst().orElseGet(SiteSettings::new);
        payload.setId(existing.getId());
        payload.setCreatedAt(existing.getCreatedAt());
        return repository.save(payload);
    }
}
