import React, { useState } from 'react';
import './App.css';
import { defineCustomElements, WcsButton, WcsDivider, WcsMatIcon, WcsSwitch } from 'wcs-react';
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import Nav from "./components/nav";
import Example from "./routes/example";
import ComNav from "./components/com-nav";

// @ts-ignore
defineCustomElements();


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: '/example',
        element: <Example/>
      },
      {
        path: '/about',
        element: <div>
          <p>This is the about page</p>
          <Link to="/example">Go back to example</Link>
        </div>
      }
    ]
  },
  
]);

function Root() {
  const [isBusinessNavActive, setIsBusinessNavActive] = useState(true); 
    
  return (
    <div className="App">
      {isBusinessNavActive ? <header className="App-header"><Header/></header> : null}
      {!isBusinessNavActive ? ComNav() : null}  
      <div className="main-container" data-business-mode={isBusinessNavActive ? "" : undefined} data-communication-mode={!isBusinessNavActive ? "" : undefined}>
        {isBusinessNavActive ? Nav() : null}
        <main>
          <section>
            <h1>WCS React Sandbox</h1>
            
            <p>Switch below the layout you want between "Business" and "Communication"</p>  
            <div className="switch-mode">
                <WcsMatIcon icon="campaign" family="filled"></WcsMatIcon>
                <WcsSwitch checked={isBusinessNavActive} onWcsChange={() => setIsBusinessNavActive(!isBusinessNavActive)}>
                </WcsSwitch>
                <WcsMatIcon icon="business_center" family="filled"></WcsMatIcon>
            </div>
              
            <p>This app is a sandbox to test the react components bindings.</p>
            <WcsDivider style={{marginBottom: 'var(--wcs-margin)'}}/>
            <div className="content">
              <Outlet/>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
