import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <wcs-header>
      <img slot="logo" src="./assets/sncf-logo.png" alt="Logo SNCF" >
      <h1 slot="title">Votre superbe application</h1>
      <div slot="actions">
          <wcs-button class="wcs-light" mode="clear"><span>Connexion</span><i class="material-icons">person_outline</i></wcs-button>
      </div>
    </wcs-header>
    <wcs-nav>
      <wcs-nav-item text="Example">
        <i class="material-icons">train</i>
      </wcs-nav-item>
    </wcs-nav>
    <main>
      <!--<router-outlet></router-outlet>-->
      <wcs-card>
        <wcs-card-body>
          <p>This application was bootstrapped using:
          </p>
          <pre><code>ng add wcs-temporary</code></pre>
        </wcs-card-body>
      </wcs-card>
      <app-select-example></app-select-example>
    </main>
  `,
  styles: [`
    :host {
      display: grid;
      grid-template-areas: "header header" "nav content";
      grid-template-columns: auto 1fr;
      height: 100vh;
      overflow-y: hidden;
    }
    main {
      grid-area: content;
      padding: 16px;
      overflow-y: auto;
      height: calc(100vh - 64px - 16px - 16px);
    }
    wcs-nav {
      grid-area: nav;
    }
    wcs-header {
      grid-area: header;
    }
  `]
})
export class AppComponent {
  title = 'example';
}
