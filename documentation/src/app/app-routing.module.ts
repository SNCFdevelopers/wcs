import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GettingStartedComponent } from './pages/getting-started/getting-started.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/getting-started' },
  { path: 'getting-started', component: GettingStartedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
