package com.glorioustravel.controller;

import com.glorioustravel.entity.ClientRequest;
import com.glorioustravel.repository.ClientRequestRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Point d'entree PUBLIC pour le formulaire "Parler a un conseiller" du site.
 * Toute demande soumise est enregistree avec le statut NOUVELLE et apparait
 * immediatement dans l'espace admin (Demandes clients).
 */
@RestController
@RequestMapping("/api/public/requests")
@RequiredArgsConstructor
public class PublicClientRequestController {

    private final ClientRequestRepository clientRequestRepository;

    @PostMapping
    public ResponseEntity<ClientRequest> submit(@Valid @RequestBody ClientRequest request) {
        request.setId(null);
        request.setStatus("NOUVELLE");
        return ResponseEntity.ok(clientRequestRepository.save(request));
    }
}
