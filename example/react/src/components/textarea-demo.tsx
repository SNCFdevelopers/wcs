// @flow 
import * as React from 'react';
import { useState } from 'react';
import { WcsTextarea } from 'wcs-react';

type Props = {};
export const TextareaDemo = (props: Props) => {
    const [firstNameWcsInput, setFirstNameWcsInput] = useState("");
    const [firstNameWcsChange, setFirstNameWcsChange] = useState("");
    return (
        <div>
            <h2>Demo of the textarea component</h2>
            <div style={{display: 'flex', gap: '24px'}}>
                <div>
                    <label>Description (with wcsInput event)</label>
                    <WcsTextarea
                        onWcsInput={event => setFirstNameWcsInput(event.target.value?.toString() ?? '')}></WcsTextarea>
                    <p>Hi! {firstNameWcsInput}</p>
                </div>
                <div>
                    <label>Firstname (with wcsChange event)</label>
                    <WcsTextarea
                        onWcsChange={event => setFirstNameWcsChange(event.detail.value?.toString() ?? '')}></WcsTextarea>
                    <p>Hi! {firstNameWcsChange}</p>
                </div>
            </div>
        </div>
    );
};
