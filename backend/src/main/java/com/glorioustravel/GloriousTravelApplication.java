package com.glorioustravel;

import com.glorioustravel.entity.AdminUser;
import com.glorioustravel.entity.SiteSettings;
import com.glorioustravel.repository.AdminUserRepository;
import com.glorioustravel.repository.SiteSettingsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Point d'entree de l'application Glorious Travel & Services.
 * Expose l'API REST consommee par le site public (Angular) et l'espace administrateur.
 */
@SpringBootApplication
public class GloriousTravelApplication {

    public static void main(String[] args) {
        SpringApplication.run(GloriousTravelApplication.class, args);
    }

    /**
     * Cree un compte administrateur par defaut et les parametres du site au premier
     * demarrage, si aucun n'existe encore en base. Permet de livrer l'application
     * "prete a l'emploi" sans etape SQL manuelle.
     */
    @Bean
    CommandLineRunner seedDatabase(AdminUserRepository adminUserRepository,
                                    SiteSettingsRepository siteSettingsRepository,
                                    PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminUserRepository.count() == 0) {
                AdminUser admin = new AdminUser();
                admin.setFullName("Marc Kamga");
                admin.setEmail("admin@glorioustravel.cm");
                admin.setPassword(passwordEncoder.encode("ChangeMoi123!"));
                admin.setRole("ADMINISTRATEUR_PRINCIPAL");
                adminUserRepository.save(admin);
                System.out.println("=== Compte admin par defaut cree : admin@glorioustravel.cm / ChangeMoi123! (a changer !) ===");
            }
            if (siteSettingsRepository.count() == 0) {
                SiteSettings settings = new SiteSettings();
                settings.setAgencyName("Glorious Travel & Services");
                settings.setSlogan("Voyagez. Realisez. Avancez.");
                settings.setWhatsappNumber("+237673506868");
                settings.setAddress("Douala, Logpom - Carrefour Bassong");
                settings.setEmail("contact@glorioustravel.cm");
                settings.setHoursWeekdays("Lundi - Vendredi : 8h30 - 17h00");
                settings.setHoursSaturday("Samedi : 9h00 - 13h00");
                settings.setFacebookUrl("");
                settings.setTiktokUrl("");
                siteSettingsRepository.save(settings);
            }
        };
    }
}
