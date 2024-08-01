import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import aboutArticles, { AboutArticle } from '../data/aboutArticles';

@Component({
  selector: 'app-about-article',
  template: `
    <h2>{{ article.title }}</h2>
    <p>{{ article.textContent }}</p>
    <wcs-button (click)="goBack()">Go back</wcs-button>
  `,
  styles: [],
})
export class AboutArticleComponent implements OnInit {
  slug: string | null = null;
  article: AboutArticle;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.article = this.getAboutArticleBySlug(this.slug);
    }
  }

  // Service mock
  getAboutArticleBySlug(slug: string): AboutArticle {
    const articleData = aboutArticles.find((article) => article.slug === slug);
    if (articleData) return articleData;
    return {
      title: 'Not Found',
      slug: '',
      textContent: 'not found'
    };
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
