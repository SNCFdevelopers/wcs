// @flow 
import * as React from 'react';
import { useState } from 'react';
import { WcsInput } from 'wcs-react';

type Props = {};
export const InputDemo = (props: Props) => {
    const [firstNameWcsInput, setFirstNameWcsInput] = useState("");
    const [firstNameWcsChange, setFirstNameWcsChange] = useState("");
    return (
        <div>
            <h2>Demo of the input component</h2>
            <div style={{display: 'flex', gap: '24px'}}>
                <div>
                    <label>Firstname (with wcsInput event)</label>
                    <WcsInput
                        onWcsInput={event => setFirstNameWcsInput(event.target.value?.toString() ?? '')}></WcsInput>
                    <p>Hi! {firstNameWcsInput}</p>
                </div>
                <div>
                    <label>Firstname (with wcsChange event)</label>
                    <WcsInput
                        onWcsChange={event => setFirstNameWcsChange(event.detail.value?.toString() ?? '')}></WcsInput>
                    <p>Hi! {firstNameWcsChange}</p>
                </div>
            </div>
        </div>
    );
};
