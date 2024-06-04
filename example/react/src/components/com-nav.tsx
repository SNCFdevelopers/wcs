import { WcsButton, WcsComNav, WcsComNavItem } from "wcs-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function ComNav() {
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
