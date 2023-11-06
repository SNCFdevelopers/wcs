export type WcsAlertIntent = 'success' | 'information' | 'error' | 'warning';

/**
 * Interface for the data structure of the alert
 */
export type WcsAlertConfig = {
    title: string;
    subtitle: string;
    intent: WcsAlertIntent;
    showProgressBar?: boolean;
    timeout?: number;
}
