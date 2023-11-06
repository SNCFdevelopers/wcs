import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { WcsAlertDrawerPosition, WcsAlertConfig } from 'wcs-core';

export interface WcsAlertDrawerConfig {
  position: WcsAlertDrawerPosition;
  timeout?: number;
  showProgressBar?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WcsAlertService implements OnDestroy {
  private alertDrawer: HTMLWcsAlertDrawerElement | null = null;
  private currentConfig: WcsAlertDrawerConfig = {
    position: 'top-right'
  };

  private isBrowser: boolean;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnDestroy(): void {
    this.removeAlertDrawer();
  }

  /**
   * Initialize the alert drawer and add it to the DOM
   *
   * @throws Error if the alert drawer is not found in the DOM
   */
  private initializeAlertDrawer(): void {
    if (!this.isBrowser) { return; }

    if (!this.initialized) {
      try {
        // First try to find an existing alert drawer
        this.alertDrawer = document.querySelector('wcs-alert-drawer');

        // Only create a new one if none exists
        if (!this.alertDrawer) {
          if (!window.customElements.get('wcs-alert-drawer')) {
            console.warn('[wcs-alert.service] Web Component "wcs-alert-drawer" not found. Please ensure the component is loaded before using the service.');
            return;
          }

          this.alertDrawer = document.createElement('wcs-alert-drawer');
          document.body.appendChild(this.alertDrawer);
        }

        this.setConfig(this.currentConfig);
        this.initialized = true;
      } catch (error) {
        throw new Error('[wcs-alert.service] Initialization error: ' + error);
      }
    }
  }

  /**
   * Remove the alert drawer from the DOM
   *
   * @throws Error if the alert drawer is not found in the DOM
   */
  private removeAlertDrawer(): void {
    if (this.alertDrawer && this.isBrowser) {
      try {
        document.body.removeChild(this.alertDrawer);
        this.alertDrawer = null;
        this.initialized = false;
      } catch (error) {
        throw new Error('[wcs-alert.service] Removal error: ' + error);
      }
    }
  }

  getConfig(): WcsAlertDrawerConfig {
    return this.currentConfig;
  }

  /**
   * Set the alert drawer configuration
   * @param config The configuration to set, which must be complete and define all properties
   * @example
   * ```typescript
   * const allConfigProperties: WcsAlertDrawerConfig = ...;
   * this.alertService.setConfig(allConfigProperties);
   * ```
   */
  setConfig(config: WcsAlertDrawerConfig): void {
    if (this.alertDrawer) {
      this.currentConfig = config;
      this.alertDrawer.position = this.currentConfig.position;
      this.alertDrawer.showProgressBar = this.currentConfig.showProgressBar;
      this.alertDrawer.timeout = this.currentConfig.timeout;
    }
  }

  /**
   * Patch the current alert drawer configuration with the provided config
   * @param config The partial configuration to patch, which can define any subset of properties
   * @example
   * ```typescript
   * this.alertService.patchConfig({
   *  position: 'bottom-left'
   * });
   * ```
   */
  patchConfig(config: Partial<WcsAlertDrawerConfig>): void {
    this.currentConfig = {...this.currentConfig, ...config};
    if (this.alertDrawer) {
      if (config.position) {
        this.alertDrawer.position = this.currentConfig.position;
      }
      if (config.timeout !== undefined && config.timeout !== null) {
        this.alertDrawer.timeout = this.currentConfig.timeout;
      }
      if (config.showProgressBar !== undefined) {
        this.alertDrawer.showProgressBar = this.currentConfig.showProgressBar;
      }
    }
  }

  /**
   * Show an info alert
   * @param title Title
   * @param subtitle Subtitle
   * @param options Optional alert-specific options
   */
  info(title: string, subtitle: string, options?: Omit<WcsAlertConfig, 'intent' | 'title' | 'subtitle'>): void {
    this.show({
      intent: 'information',
      title,
      subtitle,
      ...options
    });
  }

  /**
   * Show a success alert
   * @param title Title
   * @param subtitle Subtitle
   * @param options Optional alert-specific options
   */
  success(title: string, subtitle: string, options?: Omit<WcsAlertConfig, 'intent' | 'title' | 'subtitle'>): void {
    this.show({
      intent: 'success',
      title,
      subtitle,
      ...options
    });
  }

  /**
   * Show a warning alert
   * @param title Title
   * @param subtitle Subtitle
   * @param options Optional alert-specific options
   */
  warning(title: string, subtitle: string, options?: Omit<WcsAlertConfig, 'intent' | 'title' | 'subtitle'>): void {
    this.show({
      intent: 'warning',
      title,
      subtitle,
      ...options
    });
  }

  /**
   * Show an error alert
   * @param title Title
   * @param subtitle Subtitle
   * @param options Optional alert-specific options
   */
  error(title: string, subtitle: string, options?: Omit<WcsAlertConfig, 'intent' | 'title' | 'subtitle'>): void {
    this.show({
      intent: 'error',
      title,
      subtitle,
      ...options
    });
  }

  /**
   * Clear all alerts
   */
  clear(): void {
    if (this.alertDrawer) {
      this.alertDrawer.innerHTML = '';
    }
  }

  private show(params: WcsAlertConfig): void {
    if (!this.isBrowser) { return; }

    if (!this.initialized) {
      this.initializeAlertDrawer();
    }

    if (this.alertDrawer) {
      if (!window.customElements.get('wcs-alert')) {
        console.warn('[wcs-alert.service] Web Component "wcs-alert" not found. Please ensure the component is loaded before using the service.');
        return;
      }

      this.alertDrawer.show(params);
    }
  }
}
