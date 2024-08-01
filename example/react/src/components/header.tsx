import { ReactElement } from 'react';
import { WcsButton, WcsHeader } from 'wcs-react';

export default function Header(): ReactElement {
  
  return (
    <WcsHeader>
      <img slot="logo" src="/sncf-logo.png" alt="Logo SNCF"/>
      <h1 slot="title">WcsReact Example</h1>
      <div slot="actions">
        <WcsButton class="wcs-light" mode="clear">
          <span>Connexion</span>
        </WcsButton>
      </div>
    </WcsHeader>
  );

}
