import { ReactElement  } from 'react';
import { WcsButton, WcsDivider, WcsGrid, WcsGridColumn } from 'wcs-react';
import { InputDemo } from '../components/input-demo';
import { TextareaDemo } from '../components/textarea-demo';

const SAMPLE_DATA = [
  {id: 1, name: 'John', surname: 'Doe'},
  {id: 2, name: 'Jane', surname: 'Doe'},
  {id: 3, name: 'John', surname: 'Smith'},
  {id: 4, name: 'Jane', surname: 'Smith'},
];

export default function Example(): ReactElement {
  return (
    <>
      <h2>WCS React Sandbox</h2>
      <p>This app is a sandbox to test the react components bindings.</p>

      <WcsDivider style={{marginBottom: 'var(--wcs-margin)'}}/>

      <div className="content">
        <WcsButton onClick={() => console.log('Clicked handler in react!')}>
          Super!
        </WcsButton>

        <p>Grid</p>
        <WcsGrid
          data={SAMPLE_DATA} 
          rowIdPath="id" 
          selectionConfig="single"
          onWcsGridSelectionChange={event => console.log(event.detail)}
        >
          <WcsGridColumn path="name" name="Name" sort/>
          <WcsGridColumn path="surname" name="Surname" sort/>
        </WcsGrid>

        <InputDemo/>

        <TextareaDemo/>
      </div>
    </>
  );
}
