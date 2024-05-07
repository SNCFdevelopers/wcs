import { WcsButton, WcsGrid, WcsGridColumn } from "wcs-react";
import { InputDemo } from "../components/input-demo";
import { TextareaDemo } from "../components/textarea-demo";
import React from "react";

export default function Example() {

  const sampleData = [
    {id: 1, name: 'John', surname: 'Doe'},
    {id: 2, name: 'Jane', surname: 'Doe'},
    {id: 3, name: 'John', surname: 'Smith'},
    {id: 4, name: 'Jane', surname: 'Smith'},
  ];

  
  return (
    <>
      <WcsButton onClick={event => console.log('Clicked handler in react!')}>Super!</WcsButton>
      <p>Grid</p>
      <WcsGrid data={sampleData} rowIdPath="id" selectionConfig="single"
               onWcsGridSelectionChange={event => console.log(event.detail)}>
        <WcsGridColumn path="name" name="Name" sort/>
        <WcsGridColumn path="surname" name="Surname" sort/>
      </WcsGrid>
      <InputDemo/>
      <TextareaDemo/>
    </>
  );
}