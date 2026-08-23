package com.glorioustravel.service;

import com.glorioustravel.dto.DashboardStatsResponse;
import com.glorioustravel.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ClientRequestRepository clientRequestRepository;
    private final ClientRepository clientRepository;
    private final AppointmentRepository appointmentRepository;
    private final ContactMessageRepository contactMessageRepository;

    public DashboardStatsResponse getStats() {
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();

        long requestsThisMonth = clientRequestRepository.findAll().stream()
                .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().isAfter(startOfMonth))
                .count();

        long newClientsThisMonth = clientRepository.findAll().stream()
                .filter(c -> c.getCreatedAt() != null && c.getCreatedAt().isAfter(startOfMonth))
                .count();

        long upcomingAppointments = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate() != null && !a.getAppointmentDate().isBefore(LocalDate.now()))
                .count();

        long unreadMessages = contactMessageRepository.findAll().stream()
                .filter(m -> !m.isRead())
                .count();

        Map<String, Long> byDestination = clientRequestRepository.findAll().stream()
                .filter(r -> r.getDestination() != null)
                .collect(Collectors.groupingBy(r -> r.getDestination(), Collectors.counting()));

        List<Map<String, Object>> byMonth = clientRequestRepository.findAll().stream()
                .filter(r -> r.getCreatedAt() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getCreatedAt().getMonth().getDisplayName(TextStyle.FULL, Locale.FRENCH),
                        Collectors.counting()
                ))
                .entrySet().stream()
                .map(e -> Map.<String, Object>of("month", e.getKey(), "count", e.getValue()))
                .collect(Collectors.toList());

        return new DashboardStatsResponse(
                requestsThisMonth, newClientsThisMonth, upcomingAppointments, unreadMessages, byDestination, byMonth
        );
    }
}
