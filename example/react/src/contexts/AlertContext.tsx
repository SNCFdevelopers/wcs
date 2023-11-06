import React, { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import { WcsAlertDrawerPosition, WcsAlertConfig } from 'wcs-core';
import { WcsAlertDrawer } from "wcs-react";

interface AlertDrawerConfig {
    position: WcsAlertDrawerPosition;
    showProgressBar: boolean;
    timeout: number;
}

interface AlertDrawerContextValue {
    showAlert: (params: WcsAlertConfig) => void;
}

const AlertDrawerContext = createContext<AlertDrawerContextValue>({
    showAlert: () => { console.error("AlertDrawerContext not initialized") }
});

export const AlertDrawerProvider: React.FC<{
    children: ReactNode;
    config: AlertDrawerConfig;
}> = ({children, config}) => {
    const alertDrawerRef = useRef<HTMLWcsAlertDrawerElement | null>(null);

    useEffect(() => {
        if (!window.customElements.get('wcs-alert-drawer')) {
            console.warn('[wcs-alert.provider] Web Component "wcs-alert-drawer" not found. Please ensure the component is loaded before using the provider');
            return;
        }
    }, []);

    const showAlert = (params: WcsAlertConfig) => {
        if (alertDrawerRef.current) {
            alertDrawerRef.current.show(params);
        }
    };

    return (
        <AlertDrawerContext.Provider value={{showAlert}}>
            {children}
            <WcsAlertDrawer position={config.position} showProgressBar={config.showProgressBar} timeout={config.timeout} ref={alertDrawerRef} />
        </AlertDrawerContext.Provider>
    );
};

export const useAlertDrawer = (): AlertDrawerContextValue => {
    const context = useContext(AlertDrawerContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
