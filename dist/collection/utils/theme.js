export function createColorClass(color) {
    return {
        [`wcs-background-${color}`]: true,
        [`wcs-color-${color}`]: true
    };
}
