import { useState } from 'react';
import { defineCustomElements, WcsMatIcon, WcsSwitch } from 'wcs-react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';

import Header from './components/header';
import Nav from './components/nav';
import ComNav from './components/com-nav';
import Example from './routes/example';
import About from './routes/about';

// @ts-ignore
defineCustomElements();

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/',
        element: <Example/>
      },
      {
        path: '/example',
        element: <Example/>
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  },
  
]);

function Root() {
  const [isBusinessNavActive, setIsBusinessNavActive] = useState(true); 
    
  return (
    <div className="App">
      {isBusinessNavActive ? (
        <header className="App-header">
          <Header />
        </header>
        ) : (
        <ComNav />
      )}
      <div
        className="main-container"
        data-business-mode={isBusinessNavActive ? "" : undefined}
        data-communication-mode={!isBusinessNavActive ? "" : undefined}
      >
        {isBusinessNavActive ? <Nav /> : null}
        <main>
          <section>
            <p className="switch-mode-description">
              Click below to switch between "Business" and "Communication" layouts
            </p>
            <div className="switch-mode">
                <WcsMatIcon icon="campaign" family="filled"></WcsMatIcon>
                <WcsSwitch checked={isBusinessNavActive} onWcsChange={() => setIsBusinessNavActive(!isBusinessNavActive)}>
                </WcsSwitch>
                <WcsMatIcon icon="business_center" family="filled"></WcsMatIcon>
            </div>

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
