import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { HeroComponent } from './hero.component';
import { StatsComponent } from './stats.component';
import { AboutComponent } from './about.component';
import { ServicesComponent } from './services.component';
import { DestinationsComponent } from './destinations.component';
import { ProcessComponent } from './process.component';
import { TestimonialsComponent } from './testimonials.component';
import { MediaComponent } from './media.component';
import { FaqComponent } from './faq.component';
import { ContactComponent } from './contact.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'gt-home',
  standalone: true,
  imports: [
    NavbarComponent, HeroComponent, StatsComponent, AboutComponent, ServicesComponent, DestinationsComponent,
    ProcessComponent, TestimonialsComponent, MediaComponent, FaqComponent, ContactComponent, FooterComponent
  ],
  template: `
    <gt-navbar></gt-navbar>
    <gt-hero></gt-hero>
    <gt-stats></gt-stats>
    <gt-about></gt-about>
    <gt-services></gt-services>
    <gt-destinations></gt-destinations>
    <gt-process></gt-process>
    <gt-testimonials></gt-testimonials>
    <gt-media></gt-media>
    <gt-faq></gt-faq>
    <gt-contact></gt-contact>
    <gt-footer></gt-footer>
  `
})
export class HomeComponent {}
