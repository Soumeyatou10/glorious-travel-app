package com.glorioustravel.controller;

import com.glorioustravel.entity.*;
import com.glorioustravel.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Endpoints en lecture seule consommes par le site public (Angular).
 * Ne renvoie que les contenus marques "published = true", tries pour affichage.
 */
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final DestinationRepository destinationRepository;
    private final ServiceItemRepository serviceItemRepository;
    private final OfferRepository offerRepository;
    private final TestimonialRepository testimonialRepository;
    private final PhotoRepository photoRepository;
    private final VideoRepository videoRepository;
    private final ArticleRepository articleRepository;
    private final FaqRepository faqRepository;
    private final SiteSettingsRepository siteSettingsRepository;

    @GetMapping("/destinations")
    public List<Destination> destinations() {
        return destinationRepository.findAll().stream()
                .filter(Destination::isPublished)
                .sorted(Comparator.comparing(Destination::getDisplayOrder, Comparator.nullsLast(Integer::compareTo)))
                .collect(Collectors.toList());
    }

    @GetMapping("/services")
    public List<ServiceItem> services() {
        return serviceItemRepository.findAll().stream()
                .filter(ServiceItem::isPublished)
                .sorted(Comparator.comparing(ServiceItem::getDisplayOrder, Comparator.nullsLast(Integer::compareTo)))
                .collect(Collectors.toList());
    }

    @GetMapping("/offers")
    public List<Offer> offers() {
        return offerRepository.findAll().stream().filter(Offer::isPublished).collect(Collectors.toList());
    }

    @GetMapping("/testimonials")
    public List<Testimonial> testimonials() {
        return testimonialRepository.findAll().stream().filter(Testimonial::isPublished).collect(Collectors.toList());
    }

    @GetMapping("/photos")
    public List<Photo> photos() {
        return photoRepository.findAll().stream().filter(Photo::isPublished).collect(Collectors.toList());
    }

    @GetMapping("/videos")
    public List<Video> videos() {
        return videoRepository.findAll().stream().filter(Video::isPublished).collect(Collectors.toList());
    }

    @GetMapping("/articles")
    public List<Article> articles() {
        return articleRepository.findAll().stream().filter(Article::isPublished).collect(Collectors.toList());
    }

    @GetMapping("/faqs")
    public List<Faq> faqs() {
        return faqRepository.findAll().stream()
                .filter(Faq::isPublished)
                .sorted(Comparator.comparing(Faq::getDisplayOrder, Comparator.nullsLast(Integer::compareTo)))
                .collect(Collectors.toList());
    }

    @GetMapping("/settings")
    public SiteSettings settings() {
        return siteSettingsRepository.findAll().stream().findFirst().orElse(new SiteSettings());
    }
}
