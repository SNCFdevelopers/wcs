import React from 'react';
import './App.css';
import { defineCustomElements, WcsDivider } from 'wcs-react';
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import Nav from "./components/nav";
import Example from "./routes/example";

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
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <div className="main-container">
        <Nav/>
        <main>
          <section>
            <h1>WCS React Sandbox</h1>
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
