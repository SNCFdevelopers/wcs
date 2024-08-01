import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout.component';
import { AboutComponent } from './about/about.component';
import { AboutIntroComponent } from './about/about-intro.component';
import { AboutArticleComponent } from './about/about-article.component';
import { MainExampleComponent } from './example/main-example.component';

import { ArticleTitleResolver } from './data/article-title.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: MainExampleComponent,
      },
      {
        path: 'example',
        component: MainExampleComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
        data: { breadcrumb: 'About' },
        children: [
          {
            path: '',
            component: AboutIntroComponent,
            data: { breadcrumb: null },
          },
          {
            path: ':slug',
            component: AboutArticleComponent,
            data: { breadcrumb: (data: { title: string }) => `${data.title}` },
            resolve: { title: ArticleTitleResolver },
          },
        ],
      },
      {
        path: '**',
        component: MainExampleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
