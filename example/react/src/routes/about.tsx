import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { WcsBreadcrumb, WcsBreadcrumbItem } from 'wcs-react';

export default function About(): ReactElement {
  return (
    <>
      <WcsBreadcrumb>
        <WcsBreadcrumbItem>
          <Link to="/">Home</Link>
        </WcsBreadcrumbItem>
        <WcsBreadcrumbItem>About</WcsBreadcrumbItem>
      </WcsBreadcrumb>

      <h2>About</h2>
      <p>This is the about page</p>
    </>
  );
}
