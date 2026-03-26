import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WcsAngularModule } from "wcs-angular";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, WcsAngularModule],
    template: `
        <wcs-header>
            <img slot="logo" src="/sncf-logo.png" alt="Logo SNCF">
            <h1 slot="title">Your Application Name</h1>
            <div slot="actions" class="flex-center">
                Wahou
            </div>
        </wcs-header>
        <main>
            <router-outlet></router-outlet>
        </main>
        <wcs-nav>
            <wcs-nav-item>
                <a routerLink="/controls">
                    <wcs-mat-icon icon="star"></wcs-mat-icon>
                    <span>Controls</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item>
                <a routerLink="/breadcrumb">
                    <wcs-mat-icon icon="account_tree"></wcs-mat-icon>
                    <span>Breadcrumb</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item>
                <a routerLink="/tooltip">
                    <wcs-mat-icon icon="help_outline"></wcs-mat-icon>
                    <span>Tooltip</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item>
                <a routerLink="/modal">
                    <wcs-mat-icon icon="open_in_new"></wcs-mat-icon>
                    <span>Modal</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item>
                <a routerLink="/grid">
                    <wcs-mat-icon icon="grid_on"></wcs-mat-icon>
                    <span>Grid</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item>
                <a routerLink="/misc">
                    <wcs-mat-icon icon="extension"></wcs-mat-icon>
                    <span>Misc</span>
                </a>
            </wcs-nav-item>
          <wcs-nav-item>
            <a routerLink="/formly">
              <wcs-mat-icon icon="star"></wcs-mat-icon>
              <span>Formly</span>
            </a>
          </wcs-nav-item>
        </wcs-nav>
    `,
    styles: [`
        :host {
            display: grid;
            grid-template-areas: "header header" "nav content";
            grid-template-columns: min-content 1fr;

            wcs-header {
                grid-area: header;
            }

            wcs-nav {
                grid-area: nav;
                height: calc(100vh - 8 * var(--wcs-semantic-size-base));
            }

            main {
                grid-area: content;
                padding: var(--wcs-semantic-spacing-large);
                height: calc(100vh - 8 * var(--wcs-semantic-size-base)); /* Remove the header height in the calc */
                overflow-y: auto;
            }
        }

        @media screen and (max-width: 1199px) {
            :host {
                grid-template-areas: "header" "content" "nav";
                grid-template-columns: 1fr;
            }

            main {
                height: calc(100vh - 8 * var(--wcs-semantic-size-base) - 6 * var(--wcs-semantic-size-base)); /* Remove the header and mobile-nav height in the calc */
                max-width: 100vw;
            }

            wcs-nav {
                height: initial;
            }
        }
    `]
})
export class RootComponent { }
