
## Usage with Vanilla JavaScript

If you're not using a library or a framework, you can create alerts programmatically using `WcsAlertDrawer::show(alert: WcsAlertConfig)` method :

```javascript

// 1. Import the component in your HTML file and configure it
<wcs-alert-drawer position="top-right" show-progress-bar="false" timeout="4000"></wcs-alert-drawer>

// 2. Show an alert using the show() method
const alertDrawer = document.querySelector('wcs-alert-drawer');

function showAlert() {
    alertDrawer.show({
        title: 'Operation completed',
        subtitle: 'Your changes have been saved',
        intent: 'success',
        showProgressBar: true,
        timeout: 5000 // 5 seconds
    });
}

// 3. Button to trigger the alert for example (in your HTML)
<wcs-button onclick="showAlert()">Show Alert</wcs-button>
```

## Integration

<wcs-tabs gutter>
    <wcs-tab header="Angular">
        First, inject the `WcsAlertService` in your component:

        ```typescript
        import { Component } from '@angular/core';
        import { WcsAlertService } from 'wcs-angular';
        
        @Component({
            selector: 'app-example',
            template: '<wcs-button (click)="showAlert()">Show Alert</wcs-button>'
        })
        export class ExampleComponent {
            constructor(private alertService: WcsAlertService) {
                // Optional: Configure global settings
                this.alertService.setConfig({
                    showProgressBar: false,
                    timeout: 5000,
                    position: 'top-right',
                });
            }
        
            showAlert(): void {
                this.alertService.success(
                    'Operation completed',  // title
                    'Your changes have been saved', // subtitle
                    { timeout: 3000 } // options
                );
            }
        }
        ```
        
        If you want to change the alert drawer configuration, you can use the `setConfig` method:
        
        ```typescript
        this.alertService.setConfig({
            position: 'top-left',
            showProgressBar: true,
            timeout: 3000,
        });
        ```
        
        You can also use the `patchConfig` method to change only some properties of the alert drawer configuration:
        
        ```typescript
        this.alertService.patchConfig({
            showProgressBar: true,
        });
        ```
    </wcs-tab>
    <wcs-tab header="React">
        You can create a context provider to manage the alert drawer in your React application. This allows you to show alerts from anywhere in your app.

        ```tsx
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
        ```

        Then, you can put the `AlertDrawerProvider` at the root of your application:

        ```tsx
        import React from 'react';
        import { AlertDrawerProvider } from './contexts/AlertContext';

        function App() {
            return (
            <AlertDrawerProvider config={{position: 'top-right', showProgressBar: true, timeout: 5000}}>
                <div className="App">
                </div>
            </AlertDrawerProvider>
            );
        }
        ```

        Finally, you can use the `useAlertDrawer` hook in any component to show alerts:

        ```tsx
        import React from 'react';
        import { useAlertDrawer } from './contexts/AlertContext';

        function ExampleComponent() {
            const { showAlert } = useAlertDrawer();

            const handleClick = () => {
                showAlert({
                    title: 'Operation completed',
                    subtitle: 'Your changes have been saved',
                    intent: 'success',
                });
            };

            return (
            <WcsButton onClick={handleClick}>Show Alert</WcsButton>
            );
        }
        ```
    </wcs-tab>
</wcs-tabs>
