import { ReactElement } from 'react';
import { WcsButton} from 'wcs-react';
import { useAlertDrawer } from '../contexts/AlertContext';

export function AlertDemo(): ReactElement {
    const {showAlert} = useAlertDrawer();

    return (
            <div>
                <h2>Demo of the Alert Component</h2>
                
                <WcsButton onClick={() => {
                    showAlert({intent: 'success', title: 'Alert Title', subtitle: 'Subtitle'});
                }}>Show success</WcsButton>

                <WcsButton onClick={() => {
                    showAlert({intent: 'information', title: 'Alert Title', subtitle: 'Subtitle'});
                }}>Show information</WcsButton>

                <WcsButton onClick={() => {
                    showAlert({intent: 'warning', title: 'Alert Title', subtitle: 'Subtitle'});
                }}>Show warning</WcsButton>

                <WcsButton onClick={() => {
                    showAlert({intent: 'error', title: 'Alert Title', subtitle: 'Subtitle'});
                }}>Show error</WcsButton>
            </div>
    );
}

