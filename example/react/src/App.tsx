import React from 'react';
import './App.css';
import { defineCustomElements, WcsButton, WcsGrid, WcsGridColumn } from 'wcs-react';

defineCustomElements();

const sampleData = [
    { id: 1, name: 'John', surname: 'Doe' },
    { id: 2, name: 'Jane', surname: 'Doe' },
    { id: 3, name: 'John', surname: 'Smith' },
    { id: 4, name: 'Jane', surname: 'Smith' },
];

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>This app is a sandbox to test the react components bindings.</p>
                <WcsButton onClick={event => console.log('Clicked handler in react!')}>Super!</WcsButton>
                <p>Grid</p>
                <WcsGrid data={sampleData} rowIdPath="id" selectionConfig="single" onWcsGridSelectionChange={event => console.log(event.detail)}>
                    <WcsGridColumn path="name" name="Name" sort />
                    <WcsGridColumn path="surname" name="Surname" sort />
                </WcsGrid>
            </header>
        </div>
    );
}

export default App;
