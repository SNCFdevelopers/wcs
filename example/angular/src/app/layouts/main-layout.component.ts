import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <wcs-header *ngIf="mode === 'business'">
      <img slot="logo" src="./assets/sncf-logo.png" alt="Logo SNCF" >
      <h1 slot="title">Votre superbe application</h1>
      <div slot="actions">
          <wcs-button mode="clear"><span>Connexion</span><wcs-mat-icon icon="person_outline"></wcs-mat-icon></wcs-button>
          <div class="switch-mode">
            <wcs-mat-icon icon="business_center" family="filled"></wcs-mat-icon>
            <wcs-switch (wcsChange)="mode = $event.detail.checked ? 'communication' : 'business'" checked="false"></wcs-switch>
            <wcs-mat-icon icon="campaign" family="filled"></wcs-mat-icon>
          </div>
      </div>
    </wcs-header>

    <wcs-nav *ngIf="mode === 'business'">
      <wcs-nav-item>
        <a routerLink="/example" routerLinkActive="active">
          <wcs-mat-icon icon="train"></wcs-mat-icon>
          <span>Example</span>
        </a>
      </wcs-nav-item>
      <wcs-nav-item>
        <a routerLink="/about" routerLinkActive="active">
          <wcs-mat-icon icon="info"></wcs-mat-icon>
          <span>Info</span>
        </a>
      </wcs-nav-item>
      <wcs-nav-item slot="bottom">
        <button id="support-button" (click)="supportButtonClick()">
          <wcs-mat-icon icon="support"></wcs-mat-icon>
          <span>Support</span>
        </button>
      </wcs-nav-item>
    </wcs-nav>

    <wcs-com-nav *ngIf="mode === 'communication'" app-name="Application" aria-label="Menu principal">
      <wcs-com-nav-item>
        <a routerLink="/example">
          Example
        </a>
      </wcs-com-nav-item>
      <wcs-com-nav-item>
        <a routerLink="/about">
          About
        </a>
      </wcs-com-nav-item>
      <div slot="actions">
        <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
        <div class="switch-mode">
          <wcs-mat-icon icon="business_center" family="filled"></wcs-mat-icon>
          <wcs-switch (wcsChange)="mode = $event.detail.checked ? 'communication' : 'business'" [checked]="mode === 'communication'"></wcs-switch>
          <wcs-mat-icon icon="campaign" family="filled"></wcs-mat-icon>
        </div>
      </div>
    </wcs-com-nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <wcs-footer *ngIf="mode==='communication'">
      <p>Contenu libre</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel neque et dolor egestas posuere nec sed neque.
        In porttitor orci vitae orci maximus, eget convallis nisi auctor. Nunc maximus vulputate maximus. Mauris ornare
        tortor mi. Quisque laoreet, erat sit amet volutpat ornare, ligula ante pharetra lacus, sit amet ornare libero
        odio eget nunc. Cras facilisis sem id tellus tempor, consectetur laoreet erat ornare. Sed aliquam tortor et quam
        viverra, nec finibus lacus mattis.</p>
      <a slot="end-left" href="#">Plan du site</a>
      <a slot="end-left" href="#">Mentions légales &amp; CGU</a>
      <a slot="end-left" href="#">Données personnelles &amp; cookies</a>
      <a slot="end-left" href="#">Portail de la cybersécurité</a>
      <span slot="end-right" href="#">Séléction de la langue</span>
    </wcs-footer>
  `,
  styles: [`
    :host([mode="business"]) {
      display: grid;
      grid-template-areas: "header header" "nav content";
      grid-template-columns: auto 1fr;
      /*height: 100vh;*/
      overflow-y: hidden;

      main {
        grid-area: content;
        padding: 16px;
        overflow-y: auto;
        height: calc(100vh - 64px - 16px - 16px);
      }
      wcs-nav {
        grid-area: nav;
        height: calc(100vh - 8 * var(--wcs-semantic-size-base));
      }
      wcs-header {
        grid-area: header;
      }
    }

    @media screen and (max-width: 1199px) {
      :host([mode="business"]) {
        grid-template-areas: "header" "content" "nav";
        grid-template-columns: 1fr;
      }
      main {
        height: calc(100vh - 8 * var(--wcs-semantic-size-base) - 6 * var(--wcs-semantic-size-base)); /* Remove the header and mobile-nav height in the calc */
        max-width: 100vw;
      }
      app-navbar {
        height: initial;
      }
    }

    :host([mode="communication"]) {
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      .switch-mode {
        color: var(--wcs-semantic-color-text-primary);
      }

      main {
        padding: var(--wcs-semantic-spacing-large);

        width: var(--wcs-com-content-max-width);
        margin: 0 auto;
        flex-grow: 1;
      }
    }

    div[slot="actions"] {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: calc(var(--wcs-semantic-spacing-large) / 2);
    }

    .switch-mode {
      display: flex;
      flex-direction: row;
      align-content: center;
      gap: calc(var(--wcs-semantic-spacing-large) / 2);
    }
  `]
})
export class MainLayoutComponent {
  @HostBinding('attr.mode')
  mode: 'business' | 'communication' = 'business';

  supportButtonClick() {
    alert('This is an example action');
  }
}
