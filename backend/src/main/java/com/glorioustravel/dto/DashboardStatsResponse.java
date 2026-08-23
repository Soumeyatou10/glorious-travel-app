package com.glorioustravel.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class DashboardStatsResponse {
    private long requestsThisMonth;
    private long newClientsThisMonth;
    private long upcomingAppointments;
    private long unreadMessages;
    private Map<String, Long> requestsByDestination;
    private List<Map<String, Object>> requestsByMonth; // [{month: "Mars", count: 58}, ...]
}
