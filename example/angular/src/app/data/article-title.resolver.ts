import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import aboutArticles from 'src/app/data/aboutArticles';

@Injectable({ providedIn: 'root' })
export class ArticleTitleResolver implements Resolve<string> {
    constructor() {}

    resolve(route: ActivatedRouteSnapshot) {
      const slug = route.paramMap.get('slug');
      const articleData = aboutArticles.find((article) => article.slug === slug);
      if (articleData) return articleData.title;
      return 'Not Found';
    }
}
