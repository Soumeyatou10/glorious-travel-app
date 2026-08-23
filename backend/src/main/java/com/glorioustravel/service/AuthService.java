package com.glorioustravel.service;

import com.glorioustravel.dto.LoginRequest;
import com.glorioustravel.dto.LoginResponse;
import com.glorioustravel.entity.AdminUser;
import com.glorioustravel.repository.AdminUserRepository;
import com.glorioustravel.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final AdminUserRepository adminUserRepository;

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        AdminUser admin = adminUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Administrateur introuvable"));

        String token = jwtUtil.generateToken(userDetails, admin.getRole());
        return new LoginResponse(token, admin.getFullName(), admin.getEmail(), admin.getRole());
    }
}
