let overlayElement: HTMLElement;

export function getOverlay() {
    if (!overlayElement) {
        createOverlay();
    }
    return overlayElement;
}

function createOverlay() {
    const existent = document.querySelector('.wcs-overlay') as HTMLElement;
    overlayElement = existent
        ? existent
        : document.createElement('div');
    overlayElement.classList.add('wcs-overlay');
    document.body.appendChild(overlayElement);
}

