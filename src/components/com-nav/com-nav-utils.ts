import { getCssRootPropertyValue } from "../../utils/helpers";
import { ComNav } from "./com-nav";
import { ComNavSubmenu } from "../com-nav-submenu/com-nav-submenu";
import { ComNavCategory } from "../com-nav-category/com-nav-category";

/**
 * This function add event handlers on the navigableItems list. The handlers call the function close() on the nodeName.
 *
 * T: type class of the nodeNameToClose param (must have a close function)
 *
 * @param navigableItems items on which focusout event listeners must be added
 * @param nodeNameToClose nodeName of the element we want to close in the event path
 */
export function registerCloseHandlerForFocusOutEventOn<T extends {close: () => any}>(navigableItems: NodeListOf<Element>, nodeNameToClose: string): void {
    navigableItems.forEach(navigableItem => {
        navigableItem.addEventListener("focusout", (evt: FocusEvent) => {
            const relatedTargetElement = evt.relatedTarget as HTMLElement;
            if (!isElementChildOfNavigableItem(navigableItem, relatedTargetElement)) {
                const eventComposedPath = (evt as Event).composedPath();
                if (isEventThrownFromChildOfNodeNameToClose(eventComposedPath, nodeNameToClose)) {
                    (eventComposedPath.filter(eventTargetNodeNameEquals(nodeNameToClose))[0] as unknown as T).close();
                }
            }
        })
    });
}

function isElementChildOfNavigableItem(navigableItem: Element, element: Element) {
    return navigableItem.contains(element);
}

function eventTargetNodeNameEquals(nodeName: string) {
    return x => (x as HTMLElement).nodeName === nodeName;
}

function isEventThrownFromChildOfNodeNameToClose(eventComposedPath: EventTarget[], nodeName: string) {
    return eventComposedPath.map(x => (x as HTMLElement).nodeName).indexOf(nodeName) !== -1;
}

export function comNavDidLoadWithResizeObserver(comNavElement: ComNav | ComNavSubmenu | ComNavCategory): ResizeObserver {
    const smallBreakpoint = getCssRootPropertyValue('--wcs-phone-breakpoint-max-width') || '575px';
    const smallBreakpointValue = parseInt(smallBreakpoint, 10);

    return new ResizeObserver(entry => {
        const cr = entry[0].contentRect;
        const paddingRight = cr.right - cr.width;
        const paddingLeft = cr.left;
        if (cr.width <= smallBreakpointValue - (paddingLeft + paddingRight)) {
            comNavElement.currentActiveSizing = 'mobile';
        } else {
            comNavElement.currentActiveSizing = 'desktop';
        }
    });
}
