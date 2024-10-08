import { ReactElement } from 'react';
import { WcsMatIcon, WcsNav, WcsNavItem } from 'wcs-react';
import { NavLink } from 'react-router-dom';

export default function Nav(): ReactElement {
  return (
    <WcsNav className="main-nav">
      <WcsNavItem>
        <NavLink to="/example">
          <WcsMatIcon icon="train"></WcsMatIcon>
          <span>Example</span>
        </NavLink>
      </WcsNavItem>
      <WcsNavItem>
        <NavLink to="/about">
          <WcsMatIcon icon="info"></WcsMatIcon>
          <span>About</span>
        </NavLink>
      </WcsNavItem>
    </WcsNav>
  );
}
