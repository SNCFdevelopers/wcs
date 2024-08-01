import { Component, OnInit } from '@angular/core';

import aboutArticles from '../data/aboutArticles';

@Component({
  selector: 'app-about',
  template: `
    <h2>About</h2>
    <p>Découvrir le groupe SNCF.</p>
    <div>Détails :</div>
    <div class="links-container">
      <a *ngFor="let article of aboutArticles; let i = index"
        [routerLink]="['/about', article.slug]"
      >
        {{ article.title }}
      </a>
    </div>
  `,
  styles: [`
    .links-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  `]
})
export class AboutIntroComponent implements OnInit {
  aboutArticles = [];

  ngOnInit(): void {
    this.aboutArticles = this.getAllAboutArticles();
  }

  // Service mock
  getAllAboutArticles() {
    return aboutArticles;
  }
}
