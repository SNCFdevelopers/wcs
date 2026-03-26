import { Routes } from '@angular/router';
import { BreadcrumbPageComponent } from './breadcrumb-page.component';
import { TooltipPageComponent } from './tooltip-page.component';
import { ModalPageComponent } from './modal-page.component';
import { GridPageComponent } from './grid-page.component';
import { MiscPageComponent } from './misc-page.component';
import { ControlsPageComponent } from "./controls-page-component";
import { FormlyPageComponent } from "./formly-page";

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'controls' },
	{ path: 'controls', component: ControlsPageComponent },
	{ path: 'breadcrumb', component: BreadcrumbPageComponent },
	{ path: 'tooltip', component: TooltipPageComponent },
	{ path: 'modal', component: ModalPageComponent },
	{ path: 'grid', component: GridPageComponent },
	{ path: 'misc', component: MiscPageComponent },
	{ path: 'formly', component: FormlyPageComponent },
];
