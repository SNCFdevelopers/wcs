var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, h, g as getElement, H as Host, c as getContext, d as createEvent } from './chunk-7c5f10e0.js';
var App = /** @class */ (function () {
    function App(hostRef) {
        registerInstance(this, hostRef);
    }
    App.prototype.componentDidLoad = function () {
        var contentSlot = this.el.shadowRoot.querySelector('slot[name="content"]');
        if (contentSlot && contentSlot.assignedElements) {
            var contentEl = contentSlot.assignedElements()[0];
            contentEl.addEventListener('onscroll', function (evt) {
                console.log(evt);
            });
        }
    };
    App.prototype.render = function () {
        return [
            h("slot", { name: "header" }),
            h("slot", { name: "sidebar" }),
            h("slot", { name: "content" })
        ];
    };
    Object.defineProperty(App.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "style", {
        get: function () { return ":host{background-color:#f2f2f2;margin:0;display:grid;grid-template-areas:\"header header\" \"sidebar content\";grid-template-columns:-webkit-min-content auto;grid-template-columns:min-content auto;overflow-y:hidden}::slotted(main){padding:8px;grid-area:content;overflow-y:scroll;height:calc(100vh - 64px)}::slotted(wcs-header){grid-area:header}\@media screen and (max-width:768px){:host{grid-template-areas:\"header\" \"sidebar\" \"content\";grid-template-columns:auto}::slotted(header){position:relative}::slotted(main){overflow-y:visible;height:auto}}"; },
        enumerable: true,
        configurable: true
    });
    return App;
}());
var Badge = /** @class */ (function () {
    function Badge(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Select the badge color.
         * @default 'primary'
         */
        this.color = 'primary';
    }
    Badge.prototype.createColorClass = function (color) {
        var _d;
        return _d = {},
            _d["wcs-background-" + color] = true,
            _d["wcs-color-" + color] = true,
            _d;
    };
    Badge.prototype.hostData = function () {
        return {
            class: Object.assign({}, this.createColorClass(this.color))
        };
    };
    Badge.prototype.__stencil_render = function () {
        return (h("slot", null));
    };
    Badge.prototype.render = function () { return h(Host, this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Badge, "style", {
        get: function () { return ":host{display:inline-block;padding:.313rem 1.5rem;font-size:.875rem;font-weight:500;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.75rem}"; },
        enumerable: true,
        configurable: true
    });
    return Badge;
}());
/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;
/**
 * Stores result from applyPassive to avoid redundant processing to detect
 * passive event listener support.
 */
var supportsPassive_;
function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);
    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    node.remove();
    return hasPseudoVarBug;
}
function supportsCssVariables(windowObj, forceRefresh) {
    if (forceRefresh === void 0) {
        forceRefresh = false;
    }
    var CSS = windowObj.CSS;
    var supportsCssVars = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
        return supportsCssVariables_;
    }
    var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
    if (!supportsFunctionPresent) {
        return false;
    }
    var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
        CSS.supports('color', '#00000000'));
    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
        supportsCssVars = !detectEdgePseudoVarBug(windowObj);
    }
    else {
        supportsCssVars = false;
    }
    if (!forceRefresh) {
        supportsCssVariables_ = supportsCssVars;
    }
    return supportsCssVars;
}
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive(globalObj, forceRefresh) {
    if (globalObj === void 0) {
        globalObj = window;
    }
    if (forceRefresh === void 0) {
        forceRefresh = false;
    }
    if (supportsPassive_ === undefined || forceRefresh) {
        var isSupported_1 = false;
        try {
            globalObj.document.addEventListener('test', function () { return undefined; }, {
                get passive() {
                    isSupported_1 = true;
                    return isSupported_1;
                },
            });
        }
        catch (e) {
        } // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.
        supportsPassive_ = isSupported_1;
    }
    return supportsPassive_ ? { passive: true } : false;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) {
        return { x: 0, y: 0 };
    }
    var x = pageOffset.x, y = pageOffset.y;
    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;
    var normalizedX;
    var normalizedY;
    // Determine touch point relative to the ripple container.
    if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    }
    else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return { x: normalizedX, y: normalizedY };
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = /** @class */ (function () {
    function MDCFoundation(adapter) {
        if (adapter === void 0) {
            adapter = {};
        }
        this.adapter_ = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function () {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
        },
        enumerable: true,
        configurable: true
    });
    MDCFoundation.prototype.init = function () {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function () {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}());
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCComponent = /** @class */ (function () {
    function MDCComponent(root, foundation) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.root_ = root;
        this.initialize.apply(this, __spread(args));
        // Note that we initialize foundation here and not within the constructor's default param so that
        // this.root_ is defined and can be used within the foundation class.
        this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation_.init();
        this.initialSyncWithDOM();
    }
    MDCComponent.attachTo = function (root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new MDCFoundation({}));
    };
    /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
    MDCComponent.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        // Subclasses can override this to do any additional setup work that would be considered part of a
        // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
        // initialized. Any additional arguments besides root and foundation will be passed in here.
    };
    MDCComponent.prototype.getDefaultFoundation = function () {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
            'foundation class');
    };
    MDCComponent.prototype.initialSyncWithDOM = function () {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    };
    MDCComponent.prototype.destroy = function () {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
    };
    MDCComponent.prototype.listen = function (evtType, handler) {
        this.root_.addEventListener(evtType, handler);
    };
    MDCComponent.prototype.unlisten = function (evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
    };
    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
     */
    MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
        if (shouldBubble === void 0) {
            shouldBubble = false;
        }
        var evt;
        if (typeof CustomEvent === 'function') {
            evt = new CustomEvent(evtType, {
                bubbles: shouldBubble,
                detail: evtData,
            });
        }
        else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }
        this.root_.dispatchEvent(evt);
    };
    return MDCComponent;
}());
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function matches(element, selector) {
    var nativeMatches = element.matches
        || element.webkitMatchesSelector
        || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
};
var strings = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
};
var numbers = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300,
};
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = [
    'touchstart', 'pointerdown', 'mousedown', 'keydown',
];
// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend', 'pointerup', 'mouseup', 'contextmenu',
];
// simultaneous nested activations
var activatedTargets = [];
var MDCRippleFoundation = /** @class */ (function (_super) {
    __extends(MDCRippleFoundation, _super);
    function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, __assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;
        _this.activationAnimationHasEnded_ = false;
        _this.activationTimer_ = 0;
        _this.fgDeactivationRemovalTimer_ = 0;
        _this.fgScale_ = '0';
        _this.frame_ = { width: 0, height: 0 };
        _this.initialSize_ = 0;
        _this.layoutFrame_ = 0;
        _this.maxRadius_ = 0;
        _this.unboundedCoords_ = { left: 0, top: 0 };
        _this.activationState_ = _this.defaultActivationState_();
        _this.activationTimerCallback_ = function () {
            _this.activationAnimationHasEnded_ = true;
            _this.runDeactivationUXLogicIfReady_();
        };
        _this.activateHandler_ = function (e) { return _this.activate_(e); };
        _this.deactivateHandler_ = function () { return _this.deactivate_(); };
        _this.focusHandler_ = function () { return _this.handleFocus(); };
        _this.blurHandler_ = function () { return _this.handleBlur(); };
        _this.resizeHandler_ = function () { return _this.layout(); };
        return _this;
    }
    Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function () {
            return numbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClass: function () { return undefined; },
                browserSupportsCssVars: function () { return true; },
                computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                containsEventTarget: function () { return true; },
                deregisterDocumentInteractionHandler: function () { return undefined; },
                deregisterInteractionHandler: function () { return undefined; },
                deregisterResizeHandler: function () { return undefined; },
                getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                isSurfaceActive: function () { return true; },
                isSurfaceDisabled: function () { return true; },
                isUnbounded: function () { return true; },
                registerDocumentInteractionHandler: function () { return undefined; },
                registerInteractionHandler: function () { return undefined; },
                registerResizeHandler: function () { return undefined; },
                removeClass: function () { return undefined; },
                updateCssVariable: function () { return undefined; },
            };
        },
        enumerable: true,
        configurable: true
    });
    MDCRippleFoundation.prototype.init = function () {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple_();
        this.registerRootHandlers_(supportsPressRipple);
        if (supportsPressRipple) {
            var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter_.addClass(ROOT_1);
                if (_this.adapter_.isUnbounded()) {
                    _this.adapter_.addClass(UNBOUNDED_1);
                    // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                    _this.layoutInternal_();
                }
            });
        }
    };
    MDCRippleFoundation.prototype.destroy = function () {
        var _this = this;
        if (this.supportsPressRipple_()) {
            if (this.activationTimer_) {
                clearTimeout(this.activationTimer_);
                this.activationTimer_ = 0;
                this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer_) {
                clearTimeout(this.fgDeactivationRemovalTimer_);
                this.fgDeactivationRemovalTimer_ = 0;
                this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
            }
            var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter_.removeClass(ROOT_2);
                _this.adapter_.removeClass(UNBOUNDED_2);
                _this.removeCssVars_();
            });
        }
        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
    };
    /**
     * @param evt Optional event containing position information.
     */
    MDCRippleFoundation.prototype.activate = function (evt) {
        this.activate_(evt);
    };
    MDCRippleFoundation.prototype.deactivate = function () {
        this.deactivate_();
    };
    MDCRippleFoundation.prototype.layout = function () {
        var _this = this;
        if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
            _this.layoutInternal_();
            _this.layoutFrame_ = 0;
        });
    };
    MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
        if (unbounded) {
            this.adapter_.addClass(UNBOUNDED);
        }
        else {
            this.adapter_.removeClass(UNBOUNDED);
        }
    };
    MDCRippleFoundation.prototype.handleFocus = function () {
        var _this = this;
        requestAnimationFrame(function () {
            return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    MDCRippleFoundation.prototype.handleBlur = function () {
        var _this = this;
        requestAnimationFrame(function () {
            return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     */
    MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
        return this.adapter_.browserSupportsCssVars();
    };
    MDCRippleFoundation.prototype.defaultActivationState_ = function () {
        return {
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false,
        };
    };
    /**
     * supportsPressRipple Passed from init to save a redundant function call
     */
    MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
        var _this = this;
        if (supportsPressRipple) {
            ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
            });
            if (this.adapter_.isUnbounded()) {
                this.adapter_.registerResizeHandler(this.resizeHandler_);
            }
        }
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    };
    MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
        var _this = this;
        if (evt.type === 'keydown') {
            this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        }
        else {
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        }
    };
    MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
        var _this = this;
        ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        if (this.adapter_.isUnbounded()) {
            this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
    };
    MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
        var _this = this;
        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
        });
    };
    MDCRippleFoundation.prototype.removeCssVars_ = function () {
        var _this = this;
        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function (key) {
            if (key.indexOf('VAR_') === 0) {
                _this.adapter_.updateCssVariable(rippleStrings[key], null);
            }
        });
    };
    MDCRippleFoundation.prototype.activate_ = function (evt) {
        var _this = this;
        if (this.adapter_.isSurfaceDisabled()) {
            return;
        }
        var activationState = this.activationState_;
        if (activationState.isActivated) {
            return;
        }
        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
            return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) { return _this.adapter_.containsEventTarget(target); });
        if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState_();
            return;
        }
        if (evt !== undefined) {
            activatedTargets.push(evt.target);
            this.registerDeactivationHandlers_(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
        if (activationState.wasElementMadeActive) {
            this.animateActivation_();
        }
        requestAnimationFrame(function () {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];
            if (!activationState.wasElementMadeActive
                && evt !== undefined
                && (evt.key === ' ' || evt.keyCode === 32)) {
                // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                // active states inconsistently when they're called within event handling code:
                // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                // variable is set within a rAF callback for a submit button interaction (#2241).
                activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                if (activationState.wasElementMadeActive) {
                    _this.animateActivation_();
                }
            }
            if (!activationState.wasElementMadeActive) {
                // Reset activation state immediately if element was not made active.
                _this.activationState_ = _this.defaultActivationState_();
            }
        });
    };
    MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
        return (evt !== undefined && evt.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
    };
    MDCRippleFoundation.prototype.animateActivation_ = function () {
        var _this = this;
        var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal_();
        var translateStart = '';
        var translateEnd = '';
        if (!this.adapter_.isUnbounded()) {
            var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
            translateStart = startPoint.x + "px, " + startPoint.y + "px";
            translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);
        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
        var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
            startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        }
        else {
            startPoint = {
                x: this.frame_.width / 2,
                y: this.frame_.height / 2,
            };
        }
        // Center the element around the start point.
        startPoint = {
            x: startPoint.x - (this.initialSize_ / 2),
            y: startPoint.y - (this.initialSize_ / 2),
        };
        var endPoint = {
            x: (this.frame_.width / 2) - (this.initialSize_ / 2),
            y: (this.frame_.height / 2) - (this.initialSize_ / 2),
        };
        return { startPoint: startPoint, endPoint: endPoint };
    };
    MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
        var _this = this;
        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded_) {
            this.rmBoundedActivationClasses_();
            this.adapter_.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                _this.adapter_.removeClass(FG_DEACTIVATION);
            }, numbers.FG_DEACTIVATION_MS);
        }
    };
    MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
    };
    MDCRippleFoundation.prototype.resetActivationState_ = function () {
        var _this = this;
        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation.prototype.deactivate_ = function () {
        var _this = this;
        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
            return;
        }
        var state = __assign({}, activationState);
        if (activationState.isProgrammatic) {
            requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
            this.resetActivationState_();
        }
        else {
            this.deregisterDeactivationHandlers_();
            requestAnimationFrame(function () {
                _this.activationState_.hasDeactivationUXRun = true;
                _this.animateDeactivation_(state);
                _this.resetActivationState_();
            });
        }
    };
    MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady_();
        }
    };
    MDCRippleFoundation.prototype.layoutInternal_ = function () {
        var _this = this;
        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);
        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function () {
            var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };
        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();
        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
        this.updateLayoutCssVars_();
    };
    MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
        var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
        if (this.adapter_.isUnbounded()) {
            this.unboundedCoords_ = {
                left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
            };
            this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
            this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
        }
    };
    return MDCRippleFoundation;
}(MDCFoundation));
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCRipple = /** @class */ (function (_super) {
    __extends(MDCRipple, _super);
    function MDCRipple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disabled = false;
        return _this;
    }
    MDCRipple.attachTo = function (root, opts) {
        if (opts === void 0) {
            opts = { isUnbounded: undefined };
        }
        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (opts.isUnbounded !== undefined) {
            ripple.unbounded = opts.isUnbounded;
        }
        return ripple;
    };
    MDCRipple.createAdapter = function (instance) {
        return {
            addClass: function (className) { return instance.root_.classList.add(className); },
            browserSupportsCssVars: function () { return supportsCssVariables(window); },
            computeBoundingRect: function () { return instance.root_.getBoundingClientRect(); },
            containsEventTarget: function (target) { return instance.root_.contains(target); },
            deregisterDocumentInteractionHandler: function (evtType, handler) {
                return document.documentElement.removeEventListener(evtType, handler, applyPassive());
            },
            deregisterInteractionHandler: function (evtType, handler) {
                return instance.root_.removeEventListener(evtType, handler, applyPassive());
            },
            deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
            getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); },
            isSurfaceActive: function () { return matches(instance.root_, ':active'); },
            isSurfaceDisabled: function () { return Boolean(instance.disabled); },
            isUnbounded: function () { return Boolean(instance.unbounded); },
            registerDocumentInteractionHandler: function (evtType, handler) {
                return document.documentElement.addEventListener(evtType, handler, applyPassive());
            },
            registerInteractionHandler: function (evtType, handler) {
                return instance.root_.addEventListener(evtType, handler, applyPassive());
            },
            registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
            removeClass: function (className) { return instance.root_.classList.remove(className); },
            updateCssVariable: function (varName, value) { return instance.root_.style.setProperty(varName, value); },
        };
    };
    Object.defineProperty(MDCRipple.prototype, "unbounded", {
        get: function () {
            return Boolean(this.unbounded_);
        },
        set: function (unbounded) {
            this.unbounded_ = Boolean(unbounded);
            this.setUnbounded_();
        },
        enumerable: true,
        configurable: true
    });
    MDCRipple.prototype.activate = function () {
        this.foundation_.activate();
    };
    MDCRipple.prototype.deactivate = function () {
        this.foundation_.deactivate();
    };
    MDCRipple.prototype.layout = function () {
        this.foundation_.layout();
    };
    MDCRipple.prototype.getDefaultFoundation = function () {
        return new MDCRippleFoundation(MDCRipple.createAdapter(this));
    };
    MDCRipple.prototype.initialSyncWithDOM = function () {
        var root = this.root_;
        this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
    };
    /**
     * Closure Compiler throws an access control error when directly accessing a
     * protected or private property inside a getter/setter, like unbounded above.
     * By accessing the protected property inside a method, we solve that problem.
     * That's why this function exists.
     */
    MDCRipple.prototype.setUnbounded_ = function () {
        this.foundation_.setUnbounded(Boolean(this.unbounded_));
    };
    return MDCRipple;
}(MDCComponent));
function hasShadowDom(el) {
    return !!el.shadowRoot && !!el.attachShadow;
}
/**
 * Button component, can also be a link when specifying href.
 */
var Button = /** @class */ (function () {
    function Button(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Specify the button type.
         */
        this.type = 'button';
        /**
         * Specify the button color.
         */
        this.color = 'primary';
        /**
         * Specify wether the button is disabled or not.
         */
        this.disabled = false;
        /**
         * Specify wether the button should have a ripple effect or not.
         */
        this.ripple = false;
        /**
         * This attribute specifies the size of the button.
         * Setting this attribute will change the height and padding of a button.
         */
        this.mode = 'normal';
        this.win = getContext(this, "window");
    }
    Button.prototype.onClick = function (ev) {
        if (this.type !== 'button' && hasShadowDom(this.el)) {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            var form = this.el.closest('form');
            if (form) {
                ev.preventDefault();
                var fakeButton = this.win.document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    };
    Button.prototype.render = function () {
        var TagType = this.href !== undefined ? 'a' : 'button';
        var attrs = this.href !== undefined
            ? { href: this.href, role: 'button' }
            : { type: this.type };
        return (h(TagType, Object.assign({}, attrs, this.generateClasses(), this.disabled === true ? { disabled: true } : null), h("slot", null)));
    };
    Button.prototype.generateClasses = function () {
        return {
            class: Object.assign({ 'wcs-inner-button': true, 'wcs-inner-button-disabled': this.disabled, 'wcs-inner-button-small': this.mode === 'small', 'wcs-inner-button-block': this.mode === 'block', 'wcs-inner-button-icon-only': this.mode === 'icon-only', 'wcs-inner-button-rounded': this.mode === 'round' }, this.createColorClasses(this.color))
        };
    };
    Button.prototype.createColorClasses = function (color) {
        var _d;
        return _d = {},
            _d["wcs-background-" + color + "-hover"] = !this.disabled,
            _d["wcs-color-" + color] = !this.disabled,
            _d;
    };
    Button.prototype.componentDidLoad = function () {
        this.addRippleEffect();
    };
    Button.prototype.addRippleEffect = function () {
        var ripple = new MDCRipple(this.el.shadowRoot.querySelector('.wcs-inner-button'));
        ripple.unbounded = true;
    };
    Object.defineProperty(Button.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}\@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.wcs-inner-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;overflow:hidden;outline:0;text-transform:none;margin:0;cursor:pointer;display:inline-block;font-weight:500;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;padding:.59375rem 1.875rem;font-size:1rem;line-height:1.5;border-radius:var(--wcs-border-radius);-webkit-transition:color 175ms ease-in-out,background-color 175ms ease-in-out,-webkit-box-shadow 175ms cubic-bezier(.4,0,.2,1);transition:color 175ms ease-in-out,background-color 175ms ease-in-out,-webkit-box-shadow 175ms cubic-bezier(.4,0,.2,1);transition:color 175ms ease-in-out,background-color 175ms ease-in-out,box-shadow 175ms cubic-bezier(.4,0,.2,1);transition:color 175ms ease-in-out,background-color 175ms ease-in-out,box-shadow 175ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow 175ms cubic-bezier(.4,0,.2,1)}.wcs-inner-button:after,.wcs-inner-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.wcs-inner-button:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.wcs-inner-button.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.wcs-inner-button.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.wcs-inner-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.wcs-inner-button.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.wcs-inner-button.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.wcs-inner-button:after,.wcs-inner-button:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.wcs-inner-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.wcs-inner-button:not(.wcs-color-white,.wcs-color-light):after,.wcs-inner-button:not(.wcs-color-white,.wcs-color-light):before{background-color:#fff}.wcs-inner-button.wcs-color-light:after,.wcs-inner-button.wcs-color-light:before,.wcs-inner-button.wcs-color-white:after,.wcs-inner-button.wcs-color-white:before{background-color:#333}.wcs-inner-button:hover:before{opacity:.1}.wcs-inner-button.mdc-ripple-upgraded--background-focused:before,.wcs-inner-button:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.2}.wcs-inner-button:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.wcs-inner-button:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.3}.wcs-inner-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.3}.wcs-inner-button:focus{-webkit-box-shadow:0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12),0 1px 3px 0 rgba(0,0,0,.2);box-shadow:0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12),0 1px 3px 0 rgba(0,0,0,.2)}.wcs-inner-button:hover{-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2)}.wcs-inner-button.wcs-inner-button-small{font-weight:500;font-size:1rem;line-height:1.5;padding:.125rem 1.25rem;border-radius:var(--wcs-border-radius)}.wcs-inner-button.wcs-inner-button-block{display:block;width:100%}.wcs-inner-button.wcs-inner-button-icon-only{min-width:3.125rem;min-height:2.8125rem}.wcs-inner-button.wcs-inner-button-icon-only,.wcs-inner-button.wcs-inner-button-rounded{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:0}.wcs-inner-button.wcs-inner-button-rounded{width:2.5rem;height:2.5rem;border-radius:50%}.wcs-inner-button.wcs-inner-button-disabled{color:#b9b9b9;background-color:#f2f2f2;border-color:#f2f2f2;opacity:1;cursor:default;pointer-events:none}a{text-decoration:none}a::-moz-focus-inner,button::-moz-focus-inner{border:0}"; },
        enumerable: true,
        configurable: true
    });
    return Button;
}());
var Card = /** @class */ (function () {
    function Card(hostRef) {
        registerInstance(this, hostRef);
    }
    Card.prototype.render = function () {
        return (h("slot", null));
    };
    Object.defineProperty(Card, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}:host{-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border-radius:var(--wcs-border-radius)}"; },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
var CardBody = /** @class */ (function () {
    function CardBody(hostRef) {
        registerInstance(this, hostRef);
    }
    CardBody.prototype.render = function () {
        return (h("slot", null));
    };
    Object.defineProperty(CardBody, "style", {
        get: function () { return ":host{-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--wcs-padding)}"; },
        enumerable: true,
        configurable: true
    });
    return CardBody;
}());
var Checkbox = /** @class */ (function () {
    function Checkbox(hostRef) {
        registerInstance(this, hostRef);
        this.checkboxId = "wcs-checkbox-" + checkboxIds++;
        this.name = this.checkboxId;
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
        this.wcsChange = createEvent(this, "wcsChange", 7);
    }
    Checkbox.prototype.handleChange = function (event) {
        this.indeterminate = false;
        this.checked = event.path[0].checked;
        this.wcsChange.emit({
            checked: this.checked,
            value: this.value
        });
    };
    Checkbox.prototype.render = function () {
        var _this_1 = this;
        return (h("label", { htmlFor: this.name, class: "container" }, h("input", { onChange: function (evt) { return _this_1.handleChange(evt); }, checked: this.checked, class: "wcs-checkbox", type: "checkbox", name: this.name, id: this.name }), h("span", { class: 'checkmark ' + (this.indeterminate ? 'indeterminate' : '') }), h("span", { class: "text" }, h("slot", null))));
    };
    Object.defineProperty(Checkbox.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Checkbox, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}.container{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.container input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.container:hover .checkmark{border-color:#0088ce}.container:hover .text{color:#0088ce}.checkmark{width:1.125rem;height:1.125rem;border:2px solid #b9b9b9;border-radius:3px}.indeterminate{background:#0088ce;border-color:#0088ce}.container input:checked~.checkmark{background-color:#0088ce;border-color:#0088ce}.checkmark:after{content:\"\";position:absolute;display:none}.container input:checked~.checkmark:after{display:block}.container .checkmark:after{left:7px;width:5px;top:3px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.container input:checked~.text{color:#0088ce}.text{color:#747678;margin-left:6px;font-weight:500;line-height:1.375}"; },
        enumerable: true,
        configurable: true
    });
    return Checkbox;
}());
var checkboxIds = 0;
var Header = /** @class */ (function () {
    function Header(hostRef) {
        registerInstance(this, hostRef);
    }
    Header.prototype.hostData = function () {
        return {
            'slot': 'header'
        };
    };
    Header.prototype.__stencil_render = function () {
        return (h("header", null, h("slot", { name: "logo" }), h("slot", { name: "title" })));
    };
    Header.prototype.render = function () { return h(Host, this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Header, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}header{-webkit-box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background:#333;padding:8px;height:calc(64px - 16px);position:-webkit-sticky;position:sticky;top:0;z-index:1}::slotted(img){width:70px;height:36.8px;margin-right:16px}::slotted(h1){color:#fff;margin:0;font-weight:500;font-size:1.5rem}"; },
        enumerable: true,
        configurable: true
    });
    return Header;
}());
var Icon = /** @class */ (function () {
    function Icon(hostRef) {
        registerInstance(this, hostRef);
    }
    Icon.prototype.render = function () {
        var _d;
        var cssClass = {
            class: (_d = {},
                _d["icons-" + this.icon] = true,
                _d["icons-size-" + this.size] = true,
                _d)
        };
        return (h("i", Object.assign({}, cssClass)));
    };
    return Icon;
}());
/**
 *
 */
var Input = /** @class */ (function () {
    function Input(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = "ion-input-" + inputIds++;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        this.background = 'normal';
        this.value = '';
        /**
         * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
         */
        this.autocapitalize = 'off';
        /**
         * Indicates whether the value of the control can be automatically completed by the browser.
         */
        this.autocomplete = 'off';
        /**
         * Whether auto correction should be enabled when the user is entering/editing the text value.
         */
        this.autocorrect = 'off';
        /**
         * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
         */
        this.autofocus = false;
        /**
         * If `true`, the user cannot interact with the input.
         */
        this.disabled = false;
        /**
         * If `true`, the user must fill in a value before submitting a form.
         */
        this.required = false;
        /**
         * If `true`, the element will have its spelling and grammar checked.
         */
        this.spellcheck = false;
        /**
         * The type of control to display. The default type is text.
         */
        this.type = 'text';
        this.wcsChange = createEvent(this, "wcsChange", 7);
    }
    Input.prototype.getValue = function () {
        return this.value || '';
    };
    Input.prototype.valueChanged = function () {
        this.wcsChange.emit({ value: this.value });
        console.log(this.value);
    };
    Input.prototype.onInput = function (ev) {
        var input = ev.target;
        if (input) {
            this.value = input.value || '';
        }
    };
    Input.prototype.disabledChanged = function () {
        // TODO: implement
    };
    Input.prototype.render = function () {
        var _this_1 = this;
        var labelId = this.inputId + '-lbl';
        var value = this.getValue();
        return (h("input", { "aria-labelledby": labelId, name: this.name, class: this.background, value: value, onInput: this.onInput, ref: function (input) { return _this_1.nativeInput = input; }, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, pattern: this.pattern, required: this.required, spellCheck: this.spellcheck, step: this.step, size: this.size, type: this.type }));
    };
    /**
     * Sets focus on the specified `wcs-input`. Use this method instead of the global
     * `input.focus()`.
     */
    Input.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                if (this.nativeInput) {
                    this.nativeInput.focus();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Returns the native `<input>` element used under the hood.
     */
    Input.prototype.getInputElement = function () {
        // tslint:disable-next-line:no-non-null-assertion
        return Promise.resolve(this.nativeInput);
    };
    Object.defineProperty(Input.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "watchers", {
        get: function () {
            return {
                "value": ["valueChanged"],
                "disabled": ["disabledChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Input, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}input{display:block;padding:.65625rem 1.25rem;font-size:1rem;line-height:1.5;color:#0088ce;background-color:#f2f2f2;background-clip:padding-box;border:1px solid #f2f2f2;border-radius:.4375rem}input:focus{outline:0;border:1px solid #0088ce}.white{background-color:#fff}"; },
        enumerable: true,
        configurable: true
    });
    return Input;
}());
var inputIds = 0;
/**
 * Component displaying progress as a bar.
 */
var ProgressBar = /** @class */ (function () {
    function ProgressBar(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Whether the component display the small version
         */
        this.small = false;
        /**
         * Whether it displays a label indicating the percentage of progress above the bar.
         */
        this.showLabel = false;
        /**
         * The actual value of the progress.
         * Ranging from 0 to 100.
         */
        this.value = 0;
    }
    ProgressBar.prototype.render = function () {
        var style = {
            width: this.value + '%'
        };
        return (h("div", { class: this.rootClasses() }, h("div", { class: "progress-bar", style: style }, this.showLabel &&
            h("span", { class: "progress-label" }, this.value, h("sup", null, "%")))));
    };
    ProgressBar.prototype.rootClasses = function () {
        var classes = 'progress';
        if (this.small)
            classes += ' small';
        if (this.showLabel)
            classes += ' has-label';
        // FIXME: Temporary fix so the label doesn't appear before the bar.
        if (this.value === 0)
            classes += ' value-zero';
        return classes;
    };
    Object.defineProperty(ProgressBar, "style", {
        get: function () { return ".progress{display:-ms-flexbox;display:flex;height:.625rem;font-size:.75rem;color:#4d4f53;background-color:#fff;background-image:-webkit-gradient(linear,left top,right top,color-stop(50%,#e1ded9),color-stop(50%,transparent));background-image:linear-gradient(90deg,#e1ded9 50%,transparent 0);background-size:.25rem .625rem;border-radius:.3125rem}.progress.has-label{margin-top:2.375rem}.progress.small{height:.3125rem;overflow:hidden;background-color:#fff;background-image:none;background-size:auto;border-radius:.15625rem}.progress.value-zero>.progress-bar>.progress-label{right:unset}.progress-bar{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;color:#4d4f53;text-align:center;background-color:#0088ce;border-radius:.3125rem;-webkit-transition:width .375s ease-out;transition:width .375s ease-out}.progress-label{position:absolute;right:0;bottom:calc(100% + .5rem);font-size:1.5rem;font-weight:500}.progress-label sup{font-size:.875rem;top:-.5em;position:relative;line-height:0;vertical-align:baseline}"; },
        enumerable: true,
        configurable: true
    });
    return ProgressBar;
}());
var ProgressRadial = /** @class */ (function () {
    function ProgressRadial(hostRef) {
        registerInstance(this, hostRef);
        this.size = 120;
        this.showLabel = false;
        this.value = 0;
    }
    ProgressRadial.prototype.render = function () {
        var _d = { size: this.size, halfSize: this.size / 2 }, size = _d.size, halfSize = _d.halfSize;
        return (h("div", { class: "progress-circle", "data-component": "radial-progress" }, h("svg", { class: "progress-circle-figure", "data-role": "figure", width: this.size, height: this.size, viewBox: "0 0 " + size + " " + size, style: this.getSvgStyle() }, h("circle", { class: "progress-circle-meter", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" }), h("circle", { class: "progress-circle-value", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" })), this.showLabel &&
            h("div", { class: "progress-circle-label", "data-role": "label" }, h("span", null, h("span", { "data-role": "labelvalue" }, this.value), h("sup", null, "%"))), h("input", { "data-role": "control", class: "sr-only", type: "range", value: this.value })));
    };
    ProgressRadial.prototype.getSvgStyle = function () {
        return {
            'stroke-dasharray': '339.292',
            'stroke-dashoffset': "" + (339.292 - (this.value / 100) * 339.292)
        };
    };
    Object.defineProperty(ProgressRadial, "style", {
        get: function () { return ".progress-circle{position:relative;display:inline-block;width:7.5rem;height:7.5rem;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3c?xml version=\'1.0\' encoding=\'utf-8\'?%3e%3csvg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 120 120\' style=\'enable-background:new 0 0 120 120;\' xml:space=\'preserve\'%3e%3cstyle type=\'text/css\'%3e .st0%7bfill:%23D7D7D7;%7d %3c/style%3e%3cg%3e%3crect x=\'59\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'55.2\' y=\'0.1\' transform=\'matrix(0.9976 -6.975647e-02 6.975647e-02 0.9976 -0.2907 3.9376)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'51.5\' y=\'0.5\' transform=\'matrix(0.9903 -0.1392 0.1392 0.9903 -0.3974 7.368)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'47.8\' y=\'1.2\' transform=\'matrix(0.9781 -0.2079 0.2079 0.9781 -0.427 10.2973)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'44.1\' y=\'2.1\' transform=\'matrix(0.9613 -0.2756 0.2756 0.9613 -0.4827 12.749)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'40.5\' y=\'3.3\' transform=\'matrix(0.9397 -0.342 0.342 0.9397 -0.6613 14.7626)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'37\' y=\'4.7\' transform=\'matrix(0.9135 -0.4067 0.4067 0.9135 -1.0509 16.3931)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'33.6\' y=\'6.3\' transform=\'matrix(0.8829 -0.4695 0.4695 0.8829 -1.7286 17.7087)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'30.4\' y=\'8.2\' transform=\'matrix(0.848 -0.5299 0.5299 0.848 -2.7588 18.7897)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'27.3\' y=\'10.3\' transform=\'matrix(0.809 -0.5878 0.5878 0.809 -4.1915 19.7261)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'24.3\' y=\'12.6\' transform=\'matrix(0.766 -0.6428 0.6428 0.766 -6.0608 20.6152)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'21.5\' y=\'15.2\' transform=\'matrix(0.7193 -0.6947 0.6947 0.7193 -8.3843 21.5593)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'18.9\' y=\'17.9\' transform=\'matrix(0.6691 -0.7431 0.7431 0.6691 -11.1622 22.6633)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'16.4\' y=\'20.8\' transform=\'matrix(0.6157 -0.788 0.788 0.6157 -14.3769 24.0315)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'14.2\' y=\'23.8\' transform=\'matrix(0.5592 -0.829 0.829 0.5592 -17.9939 25.7655)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'12.2\' y=\'27\' transform=\'matrix(0.5 -0.866 0.866 0.5 -21.9615 27.9615)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'10.5\' y=\'30.3\' transform=\'matrix(0.4384 -0.8988 0.8988 0.4384 -26.2122 30.7076)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'8.9\' y=\'33.8\' transform=\'matrix(0.3746 -0.9272 0.9272 0.3746 -30.6638 34.0815)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'7.6\' y=\'37.3\' transform=\'matrix(0.309 -0.9511 0.9511 0.309 -35.2211 38.1485)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'6.6\' y=\'40.9\' transform=\'matrix(0.2419 -0.9703 0.9703 0.2419 -39.7776 42.9595)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5.8\' y=\'44.6\' transform=\'matrix(0.1736 -0.9848 0.9848 0.1736 -44.2179 48.5492)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5.3\' y=\'48.4\' transform=\'matrix(0.1045 -0.9945 0.9945 0.1045 -48.42 54.9351)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5\' y=\'52.1\' transform=\'matrix(3.489950e-02 -0.9994 0.9994 3.489950e-02 -52.2577 62.1164)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'0\' y=\'60.9\' transform=\'matrix(0.9994 -3.489950e-02 3.489950e-02 0.9994 -2.1561 0.2482)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'0.3\' y=\'64.6\' transform=\'matrix(0.9945 -0.1045 0.1045 0.9945 -6.8272 1.0177)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'0.8\' y=\'68.4\' transform=\'matrix(0.9848 -0.1736 0.1736 0.9848 -11.9436 2.2383)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'1.6\' y=\'72.1\' transform=\'matrix(0.9703 -0.2419 0.2419 0.9703 -17.4499 4.0099)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'2.6\' y=\'75.7\' transform=\'matrix(0.9511 -0.309 0.309 0.9511 -23.2745 6.4241)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'3.9\' y=\'79.2\' transform=\'matrix(0.9272 -0.3746 0.3746 0.9272 -29.331 9.5626)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5.5\' y=\'82.7\' transform=\'matrix(0.8988 -0.4384 0.4384 0.8988 -35.5191 13.4941)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'7.2\' y=\'86\' transform=\'matrix(0.866 -0.5 0.5 0.866 -41.7269 18.2731)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'9.2\' y=\'89.2\' transform=\'matrix(0.829 -0.5592 0.5592 0.829 -47.8331 23.9378)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'11.4\' y=\'92.2\' transform=\'matrix(0.788 -0.6157 0.6157 0.788 -53.7091 30.5088)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'13.9\' y=\'95.1\' transform=\'matrix(0.7431 -0.6691 0.6691 0.7431 -59.2218 37.988)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'16.5\' y=\'97.8\' transform=\'matrix(0.6947 -0.7193 0.7193 0.6947 -64.236 46.3581)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'19.3\' y=\'100.4\' transform=\'matrix(0.6428 -0.766 0.766 0.6428 -68.6175 55.5822)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'22.3\' y=\'102.7\' transform=\'matrix(0.5878 -0.809 0.809 0.5878 -72.2355 65.6038)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'25.4\' y=\'104.8\' transform=\'matrix(0.5299 -0.848 0.848 0.5299 -74.9657 76.3475)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'28.6\' y=\'106.7\' transform=\'matrix(0.4695 -0.8829 0.8829 0.4695 -76.693 87.7197)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'32\' y=\'108.3\' transform=\'matrix(0.4067 -0.9135 0.9135 0.4067 -77.3138 99.6102)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'35.5\' y=\'109.7\' transform=\'matrix(0.342 -0.9397 0.9397 0.342 -76.7383 111.8932)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'39.1\' y=\'110.9\' transform=\'matrix(0.2756 -0.9613 0.9613 0.2756 -74.893 124.43)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'42.8\' y=\'111.8\' transform=\'matrix(0.2079 -0.9781 0.9781 0.2079 -71.7222 137.0703)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'46.5\' y=\'112.5\' transform=\'matrix(0.1392 -0.9903 0.9903 0.1392 -67.1899 149.6558)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'50.2\' y=\'112.9\' transform=\'matrix(6.975647e-02 -0.9976 0.9976 6.975647e-02 -61.2806 162.0216)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'59\' y=\'108\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'62.8\' y=\'107.9\' transform=\'matrix(0.9976 -6.975647e-02 6.975647e-02 0.9976 -7.7877 4.7255)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'66.5\' y=\'107.5\' transform=\'matrix(0.9903 -0.1392 0.1392 0.9903 -15.1355 10.5006)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'70.2\' y=\'106.8\' transform=\'matrix(0.9781 -0.2079 0.2079 0.9781 -21.9001 17.2744)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'73.9\' y=\'105.9\' transform=\'matrix(0.9613 -0.2756 0.2756 0.9613 -27.9452 24.9761)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'77.5\' y=\'104.7\' transform=\'matrix(0.9397 -0.342 0.342 0.9397 -33.1442 33.5167)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'81\' y=\'103.3\' transform=\'matrix(0.9135 -0.4067 0.4067 0.9135 -37.383 42.7899)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'84.4\' y=\'101.7\' transform=\'matrix(0.8829 -0.4695 0.4695 0.8829 -40.5617 52.6742)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'87.6\' y=\'99.8\' transform=\'matrix(0.848 -0.5299 0.5299 0.848 -42.5973 63.0348)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'90.7\' y=\'97.7\' transform=\'matrix(0.809 -0.5878 0.5878 0.809 -43.4248 73.7261)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'93.7\' y=\'95.4\' transform=\'matrix(0.766 -0.6428 0.6428 0.766 -42.999 84.594)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'96.5\' y=\'92.8\' transform=\'matrix(0.7193 -0.6947 0.6947 0.7193 -41.2954 95.4789)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'99.1\' y=\'90.1\' transform=\'matrix(0.6691 -0.7431 0.7431 0.6691 -38.3109 106.2184)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'101.6\' y=\'87.2\' transform=\'matrix(0.6157 -0.788 0.788 0.6157 -34.0637 116.6505)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'103.8\' y=\'84.2\' transform=\'matrix(0.5592 -0.829 0.829 0.5592 -28.5937 126.6159)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'105.8\' y=\'81\' transform=\'matrix(0.5 -0.866 0.866 0.5 -21.9615 135.9615)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'107.5\' y=\'77.7\' transform=\'matrix(0.4384 -0.8988 0.8988 0.4384 -14.2476 144.5431)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'109.1\' y=\'74.2\' transform=\'matrix(0.3746 -0.9272 0.9272 0.3746 -5.5511 152.2277)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'110.4\' y=\'70.7\' transform=\'matrix(0.309 -0.9511 0.9511 0.309 4.0122 158.8962)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'111.4\' y=\'67.1\' transform=\'matrix(0.2419 -0.9703 0.9703 0.2419 14.3114 164.4454)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'112.2\' y=\'63.4\' transform=\'matrix(0.1736 -0.9848 0.9848 0.1736 25.2032 168.79)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'112.7\' y=\'59.6\' transform=\'matrix(0.1045 -0.9945 0.9945 0.1045 36.5339 171.8641)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'113\' y=\'55.9\' transform=\'matrix(3.489950e-02 -0.9994 0.9994 3.489950e-02 48.1428 173.6225)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'108\' y=\'57.1\' transform=\'matrix(0.9994 -3.489950e-02 3.489950e-02 0.9994 -1.9588 4.0128)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'107.7\' y=\'53.4\' transform=\'matrix(0.9945 -0.1045 0.1045 0.9945 -5.0588 12.1831)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'107.2\' y=\'49.6\' transform=\'matrix(0.9848 -0.1736 0.1736 0.9848 -7.0711 20.4225)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'106.4\' y=\'45.9\' transform=\'matrix(0.9703 -0.2419 0.2419 0.9703 -8.0163 28.5853)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'105.4\' y=\'42.3\' transform=\'matrix(0.9511 -0.309 0.309 0.9511 -7.9343 36.5311)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'104.1\' y=\'38.8\' transform=\'matrix(0.9272 -0.3746 0.3746 0.9272 -6.8838 44.1282)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'102.5\' y=\'35.3\' transform=\'matrix(0.8988 -0.4384 0.4384 0.8988 -4.9408 51.2552)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'100.8\' y=\'32\' transform=\'matrix(0.866 -0.5 0.5 0.866 -2.1962 57.8038)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'98.8\' y=\'28.8\' transform=\'matrix(0.829 -0.5592 0.5592 0.829 1.2454 63.6808)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'96.6\' y=\'25.8\' transform=\'matrix(0.788 -0.6157 0.6157 0.788 5.2685 68.8093)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'94.1\' y=\'22.9\' transform=\'matrix(0.7431 -0.6691 0.6691 0.7431 9.7488 73.1303)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'91.5\' y=\'20.2\' transform=\'matrix(0.6947 -0.7193 0.7193 0.6947 14.5562 76.6036)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'88.7\' y=\'17.6\' transform=\'matrix(0.6428 -0.766 0.766 0.6428 19.5576 79.2086)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'85.7\' y=\'15.3\' transform=\'matrix(0.5878 -0.809 0.809 0.5878 24.6192 80.944)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'82.6\' y=\'13.2\' transform=\'matrix(0.5299 -0.848 0.848 0.5299 29.6096 81.828)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'79.4\' y=\'11.3\' transform=\'matrix(0.4695 -0.8829 0.8829 0.4695 34.4027 81.8974)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'76\' y=\'9.7\' transform=\'matrix(0.4067 -0.9135 0.9135 0.4067 38.8799 81.2069)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'72.5\' y=\'8.3\' transform=\'matrix(0.342 -0.9397 0.9397 0.342 42.9327 79.8275)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'68.9\' y=\'7.1\' transform=\'matrix(0.2756 -0.9613 0.9613 0.2756 46.4651 77.845)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'65.2\' y=\'6.2\' transform=\'matrix(0.2079 -0.9781 0.9781 0.2079 49.3951 75.358)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'61.5\' y=\'5.5\' transform=\'matrix(0.1392 -0.9903 0.9903 0.1392 51.657 72.4756)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'57.8\' y=\'5.1\' transform=\'matrix(6.975647e-02 -0.9976 0.9976 6.975647e-02 53.2021 69.3153)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3c/svg%3e\")}.progress-circle-figure{-webkit-transform:rotate(-90deg);transform:rotate(-90deg);-webkit-transition:stroke-dashoffset .375s ease-out;transition:stroke-dashoffset .375s ease-out}.sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;-webkit-clip-path:inset(50%);clip-path:inset(50%);border:0}.progress-circle-label{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;font-size:1.5rem;font-weight:500}.progress-circle-label sup{font-size:.875rem;top:-.5em;position:relative;line-height:0;vertical-align:baseline}.progress-circle-meter{stroke:#fff}.progress-circle-value{stroke:#0088ce;stroke-linecap:round}.progress-circle-meter,.progress-circle-value{fill:none}"; },
        enumerable: true,
        configurable: true
    });
    return ProgressRadial;
}());
var SelectArrow = function (_d) {
    var up = _d.up;
    return (h("svg", { style: { marginLeft: 'auto' }, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" }, h("style", { type: "text/css" }, "\n            .arrow-group {\n                transform-origin: 50% 50%;\n                transition: transform 175ms ease-in-out;\n            }\n            .up {\n                transform: scaleY(1);\n            }\n            .down {\n                transform: scaleY(-1);\n            }\n        "), h("g", { fill: "none", class: (up ? 'up' : 'down') + ' arrow-group' }, h("path", { class: "arrow", fill: "black", d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }), h("path", { d: "M0 0h24v24H0z", fill: "none" }))));
};
/**
 * Select component, use in conjuction with wcs-select-option.
 *
 * @example ```hmtl
 *  <wcs-select>
 *      <wcs-select-option value="1">One</wcs-select-option>
 *  </wcs-select>```
 * @todo Complete keyboard navigation.
 */
var Select = /** @class */ (function () {
    function Select(hostRef) {
        var _this_1 = this;
        registerInstance(this, hostRef);
        /** Wether the select is expanded */
        this.expanded = false;
        /** Wether the component is fully loaded in the DOM. */
        this.hasLoaded = false;
        /** If `true`, the user cannot interact with the select. */
        this.disabled = false;
        // XXX: We use fat arrow to have a reference to the function and
        // being able to unregister it later on.
        this.handleExpandedKeyEvents = function (keyEvent) {
            if (keyEvent.code === 'Escape') {
                _this_1.unExpand();
            }
            else if (keyEvent.code === 'Tab') {
                _this_1.unExpand();
                // XXX: so we preserve default select behavior, that is:
                // When expanded, pressing tab only unexpand and does not blur
                keyEvent.preventDefault();
            }
            else if (keyEvent.code === 'ArrowDown') {
                keyEvent.preventDefault();
                // Select next value
            }
            else if (keyEvent.code === 'ArrowUp') {
                // Select previous value
                keyEvent.preventDefault();
            }
        };
        this.focus = function () {
            _this_1.wrapperEl.focus();
            _this_1.wcsFocus.emit();
            _this_1.wrapperEl.addEventListener('keydown', _this_1.handleFocusedKeyEvents);
        };
        this.handleFocusedKeyEvents = function (keyEvent) {
            if (keyEvent.code === 'Escape') {
                _this_1.blur();
            }
            else if (keyEvent.code === 'Space') {
                _this_1.expand();
                // Focus on selected or first value.
                // XXX: so the page doesn't scroll down.
                keyEvent.preventDefault();
                _this_1.wrapperEl.removeEventListener('keydown', _this_1.handleFocusedKeyEvents);
            }
        };
        this.blur = function () {
            _this_1.wrapperEl.blur();
            _this_1.wcsBlur.emit();
            _this_1.wrapperEl.removeEventListener('keydown', _this_1.handleFocusedKeyEvents);
        };
        this.wcsChange = createEvent(this, "wcsChange", 7);
        this.wcsFocus = createEvent(this, "wcsFocus", 7);
        this.wcsBlur = createEvent(this, "wcsBlur", 7);
        this.window = getContext(this, "window");
    }
    Select.prototype.componentDidLoad = function () {
        var _this_1 = this;
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        this.wrapperEl = this.el.shadowRoot.querySelector('.wcs-select-wrapper');
        if (this.optionsEl.querySelector('slot') === null) {
            this.el.querySelectorAll('wcs-select-option')
                .forEach(function (option) {
                _this_1.el.removeChild(option);
                _this_1.optionsEl.appendChild(option);
            });
        }
        this.expandOnClick();
        this.addRippleEffect();
        this.wrapperEl.addEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
        this.hasLoaded = true;
    };
    Select.prototype.componentDidUnload = function () {
        // XXX: to be sure we have no dangling listeners.
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
        this.wrapperEl.removeEventListener('focus', this.focus);
        this.wrapperEl.addEventListener('blur', this.blur);
    };
    Select.prototype.expandOnClick = function () {
        var _this_1 = this;
        this.el.addEventListener('mousedown', function () {
            if (!_this_1.disabled) {
                if (_this_1.expanded) {
                    _this_1.unExpand();
                }
                else {
                    _this_1.expand();
                }
            }
        });
    };
    Select.prototype.expand = function () {
        this.window.addEventListener('keydown', this.handleExpandedKeyEvents);
        // TODO: add focus on options and focus the first.
        this.expanded = true;
    };
    Select.prototype.unExpand = function () {
        this.expanded = false;
        this.window.removeEventListener('keydown', this.handleExpandedKeyEvents);
    };
    Select.prototype.addRippleEffect = function () {
        // XXX: Unwrapped dependency over MDCRipple...
        var ripple = new MDCRipple(this.contentEl);
        ripple.unbounded = true;
    };
    Select.prototype.onWindowClickEvent = function (event) {
        if (this.expanded
            && (event.target !== this.el
                && !(event.target instanceof Node && this.el.contains(event.target)))) {
            this.unExpand();
        }
    };
    Select.prototype.selectedOptionChanged = function (event) {
        this.value = event.detail.value;
        this.displayText = event.detail.displayText;
        this.wcsChange.emit({ value: event.detail.value });
    };
    Select.prototype.wrapperClasses = function () {
        return (this.expanded ? 'expanded ' : '')
            + (this.hasValue ? ' has-value ' : '')
            + (this.disabled ? ' disabled ' : '')
            + 'wcs-select-wrapper';
    };
    Object.defineProperty(Select.prototype, "hasValue", {
        get: function () {
            return this.displayText !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.updateStyles = function () {
        // Make the options container width the same width as everything.
        var padding = 1.25; // XXX: This doesn't use the css variable.
        var borderSize = 1;
        this.optionsEl.setAttribute('style', "width: calc(" + Math.ceil(this.el.getBoundingClientRect().width) + "px - " + 2 * padding + "rem - " + 2 * borderSize + "px);");
        this.setMarginTopOnNotFirstOption();
    };
    Select.prototype.focusedAttributes = function () {
        return !this.disabled ? { tabIndex: 0 } : {};
    };
    // XXX: Investigate if there is no way to do it with pure CSS.
    // It poses problem due to slot not allowing deep styling.
    Select.prototype.setMarginTopOnNotFirstOption = function () {
        var slot = this.optionsEl.querySelector('slot');
        var options;
        if (slot && slot.assignedElements) {
            options = this.optionsEl.querySelector('slot').assignedElements();
        }
        else {
            options = this.optionsEl.querySelectorAll('wcs-select-option');
        }
        options.forEach(function (opt, key) {
            if (key !== 0) {
                opt.setAttribute('style', "padding-top: 0.875rem;");
            }
        });
    };
    Select.prototype.render = function () {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (h("div", Object.assign({ class: this.wrapperClasses() }, this.focusedAttributes()), h("div", { class: "wcs-select-content" }, h("label", { class: "wcs-select-text" }, this.hasValue
            ? this.displayText
            : this.placeholder), h(SelectArrow, { up: this.expanded })), h("div", { class: "wcs-select-options" }, h("slot", { name: "wcs-select-option" }))));
    };
    Object.defineProperty(Select.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}\@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.wcs-select-text{padding:.65625rem 1.25rem;font-weight:500;cursor:pointer;color:#747678;-webkit-transition:color 175ms ease-in-out;transition:color 175ms ease-in-out}.wcs-select-content{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding-right:var(--wcs-text-padding);background-color:#f2f2f2;border-radius:var(--wcs-border-radius);border:1px solid transparent;font-size:1rem;line-height:1.5;cursor:pointer}.wcs-select-content:after,.wcs-select-content:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.wcs-select-content:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.wcs-select-content.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.wcs-select-content.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.wcs-select-content.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.wcs-select-content.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.wcs-select-content.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.wcs-select-content:after,.wcs-select-content:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.wcs-select-content.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.wcs-select-content:after,.wcs-select-content:before{background-color:#999}.wcs-select-content:hover:before{opacity:.1}.wcs-select-content.mdc-ripple-upgraded--background-focused:before,.wcs-select-content:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.2}.wcs-select-content:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.wcs-select-content:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.3}.wcs-select-content.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.3}.wcs-select-content:hover{border:1px solid #d7d7d7}.wcs-select-options{display:none;position:absolute;z-index:1;padding:var(--wcs-padding);margin:0;max-height:22.5rem;overflow-y:auto;background-color:#fff;color:#747678;border-left:1px solid #d7d7d7;border-right:1px solid #d7d7d7;border-bottom:1px solid #d7d7d7;border-bottom-right-radius:var(--wcs-border-radius);border-bottom-left-radius:var(--wcs-border-radius)}.expanded .wcs-select-options{display:block}.expanded .wcs-select-content{border-top:1px solid #d7d7d7;border-right:1px solid #d7d7d7;border-left:1px solid #d7d7d7;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom:1px solid transparent}.wcs-select-wrapper{position:relative;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wcs-select-wrapper:not(.expanded):focus .wcs-select-content{border:1px solid #0088ce}.has-value .wcs-select-text{color:#0088ce}.disabled .wcs-select-content,.disabled .wcs-select-text{cursor:default;pointer-events:none}.disabled .wcs-select-text{color:#b9b9b9}.disabled .arrow{fill:#747678}.wcs-select-options::slotted(wcs-select-option)>[value=\"1\"]{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return Select;
}());
/**
 * Select option component, use in conjuction with wcs-select.
 */
var SelectOption = /** @class */ (function () {
    function SelectOption(hostRef) {
        registerInstance(this, hostRef);
        /** Wether this option can be selected. */
        this.disabled = false;
        /** Wether this option is selected. */
        this.selected = false;
        /**
         * This property should not be used,
         * it is only meant for internal use.
         * @internal
         * @ignore
         */
        this.slot = 'wcs-select-option';
        this.wcsSelectOptionClick = createEvent(this, "wcsSelectOptionClick", 7);
    }
    SelectOption.prototype.componentWillLoad = function () {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.textContent || '';
        }
    };
    SelectOption.prototype.componentDidLoad = function () {
        this.addClickEventListener();
    };
    SelectOption.prototype.addClickEventListener = function () {
        var _this_1 = this;
        this.el.addEventListener('mousedown', function () {
            if (!_this_1.disabled) {
                // We select inner HTML as it's what's passed into the slot.
                var displayText = _this_1.el.getElementsByClassName('wcs-selection-option-container')[0].innerHTML;
                _this_1.wcsSelectOptionClick.emit({
                    value: _this_1.value,
                    displayText: displayText
                });
            }
        });
    };
    SelectOption.prototype.render = function () {
        var wrapperClasses = (this.disabled ? 'disabled ' : '') +
            (this.selected ? 'selected ' : '');
        return (
        // TODO: Try to remove this div
        h("div", { class: wrapperClasses + 'wcs-selection-option-container' }, h("slot", null)));
    };
    Object.defineProperty(SelectOption.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectOption, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}wcs-select-option{display:block}.wcs-selection-option-container{display:block;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500;color:#000}.wcs-selection-option-container.selected,.wcs-selection-option-container:hover{color:#0088ce}.disabled.wcs-selection-option-container{cursor:default;color:#b9b9b9}.selected{color:#0088ce}"; },
        enumerable: true,
        configurable: true
    });
    return SelectOption;
}());
var Sidebar = /** @class */ (function () {
    function Sidebar(hostRef) {
        registerInstance(this, hostRef);
    }
    Sidebar.prototype.hostData = function () {
        return {
            'slot': 'sidebar'
        };
    };
    Sidebar.prototype.__stencil_render = function () {
        return (h("nav", null, h("slot", { name: "link" })));
    };
    Sidebar.prototype.render = function () { return h(Host, this.hostData(), this.__stencil_render()); };
    Object.defineProperty(Sidebar, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}nav{z-index:2;background:#0088ce;height:calc(100% - 2.5rem);padding:1rem 1.5rem;position:-webkit-sticky;position:sticky;top:64px;overflow-y:auto}::slotted(a){color:#fff;text-decoration:none;display:block;padding:.25rem}"; },
        enumerable: true,
        configurable: true
    });
    return Sidebar;
}());
/**
 *
 */
var Tab = /** @class */ (function () {
    function Tab(hostRef) {
        registerInstance(this, hostRef);
        /**
         * This property should not be used,
         * it is only meant for internal use.
         * @internal
         * @ignore
         */
        this.slot = 'wcs-tab';
        this.wcsTabDidLoad = createEvent(this, "wcsTabDidLoad", 7);
    }
    Tab.prototype.componentDidLoad = function () {
        this.wcsTabDidLoad.emit();
    };
    Tab.prototype.render = function () {
        return (h("slot", null));
    };
    return Tab;
}());
/**
 * ### Features:
 * - [ ] Switch between different tabs
 * - [ ] Default selected value
 * - [ ] Disabled tab
 * - [ ] Customizing tab header
 * - [x] Header alignment, left / center / right
 * - [ ] Animation
 * - [ ] Disable animation
 * - [ ] Accessibility
 *  - LEFT_ARROW    Move focus to previous tab
 *  - RIGHT_ARROW    Move focus to next tab
 *  - HOME    Move focus to first tab
 *  - END    Move focus to last tab
 *  - SPACE or ENTER    Switch to focused tab
 * - [ ] Customize animation
 */
var Tabs = /** @class */ (function () {
    function Tabs(hostRef) {
        registerInstance(this, hostRef);
        this.align = 'start';
        /**
         * Current selected tab index
         */
        this.selectedIndex = 0;
        this.headers = [];
        this.didLoad = false;
        this.wcsTabsChange = createEvent(this, "wcsTabsChange", 7);
    }
    Tabs.prototype.componentDidLoad = function () {
        this.tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        this.didLoad = true;
        this.refreshHeaders();
    };
    Tabs.prototype.selectedIndexChanged = function () {
        this.wcsTabsChange.emit({
            tabName: this.headers[this.selectedIndex],
            tabIndex: this.selectedIndex
        });
    };
    /**
     * XXX: Temporary fix waiting for two issues to be resolved:
     * - https://github.com/ionic-team/stencil/issues/1261
     * - https://github.com/ionic-team/stencil/issues/1130
     *
     * When resolved this should just be done once in the componentDidLoad method.
     */
    Tabs.prototype.refreshHeaders = function () {
        var _this_1 = this;
        if (this.didLoad) {
            var slot = this.tabsEl.querySelector('slot');
            if (slot && slot.assignedElements) {
                this.headers = slot.assignedElements()
                    .map(function (x) { return x.getAttribute('header'); });
            }
            else {
                this.headers = [];
                this.tabsEl.querySelectorAll('wcs-tab')
                    .forEach(function (x) {
                    _this_1.headers.push(x.getAttribute('header'));
                });
            }
        }
    };
    Tabs.prototype.selectTab = function (index) {
        this.selectedIndex = index;
    };
    Tabs.prototype.getHeaderAlignClass = function () {
        switch (this.align) {
            case 'start':
                return 'start';
            case 'end':
                return 'end';
            case 'center':
                return 'center';
        }
    };
    Tabs.prototype.componentWillUpdate = function () {
        var _this_1 = this;
        var slot = this.tabsEl.querySelector('slot');
        if (slot && slot.assignedElements) {
            slot.assignedElements().forEach(function (el, idx) {
                if (idx !== _this_1.selectedIndex) {
                    el.setAttribute('style', 'display: none;');
                }
                else {
                    el.setAttribute('style', 'display: initial;');
                }
            });
        }
        else {
            this.tabsEl.querySelectorAll('wcs-tab').forEach(function (el, idx) {
                if (idx !== _this_1.selectedIndex) {
                    el.setAttribute('style', 'display: none;');
                }
                else {
                    el.setAttribute('style', 'display: initial;');
                }
            });
        }
    };
    Tabs.prototype.render = function () {
        var _this_1 = this;
        return [
            h("ul", { class: 'wcs-tabs-headers ' + this.getHeaderAlignClass() }, this.headers.map(function (header, idx) { return h("li", { class: 'wcs-tab-header ' + (_this_1.selectedIndex === idx ? 'active' : ''), onClick: function () { return _this_1.selectTab(idx); } }, h("span", null, header)); })),
            h("div", { class: "wcs-tabs" }, h("slot", { name: "wcs-tab" }))
        ];
    };
    Object.defineProperty(Tabs.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabs, "watchers", {
        get: function () {
            return {
                "selectedIndex": ["selectedIndexChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabs, "style", {
        get: function () { return ".wcs-background-primary{background-color:#0088ce}.wcs-color-primary{color:#fff}.wcs-background-primary-hover{background-color:#0088ce}.wcs-background-primary-hover:hover{background-color:#00a1f4;border-color:#02a9ff}.wcs-background-secondary{background-color:#4d4f53}.wcs-color-secondary{color:#fff}.wcs-background-secondary-hover{background-color:#4d4f53}.wcs-background-secondary-hover:hover{background-color:#5f6267;border-color:#66686d}.wcs-background-success{background-color:#82be00}.wcs-color-success{color:#212529}.wcs-background-success-hover{background-color:#82be00}.wcs-background-success-hover:hover{background-color:#9ce400;border-color:#a5f100}.wcs-background-info{background-color:#009aa6}.wcs-color-info{color:#fff}.wcs-background-info-hover{background-color:#009aa6}.wcs-background-info-hover:hover{background-color:#00bdcc;border-color:#00c9d9}.wcs-background-danger{background-color:#cd0037}.wcs-color-danger{color:#fff}.wcs-background-danger-hover{background-color:#cd0037}.wcs-background-danger-hover:hover{background-color:#f30041;border-color:#ff0145}.wcs-background-warning{background-color:#ffb612}.wcs-color-warning{color:#212529}.wcs-background-warning-hover{background-color:#ffb612}.wcs-background-warning-hover:hover{background-color:#ffc238;border-color:#ffc645}.wcs-background-light{background-color:#f2f2f2}.wcs-color-light{color:#212529}.wcs-background-light-hover{background-color:#f2f2f2}.wcs-background-light-hover:hover{background-color:#fff;border-color:#fff}.wcs-background-dark{background-color:#343a40}.wcs-color-dark{color:#fff}.wcs-background-dark-hover{background-color:#343a40}.wcs-background-dark-hover:hover{background-color:#454d55;border-color:#4b545c}:host{margin-top:.5rem!important}.wcs-tabs-headers{display:-ms-flexbox;display:flex;list-style:none;padding-left:0;border-bottom:var(--wcs-tabs-headers-border-bottom);margin:0;padding-bottom:14px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wcs-tabs-headers.center{-ms-flex-pack:center;justify-content:center}.wcs-tabs-headers.end{-ms-flex-pack:end;justify-content:end}.wcs-tabs-headers.start{-ms-flex-pack:start;justify-content:start}.wcs-tab-header{padding-right:1.5rem;cursor:pointer}.wcs-tab-header span{color:#4d4f53;font-size:1rem;font-weight:400;line-height:1.375;padding-top:.25rem;padding-bottom:1rem}.active span,.wcs-tab-header:hover>span{color:#0088ce}.active span{font-weight:500;position:relative}.active span:after{position:absolute;bottom:0;left:0;width:100%;height:.3125rem;content:\"\";background-color:#0088ce;border-radius:3px}"; },
        enumerable: true,
        configurable: true
    });
    return Tabs;
}());
export { App as wcs_app, Badge as wcs_badge, Button as wcs_button, Card as wcs_card, CardBody as wcs_card_body, Checkbox as wcs_checkbox, Header as wcs_header, Icon as wcs_icon, Input as wcs_input, ProgressBar as wcs_progress_bar, ProgressRadial as wcs_progress_radial, Select as wcs_select, SelectOption as wcs_select_option, Sidebar as wcs_sidebar, Tab as wcs_tab, Tabs as wcs_tabs };
