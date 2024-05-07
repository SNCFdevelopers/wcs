import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from "./about.component";
import { MainExampleComponent } from "./main-example.component";


const routes: Routes = [
  {
    path: 'example',
    component: MainExampleComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: MainExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
