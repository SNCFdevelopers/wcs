import { ReactElement } from 'react';
import { WcsButton, WcsComNav, WcsComNavItem } from 'wcs-react';
import { NavLink } from 'react-router-dom';

export default function ComNav(): ReactElement {
    return (
        <WcsComNav app-name="Application" aria-label="Super menu de navigation">
            <WcsComNavItem>
                <NavLink to="/example">Example</NavLink>
            </WcsComNavItem>
            <WcsComNavItem>
                <NavLink to="/about">About</NavLink>
            </WcsComNavItem>
            <div slot="actions">
                <WcsButton mode="clear" className="wcs-dark">Connexion</WcsButton>
            </div>
        </WcsComNav>
    );
}
