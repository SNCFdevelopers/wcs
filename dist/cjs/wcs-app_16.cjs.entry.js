'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./chunk-8ad2fb5d.js');

class App {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    componentDidLoad() {
        const contentSlot = this.el.shadowRoot.querySelector('slot[name="content"]');
        if (contentSlot && contentSlot.assignedElements) {
            const contentEl = contentSlot.assignedElements()[0];
            contentEl.addEventListener('onscroll', (evt) => {
                console.log(evt);
            });
        }
    }
    render() {
        return [
            __chunk_1.h("slot", { name: "header" }),
            __chunk_1.h("slot", { name: "sidebar" }),
            __chunk_1.h("slot", { name: "content" })
        ];
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return ":host{background-color:#f2f2f2;margin:0;display:grid;grid-template-areas:\"header header\" \"sidebar content\";grid-template-columns:-webkit-min-content auto;grid-template-columns:min-content auto;overflow-y:hidden}::slotted(main){padding:8px;grid-area:content;overflow-y:scroll;height:calc(100vh - 64px)}::slotted(wcs-header){grid-area:header}\@media screen and (max-width:768px){:host{grid-template-areas:\"header\" \"sidebar\" \"content\";grid-template-columns:auto}::slotted(header){position:relative}::slotted(main){overflow-y:visible;height:auto}}"; }
}

class Badge {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    render() {
        return (__chunk_1.h("slot", null));
    }
    static get style() { return ":host{display:inline-block;padding:.313rem 1.5rem;font-size:.875rem;font-weight:500;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.75rem;color:var(--contrast);background-color:var(--base)}"; }
}

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
    if (forceRefresh === void 0) { forceRefresh = false; }
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
    if (globalObj === void 0) { globalObj = window; }
    if (forceRefresh === void 0) { forceRefresh = false; }
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
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
        if (adapter === void 0) { adapter = {}; }
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
        if (shouldBubble === void 0) { shouldBubble = false; }
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
        if (opts === void 0) { opts = { isUnbounded: undefined }; }
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
class Button {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /**
         * Specify the button type.
         */
        this.type = 'button';
        /**
         * Specify wether the button is disabled or not.
         */
        this.disabled = false;
        /**
         * Specify wether the button should have a ripple effect or not.
         */
        this.ripple = true;
        /**
         * This attribute specifies the size of the button.
         * Setting this attribute will change the height and padding of a button.
         */
        this.mode = 'normal';
        this.win = __chunk_1.getContext(this, "window");
    }
    onClick(ev) {
        if (this.type !== 'button' && hasShadowDom(this.el)) {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            const form = this.el.closest('form');
            if (form) {
                ev.preventDefault();
                const fakeButton = this.win.document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }
    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href, role: 'button' }
            : { type: this.type };
        return (__chunk_1.h(TagType, Object.assign({}, attrs, this.generateClasses(), this.disabled === true ? { disabled: true } : null), __chunk_1.h("slot", null)));
    }
    generateClasses() {
        return {
            class: {
                'wcs-inner-button': true,
                'wcs-inner-button-small': this.mode === 'small',
                'wcs-inner-button-block': this.mode === 'block',
                'wcs-inner-button-icon-only': this.mode === 'icon-only',
                'wcs-inner-button-rounded': this.mode === 'round',
            }
        };
    }
    componentDidLoad() {
        if (this.ripple) {
            this.addRippleEffect();
        }
    }
    addRippleEffect() {
        const ripple = new MDCRipple(this.el.shadowRoot.querySelector('.wcs-inner-button'));
        ripple.unbounded = false;
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "\@font-face{font-family:Avenir;src:url(/assets/fonts/avenir-lighter.woff);font-weight:300}\@font-face{font-family:Avenir;src:url(/assets/fonts/avenir-book.woff);font-weight:400}\@font-face{font-family:Avenir;src:url(/assets/fonts/avenir-medium.woff);font-weight:500}\@font-face{font-family:Avenir;src:url(/assets/fonts/avenir-black.woff);font-weight:900}\@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}:host([clear]) .wcs-inner-button,:host([stroked]) .wcs-inner-button{background-color:transparent;-webkit-box-shadow:none;box-shadow:none;color:var(--base)}:host([clear]) .wcs-inner-button:after,:host([clear]) .wcs-inner-button:before,:host([stroked]) .wcs-inner-button:after,:host([stroked]) .wcs-inner-button:before{background-color:var(--base)}:host([stroked]) .wcs-inner-button{border-width:1px;border-style:solid;border-color:var(--base)}:host([disabled]) .wcs-inner-button{color:var(--text-disabled);background-color:var(--light);border-color:var(--light);opacity:1;cursor:default;pointer-events:none}:host([clear][disabled]) .wcs-inner-button,:host([stroked][disabled]) .wcs-inner-button{background-color:transparent}.wcs-inner-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;font-family:Avenir;background-color:var(--base,var(--primary));color:var(--contrast,var(--white));overflow:hidden;outline:0;text-transform:none;margin:0;cursor:pointer;display:inline-block;font-weight:500;text-align:center;white-space:nowrap;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:none;padding:.59375rem 1.875rem;font-size:1rem;line-height:1.5;border-radius:var(--wcs-border-radius);-webkit-transition:color 175ms ease-in-out,background-color 175ms ease-in-out,-webkit-box-shadow 175ms cubic-bezier(.4,0,.2,1);transition:color 175ms ease-in-out,background-color 175ms ease-in-out,-webkit-box-shadow 175ms cubic-bezier(.4,0,.2,1);transition:color 175ms ease-in-out,background-color 175ms ease-in-out,box-shadow 175ms cubic-bezier(.4,0,.2,1);transition:color 175ms ease-in-out,background-color 175ms ease-in-out,box-shadow 175ms cubic-bezier(.4,0,.2,1),-webkit-box-shadow 175ms cubic-bezier(.4,0,.2,1)}.wcs-inner-button:after,.wcs-inner-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.wcs-inner-button:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.wcs-inner-button.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.wcs-inner-button.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.wcs-inner-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.wcs-inner-button.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.wcs-inner-button.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.wcs-inner-button:after,.wcs-inner-button:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.wcs-inner-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.wcs-inner-button:after,.wcs-inner-button:before{background-color:#fff;background-color:var(--contrast,var(--white,#fff))}.wcs-inner-button:hover:before{opacity:.1}.wcs-inner-button.mdc-ripple-upgraded--background-focused:before,.wcs-inner-button:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.2}.wcs-inner-button:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.wcs-inner-button:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.3}.wcs-inner-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.3}.wcs-inner-button:focus{-webkit-box-shadow:0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12),0 1px 3px 0 rgba(0,0,0,.2);box-shadow:0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12),0 1px 3px 0 rgba(0,0,0,.2)}.wcs-inner-button:hover{-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2)}.wcs-inner-button.wcs-inner-button-small{font-weight:500;font-size:1rem;line-height:1.5;padding:.125rem 1.25rem;border-radius:var(--wcs-border-radius)}.wcs-inner-button.wcs-inner-button-block{display:block;width:100%}.wcs-inner-button.wcs-inner-button-icon-only{min-width:3.125rem;min-height:2.8125rem}.wcs-inner-button.wcs-inner-button-icon-only,.wcs-inner-button.wcs-inner-button-rounded{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:0}.wcs-inner-button.wcs-inner-button-rounded{width:2.5rem;height:2.5rem;border-radius:50%}a{text-decoration:none}a::-moz-focus-inner,button::-moz-focus-inner{border:0}"; }
}

class Card {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    render() {
        return (__chunk_1.h("slot", null));
    }
    static get style() { return ":host{-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:var(--white);background-clip:border-box;border-radius:var(--wcs-border-radius)}"; }
}

class CardBody {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    render() {
        return (__chunk_1.h("slot", null));
    }
    static get style() { return ":host{-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--wcs-padding)}"; }
}

class Checkbox {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.checkboxId = `wcs-checkbox-${checkboxIds++}`;
        this.name = this.checkboxId;
        /**
         * If `true` the checkbox is in indeterminate state.
         */
        this.indeterminate = false;
        /**
         * If `true`, the checkbox is selected.
         */
        this.checked = false;
        this.wcsChange = __chunk_1.createEvent(this, "wcsChange", 7);
    }
    handleChange(_event) {
        this.indeterminate = false;
        this.checked = !this.checked;
        this.wcsChange.emit({
            checked: this.checked
        });
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, null, __chunk_1.h("label", { htmlFor: this.name, class: "wcs-container" }, __chunk_1.h("input", { onChange: (evt) => this.handleChange(evt), checked: this.checked, class: "wcs-checkbox", type: "checkbox", name: this.name, id: this.name }), __chunk_1.h("span", { class: "wcs-checkmark" }), __chunk_1.h("span", { class: "text" }, __chunk_1.h("slot", null)))));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return ":host{--wcs-checkbox-border-color:var(--text-medium);--wcs-checkbox-text-color:var(--black);display:-ms-flexbox;display:flex}.wcs-checkmark{-webkit-transition:background-color 225ms cubic-bezier(.17,.84,.44,1),color 225ms cubic-bezier(.17,.84,.44,1);transition:background-color 225ms cubic-bezier(.17,.84,.44,1),color 225ms cubic-bezier(.17,.84,.44,1)}.wcs-container{position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer;font-size:1rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500}.wcs-container input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.wcs-container:hover,input:focus{--wcs-checkbox-border-color:var(--primary);--wcs-checkbox-text-color:var(--primary)}.wcs-checkmark{width:1.125rem;height:1.125rem;border:2px solid var(--wcs-checkbox-border-color);border-radius:3px}:host([indeterminate]) .wcs-checkmark{--wcs-checkbox-border-color:var(--primary);background:var(--primary)}.wcs-container input:checked~.wcs-checkmark{background-color:var(--primary);--wcs-checkbox-border-color:var(--primary)}.wcs-checkmark:after{content:\"\";position:absolute;display:none}.wcs-container input:checked~.wcs-checkmark:after{display:-ms-flexbox;display:flex}.wcs-container .wcs-checkmark:after{left:7px;width:5px;height:10px;border:solid var(--white,#fff);border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.wcs-container input:checked~.text{--wcs-checkbox-text-color:var(--primary)}.text{color:var(--wcs-checkbox-text-color);margin-left:6px;font-weight:500;line-height:1.375}"; }
}
let checkboxIds = 0;

class Header {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    hostData() {
        return {
            'slot': 'header'
        };
    }
    __stencil_render() {
        return (__chunk_1.h("header", null, __chunk_1.h("slot", { name: "logo" }), __chunk_1.h("slot", { name: "title" })));
    }
    render() { return __chunk_1.h(__chunk_1.Host, this.hostData(), this.__stencil_render()); }
    static get style() { return "header{-webkit-box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;background:var(--gray);padding:8px;height:calc(64px - 16px);position:-webkit-sticky;position:sticky;top:0;z-index:1}::slotted(img){width:70px;height:36.8px;margin-right:16px}::slotted(h1){color:var(--white);margin:0;font-weight:500;font-size:1.5rem}"; }
}

class Icon {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    render() {
        const cssClass = {
            class: {
                [`icons-${this.icon}`]: true,
                [`icons-size-${this.size}`]: true
            }
        };
        return (__chunk_1.h("i", Object.assign({}, cssClass)));
    }
}

/**
 *
 */
class Input {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.inputId = `ion-input-${inputIds++}`;
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
        this.wcsChange = __chunk_1.createEvent(this, "wcsChange", 7);
    }
    getValue() {
        return this.value || '';
    }
    valueChanged() {
        this.wcsChange.emit({ value: this.value });
        console.log(this.value);
    }
    onInput(ev) {
        const input = ev.target;
        if (input) {
            this.value = input.value || '';
        }
    }
    disabledChanged() {
        // TODO: implement
    }
    render() {
        const labelId = this.inputId + '-lbl';
        const value = this.getValue();
        return (__chunk_1.h("input", { "aria-labelledby": labelId, name: this.name, class: this.background, value: value, onInput: this.onInput, ref: input => this.nativeInput = input, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, pattern: this.pattern, required: this.required, spellCheck: this.spellcheck, step: this.step, size: this.size, type: this.type }));
    }
    /**
     * Sets focus on the specified `wcs-input`. Use this method instead of the global
     * `input.focus()`.
     */
    async setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    /**
     * Returns the native `<input>` element used under the hood.
     */
    getInputElement() {
        // tslint:disable-next-line:no-non-null-assertion
        return Promise.resolve(this.nativeInput);
    }
    get el() { return __chunk_1.getElement(this); }
    static get watchers() { return {
        "value": ["valueChanged"],
        "disabled": ["disabledChanged"]
    }; }
    static get style() { return "input{display:block;padding:.65625rem 1.25rem;font-size:1rem;line-height:1.5;color:var(--primary);background-color:var(--light);background-clip:padding-box;border:1px solid var(--light);border-radius:.4375rem}input:focus{outline:0;border:solid 1px var(--primary)}.white{background-color:var(--white)}"; }
}
let inputIds = 0;

/**
 * Component displaying progress as a bar.
 */
class ProgressBar {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
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
    render() {
        const style = {
            width: this.value + '%'
        };
        return (__chunk_1.h("div", { class: this.rootClasses() }, __chunk_1.h("div", { class: "progress-bar", style: style }, this.showLabel &&
            __chunk_1.h("span", { class: "progress-label" }, this.value, __chunk_1.h("sup", null, "%")))));
    }
    rootClasses() {
        let classes = 'progress';
        if (this.small)
            classes += ' small';
        if (this.showLabel)
            classes += ' has-label';
        // FIXME: Temporary fix so the label doesn't appear before the bar.
        if (this.value === 0)
            classes += ' value-zero';
        return classes;
    }
    static get style() { return ".progress{display:-ms-flexbox;display:flex;height:.625rem;font-size:.75rem;color:#4d4f53;background-color:#fff;background-image:-webkit-gradient(linear,left top,right top,color-stop(50%,#e1ded9),color-stop(50%,transparent));background-image:linear-gradient(90deg,#e1ded9 50%,transparent 0);background-size:.25rem .625rem;border-radius:.3125rem}.progress.has-label{margin-top:2.375rem}.progress.small{height:.3125rem;overflow:hidden;background-color:#fff;background-image:none;background-size:auto;border-radius:.15625rem}.progress.value-zero>.progress-bar>.progress-label{right:unset}.progress-bar{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;color:#4d4f53;text-align:center;background-color:var(--primary);border-radius:.3125rem;-webkit-transition:width .375s ease-out;transition:width .375s ease-out}.progress-label{position:absolute;right:0;bottom:calc(100% + .5rem);font-size:1.5rem;font-weight:500}.progress-label sup{font-size:.875rem;top:-.5em;position:relative;line-height:0;vertical-align:baseline}"; }
}

class ProgressRadial {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.size = 120;
        this.showLabel = false;
        this.value = 0;
    }
    render() {
        const { size, halfSize } = { size: this.size, halfSize: this.size / 2 };
        return (__chunk_1.h("div", { class: "progress-circle", "data-component": "radial-progress" }, __chunk_1.h("svg", { class: "progress-circle-figure", "data-role": "figure", width: this.size, height: this.size, viewBox: `0 0 ${size} ${size}`, style: this.getSvgStyle() }, __chunk_1.h("circle", { class: "progress-circle-meter", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" }), __chunk_1.h("circle", { class: "progress-circle-value", cx: halfSize, cy: halfSize, r: "54", "stroke-width": "12" })), this.showLabel &&
            __chunk_1.h("div", { class: "progress-circle-label", "data-role": "label" }, __chunk_1.h("span", null, __chunk_1.h("span", { "data-role": "labelvalue" }, this.value), __chunk_1.h("sup", null, "%"))), __chunk_1.h("input", { "data-role": "control", class: "sr-only", type: "range", value: this.value })));
    }
    getSvgStyle() {
        return {
            'stroke-dasharray': '339.292',
            'stroke-dashoffset': `${339.292 - (this.value / 100) * 339.292}`
        };
    }
    static get style() { return ".progress-circle{position:relative;display:inline-block;width:7.5rem;height:7.5rem;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3c?xml version=\'1.0\' encoding=\'utf-8\'?%3e%3csvg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 120 120\' style=\'enable-background:new 0 0 120 120;\' xml:space=\'preserve\'%3e%3cstyle type=\'text/css\'%3e .st0%7bfill:%23D7D7D7;%7d %3c/style%3e%3cg%3e%3crect x=\'59\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'55.2\' y=\'0.1\' transform=\'matrix(0.9976 -6.975647e-02 6.975647e-02 0.9976 -0.2907 3.9376)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'51.5\' y=\'0.5\' transform=\'matrix(0.9903 -0.1392 0.1392 0.9903 -0.3974 7.368)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'47.8\' y=\'1.2\' transform=\'matrix(0.9781 -0.2079 0.2079 0.9781 -0.427 10.2973)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'44.1\' y=\'2.1\' transform=\'matrix(0.9613 -0.2756 0.2756 0.9613 -0.4827 12.749)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'40.5\' y=\'3.3\' transform=\'matrix(0.9397 -0.342 0.342 0.9397 -0.6613 14.7626)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'37\' y=\'4.7\' transform=\'matrix(0.9135 -0.4067 0.4067 0.9135 -1.0509 16.3931)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'33.6\' y=\'6.3\' transform=\'matrix(0.8829 -0.4695 0.4695 0.8829 -1.7286 17.7087)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'30.4\' y=\'8.2\' transform=\'matrix(0.848 -0.5299 0.5299 0.848 -2.7588 18.7897)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'27.3\' y=\'10.3\' transform=\'matrix(0.809 -0.5878 0.5878 0.809 -4.1915 19.7261)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'24.3\' y=\'12.6\' transform=\'matrix(0.766 -0.6428 0.6428 0.766 -6.0608 20.6152)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'21.5\' y=\'15.2\' transform=\'matrix(0.7193 -0.6947 0.6947 0.7193 -8.3843 21.5593)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'18.9\' y=\'17.9\' transform=\'matrix(0.6691 -0.7431 0.7431 0.6691 -11.1622 22.6633)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'16.4\' y=\'20.8\' transform=\'matrix(0.6157 -0.788 0.788 0.6157 -14.3769 24.0315)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'14.2\' y=\'23.8\' transform=\'matrix(0.5592 -0.829 0.829 0.5592 -17.9939 25.7655)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'12.2\' y=\'27\' transform=\'matrix(0.5 -0.866 0.866 0.5 -21.9615 27.9615)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'10.5\' y=\'30.3\' transform=\'matrix(0.4384 -0.8988 0.8988 0.4384 -26.2122 30.7076)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'8.9\' y=\'33.8\' transform=\'matrix(0.3746 -0.9272 0.9272 0.3746 -30.6638 34.0815)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'7.6\' y=\'37.3\' transform=\'matrix(0.309 -0.9511 0.9511 0.309 -35.2211 38.1485)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'6.6\' y=\'40.9\' transform=\'matrix(0.2419 -0.9703 0.9703 0.2419 -39.7776 42.9595)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5.8\' y=\'44.6\' transform=\'matrix(0.1736 -0.9848 0.9848 0.1736 -44.2179 48.5492)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5.3\' y=\'48.4\' transform=\'matrix(0.1045 -0.9945 0.9945 0.1045 -48.42 54.9351)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5\' y=\'52.1\' transform=\'matrix(3.489950e-02 -0.9994 0.9994 3.489950e-02 -52.2577 62.1164)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'0\' y=\'60.9\' transform=\'matrix(0.9994 -3.489950e-02 3.489950e-02 0.9994 -2.1561 0.2482)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'0.3\' y=\'64.6\' transform=\'matrix(0.9945 -0.1045 0.1045 0.9945 -6.8272 1.0177)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'0.8\' y=\'68.4\' transform=\'matrix(0.9848 -0.1736 0.1736 0.9848 -11.9436 2.2383)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'1.6\' y=\'72.1\' transform=\'matrix(0.9703 -0.2419 0.2419 0.9703 -17.4499 4.0099)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'2.6\' y=\'75.7\' transform=\'matrix(0.9511 -0.309 0.309 0.9511 -23.2745 6.4241)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'3.9\' y=\'79.2\' transform=\'matrix(0.9272 -0.3746 0.3746 0.9272 -29.331 9.5626)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'5.5\' y=\'82.7\' transform=\'matrix(0.8988 -0.4384 0.4384 0.8988 -35.5191 13.4941)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'7.2\' y=\'86\' transform=\'matrix(0.866 -0.5 0.5 0.866 -41.7269 18.2731)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'9.2\' y=\'89.2\' transform=\'matrix(0.829 -0.5592 0.5592 0.829 -47.8331 23.9378)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'11.4\' y=\'92.2\' transform=\'matrix(0.788 -0.6157 0.6157 0.788 -53.7091 30.5088)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'13.9\' y=\'95.1\' transform=\'matrix(0.7431 -0.6691 0.6691 0.7431 -59.2218 37.988)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'16.5\' y=\'97.8\' transform=\'matrix(0.6947 -0.7193 0.7193 0.6947 -64.236 46.3581)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'19.3\' y=\'100.4\' transform=\'matrix(0.6428 -0.766 0.766 0.6428 -68.6175 55.5822)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'22.3\' y=\'102.7\' transform=\'matrix(0.5878 -0.809 0.809 0.5878 -72.2355 65.6038)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'25.4\' y=\'104.8\' transform=\'matrix(0.5299 -0.848 0.848 0.5299 -74.9657 76.3475)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'28.6\' y=\'106.7\' transform=\'matrix(0.4695 -0.8829 0.8829 0.4695 -76.693 87.7197)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'32\' y=\'108.3\' transform=\'matrix(0.4067 -0.9135 0.9135 0.4067 -77.3138 99.6102)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'35.5\' y=\'109.7\' transform=\'matrix(0.342 -0.9397 0.9397 0.342 -76.7383 111.8932)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'39.1\' y=\'110.9\' transform=\'matrix(0.2756 -0.9613 0.9613 0.2756 -74.893 124.43)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'42.8\' y=\'111.8\' transform=\'matrix(0.2079 -0.9781 0.9781 0.2079 -71.7222 137.0703)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'46.5\' y=\'112.5\' transform=\'matrix(0.1392 -0.9903 0.9903 0.1392 -67.1899 149.6558)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'50.2\' y=\'112.9\' transform=\'matrix(6.975647e-02 -0.9976 0.9976 6.975647e-02 -61.2806 162.0216)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'59\' y=\'108\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'62.8\' y=\'107.9\' transform=\'matrix(0.9976 -6.975647e-02 6.975647e-02 0.9976 -7.7877 4.7255)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'66.5\' y=\'107.5\' transform=\'matrix(0.9903 -0.1392 0.1392 0.9903 -15.1355 10.5006)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'70.2\' y=\'106.8\' transform=\'matrix(0.9781 -0.2079 0.2079 0.9781 -21.9001 17.2744)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'73.9\' y=\'105.9\' transform=\'matrix(0.9613 -0.2756 0.2756 0.9613 -27.9452 24.9761)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'77.5\' y=\'104.7\' transform=\'matrix(0.9397 -0.342 0.342 0.9397 -33.1442 33.5167)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'81\' y=\'103.3\' transform=\'matrix(0.9135 -0.4067 0.4067 0.9135 -37.383 42.7899)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'84.4\' y=\'101.7\' transform=\'matrix(0.8829 -0.4695 0.4695 0.8829 -40.5617 52.6742)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'87.6\' y=\'99.8\' transform=\'matrix(0.848 -0.5299 0.5299 0.848 -42.5973 63.0348)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'90.7\' y=\'97.7\' transform=\'matrix(0.809 -0.5878 0.5878 0.809 -43.4248 73.7261)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'93.7\' y=\'95.4\' transform=\'matrix(0.766 -0.6428 0.6428 0.766 -42.999 84.594)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'96.5\' y=\'92.8\' transform=\'matrix(0.7193 -0.6947 0.6947 0.7193 -41.2954 95.4789)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'99.1\' y=\'90.1\' transform=\'matrix(0.6691 -0.7431 0.7431 0.6691 -38.3109 106.2184)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'101.6\' y=\'87.2\' transform=\'matrix(0.6157 -0.788 0.788 0.6157 -34.0637 116.6505)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'103.8\' y=\'84.2\' transform=\'matrix(0.5592 -0.829 0.829 0.5592 -28.5937 126.6159)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'105.8\' y=\'81\' transform=\'matrix(0.5 -0.866 0.866 0.5 -21.9615 135.9615)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'107.5\' y=\'77.7\' transform=\'matrix(0.4384 -0.8988 0.8988 0.4384 -14.2476 144.5431)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'109.1\' y=\'74.2\' transform=\'matrix(0.3746 -0.9272 0.9272 0.3746 -5.5511 152.2277)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'110.4\' y=\'70.7\' transform=\'matrix(0.309 -0.9511 0.9511 0.309 4.0122 158.8962)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'111.4\' y=\'67.1\' transform=\'matrix(0.2419 -0.9703 0.9703 0.2419 14.3114 164.4454)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'112.2\' y=\'63.4\' transform=\'matrix(0.1736 -0.9848 0.9848 0.1736 25.2032 168.79)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'112.7\' y=\'59.6\' transform=\'matrix(0.1045 -0.9945 0.9945 0.1045 36.5339 171.8641)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'113\' y=\'55.9\' transform=\'matrix(3.489950e-02 -0.9994 0.9994 3.489950e-02 48.1428 173.6225)\' class=\'st0\' width=\'2\' height=\'12\'/%3e%3c/g%3e%3cg%3e%3crect x=\'108\' y=\'57.1\' transform=\'matrix(0.9994 -3.489950e-02 3.489950e-02 0.9994 -1.9588 4.0128)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'107.7\' y=\'53.4\' transform=\'matrix(0.9945 -0.1045 0.1045 0.9945 -5.0588 12.1831)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'107.2\' y=\'49.6\' transform=\'matrix(0.9848 -0.1736 0.1736 0.9848 -7.0711 20.4225)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'106.4\' y=\'45.9\' transform=\'matrix(0.9703 -0.2419 0.2419 0.9703 -8.0163 28.5853)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'105.4\' y=\'42.3\' transform=\'matrix(0.9511 -0.309 0.309 0.9511 -7.9343 36.5311)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'104.1\' y=\'38.8\' transform=\'matrix(0.9272 -0.3746 0.3746 0.9272 -6.8838 44.1282)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'102.5\' y=\'35.3\' transform=\'matrix(0.8988 -0.4384 0.4384 0.8988 -4.9408 51.2552)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'100.8\' y=\'32\' transform=\'matrix(0.866 -0.5 0.5 0.866 -2.1962 57.8038)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'98.8\' y=\'28.8\' transform=\'matrix(0.829 -0.5592 0.5592 0.829 1.2454 63.6808)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'96.6\' y=\'25.8\' transform=\'matrix(0.788 -0.6157 0.6157 0.788 5.2685 68.8093)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'94.1\' y=\'22.9\' transform=\'matrix(0.7431 -0.6691 0.6691 0.7431 9.7488 73.1303)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'91.5\' y=\'20.2\' transform=\'matrix(0.6947 -0.7193 0.7193 0.6947 14.5562 76.6036)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'88.7\' y=\'17.6\' transform=\'matrix(0.6428 -0.766 0.766 0.6428 19.5576 79.2086)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'85.7\' y=\'15.3\' transform=\'matrix(0.5878 -0.809 0.809 0.5878 24.6192 80.944)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'82.6\' y=\'13.2\' transform=\'matrix(0.5299 -0.848 0.848 0.5299 29.6096 81.828)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'79.4\' y=\'11.3\' transform=\'matrix(0.4695 -0.8829 0.8829 0.4695 34.4027 81.8974)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'76\' y=\'9.7\' transform=\'matrix(0.4067 -0.9135 0.9135 0.4067 38.8799 81.2069)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'72.5\' y=\'8.3\' transform=\'matrix(0.342 -0.9397 0.9397 0.342 42.9327 79.8275)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'68.9\' y=\'7.1\' transform=\'matrix(0.2756 -0.9613 0.9613 0.2756 46.4651 77.845)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'65.2\' y=\'6.2\' transform=\'matrix(0.2079 -0.9781 0.9781 0.2079 49.3951 75.358)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'61.5\' y=\'5.5\' transform=\'matrix(0.1392 -0.9903 0.9903 0.1392 51.657 72.4756)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3cg%3e%3crect x=\'57.8\' y=\'5.1\' transform=\'matrix(6.975647e-02 -0.9976 0.9976 6.975647e-02 53.2021 69.3153)\' class=\'st0\' width=\'12\' height=\'2\'/%3e%3c/g%3e%3c/svg%3e\")}.progress-circle-figure{-webkit-transform:rotate(-90deg);transform:rotate(-90deg);-webkit-transition:stroke-dashoffset .375s ease-out;transition:stroke-dashoffset .375s ease-out}.sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;-webkit-clip-path:inset(50%);clip-path:inset(50%);border:0}.progress-circle-label{position:absolute;top:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;font-size:1.5rem;font-weight:500}.progress-circle-label sup{font-size:.875rem;top:-.5em;position:relative;line-height:0;vertical-align:baseline}.progress-circle-meter{stroke:var(--white)}.progress-circle-value{stroke:var(--primary);stroke-linecap:round}.progress-circle-meter,.progress-circle-value{fill:none}"; }
}

/* <svg style="display: block;height: 24px;" width="24" height="24" viewbox="0 0 100 100">
    <style>
        polyline {
            stroke: black;
        stroke-linecap: round;
        stroke-width: 10px;
    }

                        </style>
    <polyline fill="none" points="20,65 50,35 80,65">
        <animate attributename="points" dur="375ms" repeatcount="indefinite" to="20,65 50,35 80,65"
            from="20,35 50,65 80,35"></animate>
    </polyline>
</svg> */
const SelectArrow = ({ up }) => (__chunk_1.h("svg", { style: { marginLeft: 'auto' }, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
    __chunk_1.h("style", { type: "text/css" }, `
            .arrow-group {
                transform-origin: 50% 50%;
                transition: transform 175ms ease-in-out;
            }
            .up {
                transform: scaleY(1);
            }
            .down {
                transform: scaleY(-1);
            }
        `),
    __chunk_1.h("g", { fill: "none", class: (up ? 'up' : 'down') + ' arrow-group' },
        __chunk_1.h("path", { class: "arrow", fill: "black", d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }),
        __chunk_1.h("path", { d: "M0 0h24v24H0z", fill: "none" }))));

var ActionTypes;
(function (ActionTypes) {
    ActionTypes["Start"] = "xstate.start";
    ActionTypes["Stop"] = "xstate.stop";
    ActionTypes["Raise"] = "xstate.raise";
    ActionTypes["Send"] = "xstate.send";
    ActionTypes["Cancel"] = "xstate.cancel";
    ActionTypes["NullEvent"] = "";
    ActionTypes["Assign"] = "xstate.assign";
    ActionTypes["After"] = "xstate.after";
    ActionTypes["DoneState"] = "done.state";
    ActionTypes["DoneInvoke"] = "done.invoke";
    ActionTypes["Log"] = "xstate.log";
    ActionTypes["Init"] = "xstate.init";
    ActionTypes["Invoke"] = "xstate.invoke";
    ActionTypes["ErrorExecution"] = "error.execution";
    ActionTypes["ErrorCommunication"] = "error.communication";
    ActionTypes["ErrorPlatform"] = "error.platform";
    ActionTypes["Update"] = "xstate.update";
    ActionTypes["Pure"] = "xstate.pure";
})(ActionTypes || (ActionTypes = {}));
var SpecialTargets;
(function (SpecialTargets) {
    SpecialTargets["Parent"] = "#_parent";
    SpecialTargets["Internal"] = "#_internal";
})(SpecialTargets || (SpecialTargets = {}));

var STATE_DELIMITER = '.';
var EMPTY_ACTIVITY_MAP = {};
var DEFAULT_GUARD_TYPE = 'xstate.guard';

var __assign$1 = undefined && undefined.__assign || function () {
    __assign$1 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read$1 = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread$1 = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$1(arguments[i]));
    return ar;
};
function isState(state) {
    if (isString(state)) {
        return false;
    }
    return 'value' in state && 'tree' in state && 'history' in state;
}
function keys(value) {
    return Object.keys(value);
}
function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) {
        delimiter = STATE_DELIMITER;
    }
    var parentStateValue = toStateValue(parentStateId, delimiter);
    var childStateValue = toStateValue(childStateId, delimiter);
    if (isString(childStateValue)) {
        if (isString(parentStateValue)) {
            return childStateValue === parentStateValue;
        }
        // Parent more specific than child
        return false;
    }
    if (isString(parentStateValue)) {
        return parentStateValue in childStateValue;
    }
    return keys(parentStateValue).every(function (key) {
        if (!(key in childStateValue)) {
            return false;
        }
        return matchesState(parentStateValue[key], childStateValue[key]);
    });
}
function getEventType(event) {
    try {
        return isString(event) || typeof event === 'number' ? "" + event : event.type;
    } catch (e) {
        throw new Error('Events must be strings or objects with a string event.type property.');
    }
}
function toStatePath(stateId, delimiter) {
    try {
        if (isArray(stateId)) {
            return stateId;
        }
        return stateId.toString().split(delimiter);
    } catch (e) {
        throw new Error("'" + stateId + "' is not a valid state path.");
    }
}
function toStateValue(stateValue, delimiter) {
    if (isState(stateValue)) {
        return stateValue.value;
    }
    if (isArray(stateValue)) {
        return pathToStateValue(stateValue);
    }
    if (typeof stateValue !== 'string' && !isState(stateValue)) {
        return stateValue;
    }
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
}
function pathToStateValue(statePath) {
    if (statePath.length === 1) {
        return statePath[0];
    }
    var value = {};
    var marker = value;
    for (var i = 0; i < statePath.length - 1; i++) {
        if (i === statePath.length - 2) {
            marker[statePath[i]] = statePath[i + 1];
        } else {
            marker[statePath[i]] = {};
            marker = marker[statePath[i]];
        }
    }
    return value;
}
function mapValues(collection, iteratee) {
    var result = {};
    var collectionKeys = keys(collection);
    for (var i = 0; i < collectionKeys.length; i++) {
        var key = collectionKeys[i];
        result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
}
function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a;
    var result = {};
    try {
        for (var _b = __values(keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var item = collection[key];
            if (!predicate(item)) {
                continue;
            }
            result[key] = iteratee(item, key, collection);
        }
    } catch (e_1_1) {
        e_1 = { error: e_1_1 };
    } finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
            if (e_1) throw e_1.error;
        }
    }
    return result;
}
/**
 * Retrieves a value at the given path.
 * @param props The deep path to the prop of the desired value
 */
var path = function (props) {
    return function (object) {
        var e_2, _a;
        var result = object;
        try {
            for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                var prop = props_1_1.value;
                result = result[prop];
            }
        } catch (e_2_1) {
            e_2 = { error: e_2_1 };
        } finally {
            try {
                if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
            } finally {
                if (e_2) throw e_2.error;
            }
        }
        return result;
    };
};
/**
 * Retrieves a value at the given path via the nested accessor prop.
 * @param props The deep path to the prop of the desired value
 */
function nestedPath(props, accessorProp) {
    return function (object) {
        var e_3, _a;
        var result = object;
        try {
            for (var props_2 = __values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
                var prop = props_2_1.value;
                result = result[accessorProp][prop];
            }
        } catch (e_3_1) {
            e_3 = { error: e_3_1 };
        } finally {
            try {
                if (props_2_1 && !props_2_1.done && (_a = props_2.return)) _a.call(props_2);
            } finally {
                if (e_3) throw e_3.error;
            }
        }
        return result;
    };
}
function toStatePaths(stateValue) {
    if (!stateValue) {
        return [[]];
    }
    if (isString(stateValue)) {
        return [[stateValue]];
    }
    var result = flatten(keys(stateValue).map(function (key) {
        var subStateValue = stateValue[key];
        if (typeof subStateValue !== 'string' && (!subStateValue || !Object.keys(subStateValue).length)) {
            return [[key]];
        }
        return toStatePaths(stateValue[key]).map(function (subPath) {
            return [key].concat(subPath);
        });
    }));
    return result;
}
function flatten(array) {
    var _a;
    return (_a = []).concat.apply(_a, __spread$1(array));
}
function toArray(value) {
    if (isArray(value)) {
        return value;
    }
    if (value === undefined) {
        return [];
    }
    return [value];
}
function mapContext(mapper, context, event) {
    var e_5, _a;
    if (isFunction(mapper)) {
        return mapper(context, event);
    }
    var result = {};
    try {
        for (var _b = __values(keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var subMapper = mapper[key];
            if (isFunction(subMapper)) {
                result[key] = subMapper(context, event);
            } else {
                result[key] = subMapper;
            }
        }
    } catch (e_5_1) {
        e_5 = { error: e_5_1 };
    } finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
            if (e_5) throw e_5.error;
        }
    }
    return result;
}
function isBuiltInEvent(eventType) {
    // check if event is a "done" event
    if (eventType.indexOf(ActionTypes.DoneState) === 0 || eventType.indexOf(ActionTypes.DoneInvoke) === 0) {
        return true;
    }
    // check if event is an "error" event
    if (eventType === ActionTypes.ErrorCommunication || eventType === ActionTypes.ErrorExecution || eventType.indexOf(ActionTypes.ErrorPlatform) === 0) {
        return true;
    }
    return false;
}
function isPromiseLike(value) {
    if (value instanceof Promise) {
        return true;
    }
    // Check if shape matches the Promise/A+ specification for a "thenable".
    if (value !== null && (isFunction(value) || typeof value === 'object') && isFunction(value.then)) {
        return true;
    }
    return false;
}
function partition(items, predicate) {
    var e_6, _a;
    var _b = __read$1([[], []], 2),
        truthy = _b[0],
        falsy = _b[1];
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var item = items_1_1.value;
            if (predicate(item)) {
                truthy.push(item);
            } else {
                falsy.push(item);
            }
        }
    } catch (e_6_1) {
        e_6 = { error: e_6_1 };
    } finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        } finally {
            if (e_6) throw e_6.error;
        }
    }
    return [truthy, falsy];
}
function updateHistoryStates(hist, stateValue) {
    return mapValues(hist.states, function (subHist, key) {
        if (!subHist) {
            return undefined;
        }
        var subStateValue = (isString(stateValue) ? undefined : stateValue[key]) || (subHist ? subHist.current : undefined);
        if (!subStateValue) {
            return undefined;
        }
        return {
            current: subStateValue,
            states: updateHistoryStates(subHist, subStateValue)
        };
    });
}
function updateHistoryValue(hist, stateValue) {
    return {
        current: stateValue,
        states: updateHistoryStates(hist, stateValue)
    };
}
function updateContext(context, event, assignActions) {
    var updatedContext = context ? assignActions.reduce(function (acc, assignAction) {
        var e_7, _a;
        var assignment = assignAction.assignment;
        var partialUpdate = {};
        if (isFunction(assignment)) {
            partialUpdate = assignment(acc, event || { type: ActionTypes.Init });
        } else {
            try {
                for (var _b = __values(keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var propAssignment = assignment[key];
                    partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, event) : propAssignment;
                }
            } catch (e_7_1) {
                e_7 = { error: e_7_1 };
            } finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                } finally {
                    if (e_7) throw e_7.error;
                }
            }
        }
        return Object.assign({}, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
}
function bindActionToState(action, state) {
    var exec = action.exec;
    var boundAction = __assign$1({}, action, { exec: exec !== undefined ? function () {
            return exec(state.context, state.event, {
                action: action,
                state: state
            });
        } : undefined });
    return boundAction;
}
function isArray(value) {
    return Array.isArray(value);
}
// tslint:disable-next-line:ban-types
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
// export function memoizedGetter<T, TP extends { prototype: object }>(
//   o: TP,
//   property: string,
//   getter: () => T
// ): void {
//   Object.defineProperty(o.prototype, property, {
//     get: getter,
//     enumerable: false,
//     configurable: false
//   });
// }
function toGuard(condition, guardMap) {
    if (!condition) {
        return undefined;
    }
    if (isString(condition)) {
        return {
            type: DEFAULT_GUARD_TYPE,
            name: condition,
            predicate: guardMap ? guardMap[condition] : undefined
        };
    }
    if (isFunction(condition)) {
        return {
            type: DEFAULT_GUARD_TYPE,
            name: condition.name,
            predicate: condition
        };
    }
    return condition;
}
function isObservable(value) {
    try {
        return 'subscribe' in value && isFunction(value.subscribe);
    } catch (e) {
        return false;
    }
}
function isMachine(value) {
    try {
        return '__xstatenode' in value;
    } catch (e) {
        return false;
    }
}

var __read$2 = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread$2 = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$2(arguments[i]));
    return ar;
};
function stateValuesEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    if (isString(a) || isString(b)) {
        return a === b;
    }
    var aKeys = keys(a);
    var bKeys = keys(b);
    return aKeys.length === bKeys.length && aKeys.every(function (key) {
        return stateValuesEqual(a[key], b[key]);
    });
}
var State = /** @class */ /*#__PURE__*/function () {
    /**
     * Creates a new State instance.
     * @param value The state value
     * @param context The extended state
     * @param historyValue The tree representing historical values of the state nodes
     * @param history The previous state
     * @param actions An array of action objects to execute as side-effects
     * @param activities A mapping of activities and whether they are started (`true`) or stopped (`false`).
     * @param meta
     * @param events Internal event queue. Should be empty with run-to-completion semantics.
     * @param tree
     */
    function State(config) {
        this.actions = [];
        this.activities = EMPTY_ACTIVITY_MAP;
        this.meta = {};
        this.events = [];
        this.value = config.value;
        this.context = config.context;
        this.event = config.event;
        this.historyValue = config.historyValue;
        this.history = config.history;
        this.actions = config.actions || [];
        this.activities = config.activities || EMPTY_ACTIVITY_MAP;
        this.meta = config.meta || {};
        this.events = config.events || [];
        Object.defineProperty(this, 'tree', {
            value: config.tree,
            enumerable: false
        });
        this.matches = this.matches.bind(this);
        this.toStrings = this.toStrings.bind(this);
    }
    /**
     * Creates a new State instance for the given `stateValue` and `context`.
     * @param stateValue
     * @param context
     */
    State.from = function (stateValue, context) {
        if (stateValue instanceof State) {
            if (stateValue.context !== context) {
                return new State({
                    value: stateValue.value,
                    context: context,
                    event: stateValue.event,
                    historyValue: stateValue.historyValue,
                    history: stateValue.history,
                    actions: [],
                    activities: stateValue.activities,
                    meta: {},
                    events: [],
                    tree: stateValue.tree
                });
            }
            return stateValue;
        }
        var event = { type: ActionTypes.Init };
        return new State({
            value: stateValue,
            context: context,
            event: event,
            historyValue: undefined,
            history: undefined,
            actions: [],
            activities: undefined,
            meta: undefined,
            events: []
        });
    };
    /**
     * Creates a new State instance for the given `config`.
     * @param config The state config
     */
    State.create = function (config) {
        return new State(config);
    };
    /**
     * Creates a new `State` instance for the given `stateValue` and `context` with no actions (side-effects).
     * @param stateValue
     * @param context
     */
    State.inert = function (stateValue, context) {
        if (stateValue instanceof State) {
            if (!stateValue.actions.length) {
                return stateValue;
            }
            var event_1 = { type: ActionTypes.Init };
            return new State({
                value: stateValue.value,
                context: context,
                event: event_1,
                historyValue: stateValue.historyValue,
                history: stateValue.history,
                activities: stateValue.activities,
                tree: stateValue.tree
            });
        }
        return State.from(stateValue, context);
    };
    Object.defineProperty(State.prototype, "inert", {
        /**
         * Returns a new `State` instance that is equal to this state no actions (side-effects).
         */
        get: function () {
            return State.inert(this, this.context);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(State.prototype, "nextEvents", {
        /**
         * The next events that will cause a transition from the current state.
         */
        get: function () {
            if (!this.tree) {
                return [];
            }
            return this.tree.nextEvents;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns an array of all the string leaf state node paths.
     * @param stateValue
     * @param delimiter The character(s) that separate each subpath in the string state node path.
     */
    State.prototype.toStrings = function (stateValue, delimiter) {
        var _this = this;
        if (stateValue === void 0) {
            stateValue = this.value;
        }
        if (delimiter === void 0) {
            delimiter = '.';
        }
        if (isString(stateValue)) {
            return [stateValue];
        }
        var valueKeys = keys(stateValue);
        return valueKeys.concat.apply(valueKeys, __spread$2(valueKeys.map(function (key) {
            return _this.toStrings(stateValue[key]).map(function (s) {
                return key + delimiter + s;
            });
        })));
    };
    /**
     * Whether the current state value is a subset of the given parent state value.
     * @param parentStateValue
     */
    State.prototype.matches = function (parentStateValue) {
        return matchesState(parentStateValue, this.value);
    };
    return State;
}();

// xstate-specific action types
var start = ActionTypes.Start;
var stop = ActionTypes.Stop;
var raise = ActionTypes.Raise;
var send = ActionTypes.Send;
var cancel = ActionTypes.Cancel;
var nullEvent = ActionTypes.NullEvent;
var assign = ActionTypes.Assign;
var log = ActionTypes.Log;
var init = ActionTypes.Init;
var invoke = ActionTypes.Invoke;
var errorPlatform = ActionTypes.ErrorPlatform;
var update = ActionTypes.Update;

var __assign$2 = undefined && undefined.__assign || function () {
    __assign$2 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
};
var initEvent = { type: init };
function toEventObject(event, payload
// id?: TEvent['type']
) {
    if (isString(event) || typeof event === 'number') {
        var eventObject = { type: event };
        if (payload) {
            Object.assign(eventObject, payload);
        }
        return eventObject;
    }
    return event;
}
function getActionFunction(actionType, actionFunctionMap) {
    return actionFunctionMap ? actionFunctionMap[actionType] || undefined : undefined;
}
function toActionObject(action, actionFunctionMap) {
    var actionObject;
    if (isString(action) || typeof action === 'number') {
        var exec = getActionFunction(action, actionFunctionMap);
        if (isFunction(exec)) {
            actionObject = {
                type: action,
                exec: exec
            };
        } else if (exec) {
            actionObject = exec;
        } else {
            actionObject = { type: action, exec: undefined };
        }
    } else if (isFunction(action)) {
        actionObject = {
            // Convert action to string if unnamed
            type: action.name || action.toString(),
            exec: action
        };
    } else {
        var exec = getActionFunction(action.type, actionFunctionMap);
        if (isFunction(exec)) {
            actionObject = __assign$2({}, action, { exec: exec });
        } else if (exec) {
            var type = action.type,
                other = __rest(action, ["type"]);
            actionObject = __assign$2({ type: type }, exec, other);
        } else {
            actionObject = action;
        }
    }
    Object.defineProperty(actionObject, 'toString', {
        value: function () {
            return actionObject.type;
        },
        enumerable: false,
        configurable: true
    });
    return actionObject;
}
var toActionObjects = function (action, actionFunctionMap) {
    if (!action) {
        return [];
    }
    var actions = isArray(action) ? action : [action];
    return actions.map(function (subAction) {
        return toActionObject(subAction, actionFunctionMap);
    });
};
function toActivityDefinition(action) {
    var actionObject = toActionObject(action);
    return __assign$2({ id: isString(action) ? action : actionObject.id }, actionObject, { type: actionObject.type });
}
/**
 * Raises an event. This places the event in the internal event queue, so that
 * the event is immediately consumed by the machine in the current step.
 *
 * @param eventType The event to raise.
 */
function raise$1(event) {
    return {
        type: raise,
        event: event
    };
}
/**
 * Sends an event. This returns an action that will be read by an interpreter to
 * send the event in the next step, after the current step is finished executing.
 *
 * @param event The event to send.
 * @param options Options to pass into the send event:
 *  - `id` - The unique send event identifier (used with `cancel()`).
 *  - `delay` - The number of milliseconds to delay the sending of the event.
 *  - `target` - The target of this event (by default, the machine the event was sent from).
 */
function send$1(event, options) {
    return {
        to: options ? options.to : undefined,
        type: send,
        event: isFunction(event) ? event : toEventObject(event),
        delay: options ? options.delay : undefined,
        id: options && options.id !== undefined ? options.id : isFunction(event) ? event.name : getEventType(event)
    };
}
function resolveSend(action, ctx, event) {
    // TODO: helper function for resolving Expr
    var resolvedEvent = isFunction(action.event) ? toEventObject(action.event(ctx, event)) : toEventObject(action.event);
    var resolvedDelay = isFunction(action.delay) ? action.delay(ctx, event) : action.delay;
    var resolvedTarget = isFunction(action.to) ? action.to(ctx, event) : action.to;
    return __assign$2({}, action, { to: resolvedTarget, event: resolvedEvent, delay: resolvedDelay });
}
/**
 * Cancels an in-flight `send(...)` action. A canceled sent action will not
 * be executed, nor will its event be sent, unless it has already been sent
 * (e.g., if `cancel(...)` is called after the `send(...)` action's `delay`).
 *
 * @param sendId The `id` of the `send(...)` action to cancel.
 */
var cancel$1 = function (sendId) {
    return {
        type: cancel,
        sendId: sendId
    };
};
/**
 * Starts an activity.
 *
 * @param activity The activity to start.
 */
function start$1(activity) {
    var activityDef = toActivityDefinition(activity);
    return {
        type: ActionTypes.Start,
        activity: activityDef,
        exec: undefined
    };
}
/**
 * Stops an activity.
 *
 * @param activity The activity to stop.
 */
function stop$1(activity) {
    var activityDef = toActivityDefinition(activity);
    return {
        type: ActionTypes.Stop,
        activity: activityDef,
        exec: undefined
    };
}
/**
 * Returns an event type that represents an implicit event that
 * is sent after the specified `delay`.
 *
 * @param delayRef The delay in milliseconds
 * @param id The state node ID where this event is handled
 */
function after(delayRef, id) {
    var idSuffix = id ? "#" + id : '';
    return ActionTypes.After + "(" + delayRef + ")" + idSuffix;
}
/**
 * Returns an event that represents that a final state node
 * has been reached in the parent state node.
 *
 * @param id The final state node's parent state node `id`
 * @param data The data to pass into the event
 */
function done(id, data) {
    var type = ActionTypes.DoneState + "." + id;
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function () {
        return type;
    };
    return eventObject;
}
/**
 * Returns an event that represents that an invoked service has terminated.
 *
 * An invoked service is terminated when it has reached a top-level final state node,
 * but not when it is canceled.
 *
 * @param id The final state node ID
 * @param data The data to pass into the event
 */
function doneInvoke(id, data) {
    var type = ActionTypes.DoneInvoke + "." + id;
    var eventObject = {
        type: type,
        data: data
    };
    eventObject.toString = function () {
        return type;
    };
    return eventObject;
}
function error(id, data) {
    var type = ActionTypes.ErrorPlatform + "." + id;
    var eventObject = { type: type, data: data };
    eventObject.toString = function () {
        return type;
    };
    return eventObject;
}

var __assign$3 = undefined && undefined.__assign || function () {
    __assign$3 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$3.apply(this, arguments);
};
var __read$3 = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread$3 = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$3(arguments[i]));
    return ar;
};
var __values$1 = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var defaultStateTreeOptions = {
    resolved: false
};
var StateTree = /** @class */ /*#__PURE__*/function () {
    function StateTree(stateNode, stateValue, options, parent) {
        var _this = this;
        var _a;
        if (options === void 0) {
            options = defaultStateTreeOptions;
        }
        this.stateNode = stateNode;
        this.stateValue = stateValue;
        this.parent = parent;
        this.reentryNodes = new Set();
        this.root = this.parent ? this.parent.root : this;
        this.nodes = stateValue ? isString(stateValue) ? (_a = {}, _a[stateValue] = new StateTree(stateNode.getStateNode(stateValue), undefined, undefined, this), _a) : mapValues(stateValue, function (subValue, key) {
            return new StateTree(stateNode.getStateNode(key), subValue, undefined, _this);
        }) : {};
        var resolvedOptions = __assign$3({}, defaultStateTreeOptions, options);
        this.isResolved = resolvedOptions.resolved;
    }
    Object.defineProperty(StateTree.prototype, "done", {
        get: function () {
            var _this = this;
            switch (this.stateNode.type) {
                case 'final':
                    return true;
                case 'compound':
                    var childTree = this.nodes[keys(this.nodes)[0]];
                    return childTree.stateNode.type === 'final';
                case 'parallel':
                    return keys(this.nodes).every(function (key) {
                        return _this.nodes[key].done;
                    });
                default:
                    return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.getDoneData = function (context, event) {
        if (!this.done) {
            return undefined;
        }
        if (this.stateNode.type === 'compound') {
            var childTree = this.nodes[keys(this.nodes)[0]];
            if (!childTree.stateNode.data) {
                return undefined;
            }
            return mapContext(childTree.stateNode.data, context, event);
        }
        return undefined;
    };
    Object.defineProperty(StateTree.prototype, "atomicNodes", {
        get: function () {
            var _this = this;
            if (this.stateNode.type === 'atomic' || this.stateNode.type === 'final') {
                return [this.stateNode];
            }
            return flatten(keys(this.value).map(function (key) {
                return _this.value[key].atomicNodes;
            }));
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.getDoneEvents = function (entryStateNodes) {
        var _this = this;
        // If no state nodes are being entered, no done events will be fired
        if (!entryStateNodes || !entryStateNodes.size) {
            return [];
        }
        if (entryStateNodes.has(this.stateNode) && this.stateNode.type === 'final') {
            return [done(this.stateNode.id, this.stateNode.data)];
        }
        var childDoneEvents = flatten(keys(this.nodes).map(function (key) {
            return _this.nodes[key].getDoneEvents(entryStateNodes);
        }));
        if (this.stateNode.type === 'parallel') {
            var allChildrenDone = keys(this.nodes).every(function (key) {
                return _this.nodes[key].done;
            });
            if (childDoneEvents && allChildrenDone) {
                return childDoneEvents.concat(done(this.stateNode.id));
            } else {
                return childDoneEvents;
            }
        }
        if (!this.done || !childDoneEvents.length) {
            return childDoneEvents;
        }
        // TODO: handle merging strategy
        // For compound state nodes with final child state, there should be only
        // one done.state event (potentially with data).
        var doneData = childDoneEvents.length === 1 ? childDoneEvents[0].data : undefined;
        return childDoneEvents.concat(done(this.stateNode.id, doneData));
    };
    Object.defineProperty(StateTree.prototype, "resolved", {
        get: function () {
            var newStateTree = new StateTree(this.stateNode, this.stateNode.resolve(this.value), {
                resolved: true
            });
            newStateTree.reentryNodes = this.reentryNodes;
            return newStateTree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTree.prototype, "paths", {
        get: function () {
            return toStatePaths(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTree.prototype, "absolute", {
        get: function () {
            var _stateValue = this.stateValue;
            var absoluteStateValue = {};
            var marker = absoluteStateValue;
            for (var i = 0; i < this.stateNode.path.length; i++) {
                var key = this.stateNode.path[i];
                if (i === this.stateNode.path.length - 1) {
                    marker[key] = _stateValue;
                } else {
                    marker[key] = {};
                    marker = marker[key];
                }
            }
            var newStateTree = new StateTree(this.stateNode.machine, absoluteStateValue);
            newStateTree.reentryNodes = this.reentryNodes;
            return newStateTree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateTree.prototype, "nextEvents", {
        get: function () {
            var _this = this;
            var ownEvents = this.stateNode.ownEvents;
            var childEvents = flatten(keys(this.nodes).map(function (key) {
                var subTree = _this.nodes[key];
                return subTree.nextEvents;
            }));
            return __spread$3(new Set(childEvents.concat(ownEvents)));
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.clone = function () {
        var newStateTree = new StateTree(this.stateNode, this.value, undefined, this.parent);
        return newStateTree;
    };
    StateTree.prototype.combine = function (tree) {
        var _a, e_1, _b;
        if (tree.stateNode !== this.stateNode) {
            throw new Error('Cannot combine distinct trees');
        }
        var newTree = this.clone();
        tree.root.reentryNodes.forEach(function (reentryNode) {
            newTree.root.addReentryNode(reentryNode);
        });
        if (this.stateNode.type === 'compound') {
            // Only combine if no child state is defined
            var newValue = void 0;
            if (!keys(this.nodes).length || !keys(tree.nodes).length) {
                newValue = Object.assign({}, this.nodes, tree.nodes);
                newTree.nodes = newValue;
                return newTree;
            } else {
                var childKey = keys(this.nodes)[0];
                newValue = (_a = {}, _a[childKey] = this.nodes[childKey].combine(tree.nodes[childKey]), _a);
                newTree.nodes = newValue;
                return newTree;
            }
        }
        if (this.stateNode.type === 'parallel') {
            var valueKeys = new Set(__spread$3(keys(this.nodes), keys(tree.nodes)));
            var newValue = {};
            try {
                for (var valueKeys_1 = __values$1(valueKeys), valueKeys_1_1 = valueKeys_1.next(); !valueKeys_1_1.done; valueKeys_1_1 = valueKeys_1.next()) {
                    var key = valueKeys_1_1.value;
                    if (!this.nodes[key] || !tree.nodes[key]) {
                        newValue[key] = this.nodes[key] || tree.nodes[key];
                    } else {
                        newValue[key] = this.nodes[key].combine(tree.nodes[key]);
                    }
                }
            } catch (e_1_1) {
                e_1 = { error: e_1_1 };
            } finally {
                try {
                    if (valueKeys_1_1 && !valueKeys_1_1.done && (_b = valueKeys_1.return)) _b.call(valueKeys_1);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
            newTree.nodes = newValue;
            return newTree;
        }
        // nothing to do
        return this;
    };
    Object.defineProperty(StateTree.prototype, "value", {
        get: function () {
            if (this.stateNode.type === 'atomic' || this.stateNode.type === 'final') {
                return {};
            }
            if (this.stateNode.type === 'parallel') {
                return mapValues(this.nodes, function (st) {
                    return st.value;
                });
            }
            if (this.stateNode.type === 'compound') {
                if (keys(this.nodes).length === 0) {
                    return {};
                }
                var childStateNode = this.nodes[keys(this.nodes)[0]].stateNode;
                if (childStateNode.type === 'atomic' || childStateNode.type === 'final') {
                    return childStateNode.key;
                }
                return mapValues(this.nodes, function (st) {
                    return st.value;
                });
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    StateTree.prototype.matches = function (parentValue) {
        return matchesState(parentValue, this.value);
    };
    StateTree.prototype.getEntryExitStates = function (prevTree) {
        var _this = this;
        var e_2, _a;
        var externalNodes = this.root.reentryNodes;
        if (!prevTree) {
            // Initial state
            return {
                exit: [],
                entry: __spread$3(externalNodes)
            };
        }
        if (prevTree.stateNode !== this.stateNode) {
            throw new Error('Cannot compare distinct trees');
        }
        switch (this.stateNode.type) {
            case 'compound':
                var compoundResult = {
                    exit: [],
                    entry: []
                };
                var currentChildKey = keys(this.nodes)[0];
                var prevChildKey = keys(prevTree.nodes)[0];
                if (currentChildKey !== prevChildKey) {
                    compoundResult.exit = prevTree.nodes[prevChildKey].getExitStates();
                    compoundResult.entry = this.nodes[currentChildKey].getEntryStates();
                } else {
                    compoundResult = this.nodes[currentChildKey].getEntryExitStates(prevTree.nodes[prevChildKey]);
                }
                if (externalNodes && externalNodes.has(this.stateNode)) {
                    compoundResult.exit.push(this.stateNode);
                    compoundResult.entry.unshift(this.stateNode);
                }
                return compoundResult;
            case 'parallel':
                var all = keys(this.nodes).map(function (key) {
                    return _this.nodes[key].getEntryExitStates(prevTree.nodes[key]);
                });
                var parallelResult = {
                    exit: [],
                    entry: []
                };
                try {
                    for (var all_1 = __values$1(all), all_1_1 = all_1.next(); !all_1_1.done; all_1_1 = all_1.next()) {
                        var ees = all_1_1.value;
                        parallelResult.exit = __spread$3(parallelResult.exit, ees.exit);
                        parallelResult.entry = __spread$3(parallelResult.entry, ees.entry);
                    }
                } catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                } finally {
                    try {
                        if (all_1_1 && !all_1_1.done && (_a = all_1.return)) _a.call(all_1);
                    } finally {
                        if (e_2) throw e_2.error;
                    }
                }
                if (externalNodes && externalNodes.has(this.stateNode)) {
                    parallelResult.exit.push(this.stateNode);
                    parallelResult.entry.unshift(this.stateNode);
                }
                return parallelResult;
            case 'atomic':
            default:
                if (externalNodes && externalNodes.has(this.stateNode)) {
                    return {
                        exit: [this.stateNode],
                        entry: [this.stateNode]
                    };
                }
                return {
                    exit: [],
                    entry: []
                };
        }
    };
    StateTree.prototype.getEntryStates = function () {
        var _this = this;
        if (!this.nodes) {
            return [this.stateNode];
        }
        return [this.stateNode].concat(flatten(keys(this.nodes).map(function (key) {
            return _this.nodes[key].getEntryStates();
        })));
    };
    StateTree.prototype.getExitStates = function () {
        var _this = this;
        if (!this.nodes) {
            return [this.stateNode];
        }
        return flatten(keys(this.nodes).map(function (key) {
            return _this.nodes[key].getExitStates();
        })).concat(this.stateNode);
    };
    StateTree.prototype.addReentryNode = function (reentryNode) {
        this.root.reentryNodes.add(reentryNode);
    };
    return StateTree;
}();

var __values$2 = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
function getChildren(stateNode) {
    return keys(stateNode.states).map(function (key) {
        return stateNode.states[key];
    });
}
function getConfiguration(prevStateNodes, stateNodes) {
    var e_1, _a, e_2, _b, e_3, _c;
    var prevConfiguration = new Set(prevStateNodes);
    var prevAdjList = getAdjList(prevConfiguration);
    var configuration = new Set(stateNodes);
    try {
        // add all ancestors
        for (var configuration_1 = __values$2(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
            var s = configuration_1_1.value;
            var m = s.parent;
            while (m && !configuration.has(m)) {
                configuration.add(m);
                m = m.parent;
            }
        }
    } catch (e_1_1) {
        e_1 = { error: e_1_1 };
    } finally {
        try {
            if (configuration_1_1 && !configuration_1_1.done && (_a = configuration_1.return)) _a.call(configuration_1);
        } finally {
            if (e_1) throw e_1.error;
        }
    }
    var adjList = getAdjList(configuration);
    try {
        // console.log('KEYS:', [...adjList.keys()].map(k => k.id));
        // add descendants
        for (var configuration_2 = __values$2(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()) {
            var s = configuration_2_1.value;
            if (s.type === 'compound' && (!adjList.get(s) || !adjList.get(s).length)) {
                if (prevAdjList.get(s)) {
                    prevAdjList.get(s).forEach(function (sn) {
                        return configuration.add(sn);
                    });
                } else {
                    s.initialStateNodes.forEach(function (sn) {
                        return configuration.add(sn);
                    });
                }
            } else {
                if (s.type === 'parallel') {
                    try {
                        for (var _d = __values$2(getChildren(s)), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var child = _e.value;
                            if (!configuration.has(child)) {
                                configuration.add(child);
                                if (prevAdjList.get(child)) {
                                    prevAdjList.get(child).forEach(function (sn) {
                                        return configuration.add(sn);
                                    });
                                } else {
                                    child.initialStateNodes.forEach(function (sn) {
                                        return configuration.add(sn);
                                    });
                                }
                            }
                        }
                    } catch (e_3_1) {
                        e_3 = { error: e_3_1 };
                    } finally {
                        try {
                            if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                        } finally {
                            if (e_3) throw e_3.error;
                        }
                    }
                }
            }
        }
    } catch (e_2_1) {
        e_2 = { error: e_2_1 };
    } finally {
        try {
            if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return)) _b.call(configuration_2);
        } finally {
            if (e_2) throw e_2.error;
        }
    }
    return configuration;
}
function getValueFromAdj(baseNode, adjList) {
    var stateValue = {};
    var childStateNodes = adjList.get(baseNode);
    if (!childStateNodes) {
        return {}; // todo: fix?
    }
    if (baseNode.type === 'compound') {
        if (childStateNodes[0]) {
            if (childStateNodes[0].type === 'atomic') {
                return childStateNodes[0].key;
            }
        } else {
            return {};
        }
    }
    childStateNodes.forEach(function (csn) {
        stateValue[csn.key] = getValueFromAdj(csn, adjList);
    });
    return stateValue;
}
function getAdjList(configuration) {
    var e_4, _a;
    var adjList = new Map();
    try {
        for (var configuration_3 = __values$2(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()) {
            var s = configuration_3_1.value;
            if (!adjList.has(s)) {
                adjList.set(s, []);
            }
            if (s.parent) {
                if (!adjList.has(s.parent)) {
                    adjList.set(s.parent, []);
                }
                adjList.get(s.parent).push(s);
            }
        }
    } catch (e_4_1) {
        e_4 = { error: e_4_1 };
    } finally {
        try {
            if (configuration_3_1 && !configuration_3_1.done && (_a = configuration_3.return)) _a.call(configuration_3);
        } finally {
            if (e_4) throw e_4.error;
        }
    }
    // console.log(
    //   [...adjList.keys()].map(key => [key.id, adjList.get(key)!.map(sn => sn.id)])
    // );
    return adjList;
}
function getValue(rootNode, configuration) {
    var config = getConfiguration([rootNode], configuration);
    return getValueFromAdj(rootNode, getAdjList(config));
}

var __assign$4 = undefined && undefined.__assign || function () {
    __assign$4 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$4.apply(this, arguments);
};
var __rest$1 = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
};
var __read$4 = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread$4 = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$4(arguments[i]));
    return ar;
};
var __values$3 = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var STATE_DELIMITER$1 = '.';
var NULL_EVENT = '';
var STATE_IDENTIFIER = '#';
var TARGETLESS_KEY = '';
var EMPTY_OBJECT = {};
var isStateId = function (str) {
    return str[0] === STATE_IDENTIFIER;
};
var createDefaultOptions = function () {
    return {
        actions: {},
        guards: {},
        services: {},
        activities: {},
        delays: {},
        updater: updateContext
    };
};
var StateNode = /** @class */ /*#__PURE__*/function () {
    function StateNode(_config, options,
    /**
     * The initial extended state
     */
    context) {
        var _this = this;
        this.context = context;
        this.__xstatenode = true;
        this.__cache = {
            events: undefined,
            relativeValue: new Map(),
            initialStateValue: undefined,
            initialState: undefined,
            transitions: undefined
        };
        this.idMap = {};
        var parent = _config.parent,
            config = __rest$1(_config, ["parent"]);
        this.config = config;
        this.parent = parent;
        this.options = __assign$4({}, createDefaultOptions(), options);
        this.key = _config.key || _config.id || '(machine)';
        this.machine = this.parent ? this.parent.machine : this;
        this.path = this.parent ? this.parent.path.concat(this.key) : [];
        this.delimiter = _config.delimiter || (this.parent ? this.parent.delimiter : STATE_DELIMITER$1);
        this.id = _config.id || (this.machine ? __spread$4([this.machine.key], this.path).join(this.delimiter) : this.key);
        this.version = this.parent ? this.parent.version : _config.version;
        this.type = _config.type || (_config.parallel ? 'parallel' : _config.states && keys(_config.states).length ? 'compound' : _config.history ? 'history' : 'atomic');
        this.initial = _config.initial;
        this.order = _config.order || -1;
        this.states = _config.states ? mapValues(_config.states, function (stateConfig, key, _, i) {
            var _a;
            var stateNode = new StateNode(__assign$4({}, stateConfig, { key: key, order: stateConfig.order === undefined ? i : stateConfig.order, parent: _this }));
            Object.assign(_this.idMap, __assign$4((_a = {}, _a[stateNode.id] = stateNode, _a), stateNode.idMap));
            return stateNode;
        }) : EMPTY_OBJECT;
        // History config
        this.history = _config.history === true ? 'shallow' : _config.history || false;
        this._transient = !!(_config.on && _config.on[NULL_EVENT]);
        this.strict = !!_config.strict;
        // TODO: deprecate (entry)
        this.onEntry = toArray(_config.entry || _config.onEntry).map(function (action) {
            return toActionObject(action);
        });
        // TODO: deprecate (exit)
        this.onExit = toArray(_config.exit || _config.onExit).map(function (action) {
            return toActionObject(action);
        });
        this.meta = _config.meta;
        this.data = this.type === 'final' ? _config.data : undefined;
        this.invoke = toArray(_config.invoke).map(function (invokeConfig, i) {
            var _a, _b;
            if (isMachine(invokeConfig)) {
                (_this.parent || _this).options.services = __assign$4((_a = {}, _a[invokeConfig.id] = invokeConfig, _a), (_this.parent || _this).options.services);
                return {
                    type: invoke,
                    src: invokeConfig.id,
                    id: invokeConfig.id
                };
            } else if (typeof invokeConfig.src !== 'string') {
                var invokeSrc = _this.id + ":invocation[" + i + "]"; // TODO: util function
                _this.machine.options.services = __assign$4((_b = {}, _b[invokeSrc] = invokeConfig.src, _b), _this.machine.options.services);
                return __assign$4({ type: invoke, id: invokeSrc }, invokeConfig, { src: invokeSrc });
            } else {
                return __assign$4({}, invokeConfig, { type: invoke, id: invokeConfig.id || invokeConfig.src, src: invokeConfig.src });
            }
        });
        this.activities = toArray(_config.activities).concat(this.invoke).map(function (activity) {
            return toActivityDefinition(activity);
        });
        this.after = this.getDelayedTransitions();
    }
    /**
     * Clones this state machine with custom options and context.
     *
     * @param options Options (actions, guards, activities, services) to recursively merge with the existing options.
     * @param context Custom context (will override predefined context)
     */
    StateNode.prototype.withConfig = function (options, context) {
        if (context === void 0) {
            context = this.context;
        }
        var _a = this.options,
            actions = _a.actions,
            activities = _a.activities,
            guards = _a.guards,
            services = _a.services,
            delays = _a.delays;
        return new StateNode(this.config, {
            actions: __assign$4({}, actions, options.actions),
            activities: __assign$4({}, activities, options.activities),
            guards: __assign$4({}, guards, options.guards),
            services: __assign$4({}, services, options.services),
            delays: __assign$4({}, delays, options.delays)
        }, context);
    };
    /**
     * Clones this state machine with custom context.
     *
     * @param context Custom context (will override predefined context, not recursive)
     */
    StateNode.prototype.withContext = function (context) {
        return new StateNode(this.config, this.options, context);
    };
    Object.defineProperty(StateNode.prototype, "definition", {
        /**
         * The well-structured state node definition.
         */
        get: function () {
            return {
                id: this.id,
                key: this.key,
                version: this.version,
                type: this.type,
                initial: this.initial,
                history: this.history,
                states: mapValues(this.states, function (state) {
                    return state.definition;
                }),
                on: this.on,
                onEntry: this.onEntry,
                onExit: this.onExit,
                activities: this.activities || [],
                meta: this.meta,
                order: this.order || -1,
                data: this.data,
                invoke: this.invoke
            };
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.toJSON = function () {
        return this.definition;
    };
    Object.defineProperty(StateNode.prototype, "on", {
        /**
         * The mapping of events to transitions.
         */
        get: function () {
            return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateNode.prototype, "transitions", {
        /**
         * All the transitions that can be taken from this state node.
         */
        get: function () {
            var _this = this;
            return flatten(keys(this.on).map(function (event) {
                return _this.on[event];
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * All delayed transitions from the config.
     */
    StateNode.prototype.getDelayedTransitions = function () {
        var _this = this;
        if (this.after) {
            return this.after;
        }
        var afterConfig = this.config.after;
        var guards = this.machine.options.guards;
        if (!afterConfig) {
            return [];
        }
        if (isArray(afterConfig)) {
            return afterConfig.map(function (delayedTransition, i) {
                var delay = delayedTransition.delay,
                    target = delayedTransition.target;
                var delayRef;
                if (isFunction(delay)) {
                    delayRef = _this.id + ":delay[" + i + "]";
                    _this.options.delays[delayRef] = delay; // TODO: util function
                } else {
                    delayRef = delay;
                }
                var event = after(delayRef, _this.id);
                _this.onEntry.push(send$1(event, { delay: delay }));
                _this.onExit.push(cancel$1(event));
                return __assign$4({ event: event }, delayedTransition, { source: _this, target: target === undefined ? undefined : toArray(target), cond: toGuard(delayedTransition.cond, guards), actions: toArray(delayedTransition.actions).map(function (action) {
                        return toActionObject(action);
                    }) });
            });
        }
        var allDelayedTransitions = flatten(keys(afterConfig).map(function (delayKey) {
            var delayedTransition = afterConfig[delayKey];
            var delay = isNaN(+delayKey) ? delayKey : +delayKey;
            var event = after(delay, _this.id);
            _this.onEntry.push(send$1(event, { delay: delay }));
            _this.onExit.push(cancel$1(event));
            if (isString(delayedTransition)) {
                return [{
                    source: _this,
                    target: [delayedTransition],
                    delay: delay,
                    event: event,
                    actions: []
                }];
            }
            var delayedTransitions = toArray(delayedTransition);
            return delayedTransitions.map(function (transition) {
                return __assign$4({ event: event,
                    delay: delay }, transition, { source: _this, target: transition.target === undefined ? transition.target : toArray(transition.target), cond: toGuard(transition.cond, guards), actions: toArray(transition.actions).map(function (action) {
                        return toActionObject(action);
                    }) });
            });
        }));
        allDelayedTransitions.sort(function (a, b) {
            return isString(a) || isString(b) ? 0 : +a.delay - +b.delay;
        });
        return allDelayedTransitions;
    };
    /**
     * Returns the state nodes represented by the current state value.
     *
     * @param state The state value or State instance
     */
    StateNode.prototype.getStateNodes = function (state) {
        var _this = this;
        var _a;
        if (!state) {
            return [];
        }
        var stateValue = state instanceof State ? state.value : toStateValue(state, this.delimiter);
        if (isString(stateValue)) {
            var initialStateValue = this.getStateNode(stateValue).initial;
            return initialStateValue !== undefined ? this.getStateNodes((_a = {}, _a[stateValue] = initialStateValue, _a)) : [this.states[stateValue]];
        }
        var subStateKeys = keys(stateValue);
        var subStateNodes = subStateKeys.map(function (subStateKey) {
            return _this.getStateNode(subStateKey);
        });
        return subStateNodes.concat(subStateKeys.reduce(function (allSubStateNodes, subStateKey) {
            var subStateNode = _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
            return allSubStateNodes.concat(subStateNode);
        }, []));
    };
    /**
     * Returns `true` if this state node explicitly handles the given event.
     *
     * @param event The event in question
     */
    StateNode.prototype.handles = function (event) {
        var eventType = getEventType(event);
        return this.events.indexOf(eventType) !== -1;
    };
    /**
     * Resolves the given `state` to a new `State` instance relative to this machine.
     *
     * This ensures that `.events` and `.nextEvents` represent the correct values.
     *
     * @param state The state to resolve
     */
    StateNode.prototype.resolveState = function (state) {
        return new State(__assign$4({}, state, { value: this.resolve(state.value), tree: this.getStateTree(state.value) }));
    };
    StateNode.prototype.transitionLeafNode = function (stateValue, state, eventObject) {
        var stateNode = this.getStateNode(stateValue);
        var next = stateNode.next(state, eventObject);
        if (!next.tree) {
            var _a = this.next(state, eventObject),
                actions = _a.actions,
                tree = _a.tree,
                transitions = _a.transitions,
                configuration = _a.configuration;
            return {
                tree: tree,
                transitions: transitions,
                configuration: configuration,
                source: state,
                actions: actions
            };
        }
        return next;
    };
    StateNode.prototype.transitionCompoundNode = function (stateValue, state, eventObject) {
        var subStateKeys = keys(stateValue);
        var stateNode = this.getStateNode(subStateKeys[0]);
        var next = stateNode._transition(stateValue[subStateKeys[0]], state, eventObject);
        if (!next.tree) {
            var _a = this.next(state, eventObject),
                actions = _a.actions,
                tree = _a.tree,
                transitions = _a.transitions,
                configuration = _a.configuration;
            return {
                tree: tree,
                transitions: transitions,
                configuration: configuration,
                source: state,
                actions: actions
            };
        }
        return next;
    };
    StateNode.prototype.transitionParallelNode = function (stateValue, state, eventObject) {
        var e_1, _a;
        var transitionMap = {};
        try {
            for (var _b = __values$3(keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var subStateKey = _c.value;
                var subStateValue = stateValue[subStateKey];
                if (!subStateValue) {
                    continue;
                }
                var subStateNode = this.getStateNode(subStateKey);
                var next = subStateNode._transition(subStateValue, state, eventObject);
                transitionMap[subStateKey] = next;
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
                if (e_1) throw e_1.error;
            }
        }
        var stateTransitions = keys(transitionMap).map(function (key) {
            return transitionMap[key];
        });
        var enabledTransitions = flatten(stateTransitions.map(function (st) {
            return st.transitions;
        }));
        var willTransition = stateTransitions.some(function (transition) {
            return transition.tree !== undefined;
        });
        if (!willTransition) {
            var _d = this.next(state, eventObject),
                actions = _d.actions,
                tree = _d.tree,
                transitions = _d.transitions,
                _configuration = _d.configuration;
            return {
                tree: tree,
                transitions: transitions,
                configuration: _configuration,
                source: state,
                actions: actions
            };
        }
        var targetNodes = flatten(stateTransitions.map(function (st) {
            return st.configuration;
        }));
        var prevNodes = this.getStateNodes(stateValue);
        // console.log(targetNodes.map(t => t.id));
        // console.log([...getConfiguration(prevNodes, targetNodes)].map(c => c.id));
        var stateValueFromConfiguration = getValue(this.machine, getConfiguration(prevNodes, targetNodes));
        // console.log(sv);
        var combinedTree = new StateTree(this.machine, stateValueFromConfiguration);
        // const allTrees = keys(transitionMap)
        //   .map(key => transitionMap[key].tree)
        //   .filter(t => t !== undefined) as StateTree[];
        // const combinedTree = allTrees.reduce((acc, t) => {
        //   return acc.combine(t);
        // });
        var allPaths = combinedTree.paths;
        var configuration = flatten(keys(transitionMap).map(function (key) {
            return transitionMap[key].configuration;
        }));
        // External transition that escapes orthogonal region
        if (allPaths.length === 1 && !matchesState(toStateValue(this.path, this.delimiter), combinedTree.value)) {
            return {
                tree: combinedTree,
                transitions: enabledTransitions,
                configuration: configuration,
                source: state,
                actions: flatten(keys(transitionMap).map(function (key) {
                    return transitionMap[key].actions;
                }))
            };
        }
        // const allResolvedTrees = keys(transitionMap).map(key => {
        //   const { tree } = transitionMap[key];
        //   if (tree) {
        //     return tree;
        //   }
        //   const subValue = path(this.path)(state.value)[key];
        //   return new StateTree(this.getStateNode(key), subValue).absolute;
        // });
        // const finalCombinedTree = allResolvedTrees.reduce((acc, t) => {
        //   return acc.combine(t);
        // });
        return {
            tree: combinedTree,
            transitions: enabledTransitions,
            configuration: configuration,
            source: state,
            actions: flatten(keys(transitionMap).map(function (key) {
                return transitionMap[key].actions;
            }))
        };
    };
    StateNode.prototype._transition = function (stateValue, state, event) {
        // leaf node
        if (isString(stateValue)) {
            return this.transitionLeafNode(stateValue, state, event);
        }
        // hierarchical node
        if (keys(stateValue).length === 1) {
            return this.transitionCompoundNode(stateValue, state, event);
        }
        // orthogonal node
        return this.transitionParallelNode(stateValue, state, event);
    };
    StateNode.prototype.next = function (state, eventObject) {
        var _this = this;
        var e_2, _a;
        var eventType = eventObject.type;
        var candidates = this.on[eventType];
        if (!candidates || !candidates.length) {
            return {
                tree: undefined,
                transitions: [],
                configuration: [],
                source: state,
                actions: []
            };
        }
        var actions = this._transient ? [{ type: nullEvent }] : [];
        var nextStateStrings = [];
        var selectedTransition;
        try {
            for (var candidates_1 = __values$3(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                var candidate = candidates_1_1.value;
                var cond = candidate.cond,
                    stateIn = candidate.in;
                var resolvedContext = state.context;
                var isInState = stateIn ? isString(stateIn) && isStateId(stateIn) ? // Check if in state by ID
                state.matches(toStateValue(this.getStateNodeById(stateIn).path, this.delimiter)) : // Check if in state by relative grandparent
                matchesState(toStateValue(stateIn, this.delimiter), path(this.path.slice(0, -2))(state.value)) : true;
                var guardPassed = false;
                try {
                    guardPassed = !cond || this.evaluateGuard(cond, resolvedContext, eventObject, state);
                } catch (err) {
                    throw new Error("Unable to evaluate guard '" + (cond.name || cond.type) + "' in transition for event '" + eventType + "' in state node '" + this.id + "':\n" + err.message);
                }
                if (guardPassed && isInState) {
                    if (candidate.target !== undefined) {
                        nextStateStrings = candidate.target;
                    }
                    actions.push.apply(actions, __spread$4(toArray(candidate.actions)));
                    selectedTransition = candidate;
                    break;
                }
            }
        } catch (e_2_1) {
            e_2 = { error: e_2_1 };
        } finally {
            try {
                if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
            } finally {
                if (e_2) throw e_2.error;
            }
        }
        if (!nextStateStrings.length) {
            return {
                tree: selectedTransition && state.value // targetless transition
                ? new StateTree(this, path(this.path)(state.value)).absolute : undefined,
                transitions: [selectedTransition],
                configuration: selectedTransition && state.value ? [this] : [],
                source: state,
                actions: actions
            };
        }
        var nextStateNodes = flatten(nextStateStrings.map(function (str) {
            if (str instanceof StateNode) {
                return str; // TODO: fix anys
            }
            return _this.getRelativeStateNodes(str, state.historyValue);
        }));
        var isInternal = !!selectedTransition.internal;
        var reentryNodes = isInternal ? [] : flatten(nextStateNodes.map(function (n) {
            return _this.nodesFromChild(n);
        }));
        var trees = nextStateNodes.map(function (stateNode) {
            return stateNode.tree;
        });
        var combinedTree = trees.reduce(function (acc, t) {
            return acc.combine(t);
        });
        reentryNodes.forEach(function (reentryNode) {
            return combinedTree.addReentryNode(reentryNode);
        });
        return {
            tree: combinedTree,
            transitions: [selectedTransition],
            configuration: nextStateNodes,
            source: state,
            actions: actions
        };
    };
    Object.defineProperty(StateNode.prototype, "tree", {
        /**
         * The state tree represented by this state node.
         */
        get: function () {
            var stateValue = toStateValue(this.path, this.delimiter);
            return new StateTree(this.machine, stateValue);
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.nodesFromChild = function (childStateNode) {
        if (childStateNode.escapes(this)) {
            return [];
        }
        var nodes = [];
        var marker = childStateNode;
        while (marker && marker !== this) {
            nodes.push(marker);
            marker = marker.parent;
        }
        nodes.push(this); // inclusive
        return nodes;
    };
    StateNode.prototype.getStateTree = function (stateValue) {
        return new StateTree(this, stateValue);
    };
    /**
     * Whether the given state node "escapes" this state node. If the `stateNode` is equal to or the parent of
     * this state node, it does not escape.
     */
    StateNode.prototype.escapes = function (stateNode) {
        if (this === stateNode) {
            return false;
        }
        var parent = this.parent;
        while (parent) {
            if (parent === stateNode) {
                return false;
            }
            parent = parent.parent;
        }
        return true;
    };
    StateNode.prototype.evaluateGuard = function (guard, context, eventObject, state) {
        var condFn;
        var guards = this.machine.options.guards;
        var guardMeta = {
            state: state,
            cond: guard
        };
        // TODO: do not hardcode!
        if (guard.type === DEFAULT_GUARD_TYPE) {
            return guard.predicate(context, eventObject, guardMeta);
        }
        if (!guards[guard.type]) {
            throw new Error("Guard '" + guard.type + "' is not implemented on machine '" + this.machine.id + "'.");
        }
        condFn = guards[guard.type];
        return condFn(context, eventObject, guardMeta);
    };
    StateNode.prototype.getActions = function (transition, prevState) {
        var entryExitStates = transition.tree ? transition.tree.resolved.getEntryExitStates(prevState ? this.getStateTree(prevState.value) : undefined) : { entry: [], exit: [] };
        var doneEvents = transition.tree ? transition.tree.getDoneEvents(new Set(entryExitStates.entry)) : [];
        if (!transition.source) {
            entryExitStates.exit = [];
            // Ensure that root StateNode (machine) is entered
            entryExitStates.entry.unshift(this);
        }
        var entryStates = new Set(entryExitStates.entry);
        var exitStates = new Set(entryExitStates.exit);
        var _a = __read$4([flatten(Array.from(entryStates).map(function (stateNode) {
            return __spread$4(stateNode.activities.map(function (activity) {
                return start$1(activity);
            }), stateNode.onEntry);
        })).concat(doneEvents.map(raise$1)), flatten(Array.from(exitStates).map(function (stateNode) {
            return __spread$4(stateNode.onExit, stateNode.activities.map(function (activity) {
                return stop$1(activity);
            }));
        }))], 2),
            entryActions = _a[0],
            exitActions = _a[1];
        var actions = toActionObjects(exitActions.concat(transition.actions).concat(entryActions), this.machine.options.actions);
        return actions;
    };
    /**
     * Determines the next state given the current `state` and sent `event`.
     *
     * @param state The current State instance or state value
     * @param event The event that was sent at the current state
     * @param context The current context (extended state) of the current state
     */
    StateNode.prototype.transition = function (state, event, context) {
        var currentState;
        if (state instanceof State) {
            currentState = context === undefined ? state : this.resolveState(State.from(state, context));
        } else {
            var resolvedStateValue = isString(state) ? this.resolve(pathToStateValue(this.getResolvedPath(state))) : this.resolve(state);
            var resolvedContext = context ? context : this.machine.context;
            currentState = this.resolveState(State.from(resolvedStateValue, resolvedContext));
        }
        var eventObject = toEventObject(event);
        var eventType = eventObject.type;
        if (this.strict) {
            if (this.events.indexOf(eventType) === -1 && !isBuiltInEvent(eventType)) {
                throw new Error("Machine '" + this.id + "' does not accept event '" + eventType + "'");
            }
        }
        var stateTransition = this._transition(currentState.value, currentState, eventObject);
        if (stateTransition.tree) {
            stateTransition.tree = stateTransition.tree.resolved;
        }
        // const prevConfig = this.machine.getStateNodes(currentState.value);
        // const cv = getValue(
        //   this.machine,
        //   getConfiguration(prevConfig, stateTransition.configuration)
        // );
        // if (stateTransition.tree) {
        //   const eq = stateValuesEqual(cv, stateTransition.tree.value);
        //   console.log(eq);
        // }
        // if (!eq) {
        //   console.log('prevConfig', prevConfig.map(c => c.id));
        //   console.log('config', [...stateTransition.configuration].map(c => c.id));
        //   console.log(cv, stateTransition.tree!.value);
        // }
        return this.resolveTransition(stateTransition, currentState, eventObject);
    };
    StateNode.prototype.resolveTransition = function (stateTransition, currentState, _eventObject) {
        var _this = this;
        var e_3, _a, _b;
        var resolvedStateValue = stateTransition.tree ? stateTransition.tree.value : undefined;
        var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : undefined : undefined;
        var currentContext = currentState ? currentState.context : stateTransition.context || this.machine.context;
        var eventObject = _eventObject || { type: ActionTypes.Init };
        var actions = this.getActions(stateTransition, currentState);
        var activities = currentState ? __assign$4({}, currentState.activities) : {};
        try {
            for (var actions_1 = __values$3(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
                var action = actions_1_1.value;
                if (action.type === start) {
                    activities[action.activity.type] = action;
                } else if (action.type === stop) {
                    activities[action.activity.type] = false;
                }
            }
        } catch (e_3_1) {
            e_3 = { error: e_3_1 };
        } finally {
            try {
                if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return)) _a.call(actions_1);
            } finally {
                if (e_3) throw e_3.error;
            }
        }
        var _c = __read$4(partition(actions, function (action) {
            return action.type === raise || action.type === nullEvent;
        }), 2),
            raisedEvents = _c[0],
            otherActions = _c[1];
        var _d = __read$4(partition(otherActions, function (action) {
            return action.type === assign;
        }), 2),
            assignActions = _d[0],
            nonEventActions = _d[1];
        var updatedContext = assignActions.length ? this.options.updater(currentContext, eventObject, assignActions) : currentContext;
        var resolvedActions = flatten(nonEventActions.map(function (actionObject) {
            if (actionObject.type === send) {
                var sendAction = resolveSend(actionObject, updatedContext, eventObject || { type: ActionTypes.Init }); // TODO: fix ActionTypes.Init
                if (isString(sendAction.delay)) {
                    if (!_this.machine.options.delays || _this.machine.options.delays[sendAction.delay] === undefined) {
                        // Do not send anything
                        return sendAction;
                    }
                    var delayExpr = _this.machine.options.delays[sendAction.delay];
                    sendAction.delay = typeof delayExpr === 'number' ? delayExpr : delayExpr(updatedContext, eventObject || { type: ActionTypes.Init });
                }
                return sendAction;
            }
            if (actionObject.type === ActionTypes.Pure) {
                return actionObject.get(updatedContext, eventObject) || [];
            }
            return toActionObject(actionObject, _this.options.actions);
        }));
        var stateNodes = resolvedStateValue ? this.getStateNodes(resolvedStateValue) : [];
        var isTransient = stateNodes.some(function (stateNode) {
            return stateNode._transient;
        });
        if (isTransient) {
            raisedEvents.push({ type: nullEvent });
        }
        var meta = __spread$4([this], stateNodes).reduce(function (acc, stateNode) {
            if (stateNode.meta !== undefined) {
                acc[stateNode.id] = stateNode.meta;
            }
            return acc;
        }, {});
        var nextState = new State({
            value: resolvedStateValue || currentState.value,
            context: updatedContext,
            event: eventObject || initEvent,
            historyValue: resolvedStateValue ? historyValue ? updateHistoryValue(historyValue, resolvedStateValue) : undefined : currentState ? currentState.historyValue : undefined,
            history: !resolvedStateValue || stateTransition.source ? currentState : undefined,
            actions: resolvedStateValue ? resolvedActions : [],
            activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
            meta: resolvedStateValue ? meta : currentState ? currentState.meta : undefined,
            events: resolvedStateValue ? raisedEvents : [],
            tree: resolvedStateValue ? stateTransition.tree : currentState ? currentState.tree : undefined
        });
        nextState.changed = eventObject.type === update || !!assignActions.length;
        // Dispose of penultimate histories to prevent memory leaks
        var history = nextState.history;
        if (history) {
            delete history.history;
        }
        if (!resolvedStateValue) {
            return nextState;
        }
        var maybeNextState = nextState;
        while (raisedEvents.length) {
            var currentActions = maybeNextState.actions;
            var raisedEvent = raisedEvents.shift();
            maybeNextState = this.transition(maybeNextState, raisedEvent.type === nullEvent ? NULL_EVENT : raisedEvent.event, maybeNextState.context);
            // Save original event to state
            maybeNextState.event = eventObject;
            (_b = maybeNextState.actions).unshift.apply(_b, __spread$4(currentActions));
        }
        // Detect if state changed
        var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || !!assignActions.length || typeof history.value !== typeof maybeNextState.value || !stateValuesEqual(maybeNextState.value, history.value) : undefined);
        maybeNextState.changed = changed;
        // Preserve original history after raised events
        maybeNextState.historyValue = nextState.historyValue;
        maybeNextState.history = history;
        return maybeNextState;
    };
    StateNode.prototype.ensureValidPaths = function (paths) {
        {
            return;
        }
    };
    /**
     * Returns the child state node from its relative `stateKey`, or throws.
     */
    StateNode.prototype.getStateNode = function (stateKey) {
        if (isStateId(stateKey)) {
            return this.machine.getStateNodeById(stateKey);
        }
        if (!this.states) {
            throw new Error("Unable to retrieve child state '" + stateKey + "' from '" + this.id + "'; no child states exist.");
        }
        var result = this.states[stateKey];
        if (!result) {
            throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
        }
        return result;
    };
    /**
     * Returns the state node with the given `stateId`, or throws.
     *
     * @param stateId The state ID. The prefix "#" is removed.
     */
    StateNode.prototype.getStateNodeById = function (stateId) {
        var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
        if (resolvedStateId === this.id) {
            return this;
        }
        var stateNode = this.machine.idMap[resolvedStateId];
        if (!stateNode) {
            throw new Error("Child state node '#" + resolvedStateId + "' does not exist on machine '" + this.id + "'");
        }
        return stateNode;
    };
    /**
     * Returns the relative state node from the given `statePath`, or throws.
     *
     * @param statePath The string or string array relative path to the state node.
     */
    StateNode.prototype.getStateNodeByPath = function (statePath) {
        if (typeof statePath === 'string' && isStateId(statePath)) {
            try {
                return this.getStateNodeById(statePath.slice(1));
            } catch (e) {
                // try individual paths
                // throw e;
            }
        }
        var arrayStatePath = toStatePath(statePath, this.delimiter).slice();
        var currentStateNode = this;
        while (arrayStatePath.length) {
            var key = arrayStatePath.shift();
            if (!key.length) {
                break;
            }
            currentStateNode = currentStateNode.getStateNode(key);
        }
        return currentStateNode;
    };
    /**
     * Resolves a partial state value with its full representation in this machine.
     *
     * @param stateValue The partial state value to resolve.
     */
    StateNode.prototype.resolve = function (stateValue) {
        var _this = this;
        var _a;
        if (!stateValue) {
            return this.initialStateValue || EMPTY_OBJECT; // TODO: type-specific properties
        }
        switch (this.type) {
            case 'parallel':
                return mapValues(this.initialStateValue, function (subStateValue, subStateKey) {
                    return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
                });
            case 'compound':
                if (isString(stateValue)) {
                    var subStateNode = this.getStateNode(stateValue);
                    if (subStateNode.type === 'parallel' || subStateNode.type === 'compound') {
                        return _a = {}, _a[stateValue] = subStateNode.initialStateValue, _a;
                    }
                    return stateValue;
                }
                if (!keys(stateValue).length) {
                    return this.initialStateValue || {};
                }
                return mapValues(stateValue, function (subStateValue, subStateKey) {
                    return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
                });
            default:
                return stateValue || EMPTY_OBJECT;
        }
    };
    Object.defineProperty(StateNode.prototype, "resolvedStateValue", {
        get: function () {
            var _a, _b;
            var key = this.key;
            if (this.type === 'parallel') {
                return _a = {}, _a[key] = mapFilterValues(this.states, function (stateNode) {
                    return stateNode.resolvedStateValue[stateNode.key];
                }, function (stateNode) {
                    return !(stateNode.type === 'history');
                }), _a;
            }
            if (this.initial === undefined) {
                // If leaf node, value is just the state node's key
                return key;
            }
            if (!this.states[this.initial]) {
                throw new Error("Initial state '" + this.initial + "' not found on '" + key + "'");
            }
            return _b = {}, _b[key] = this.states[this.initial].resolvedStateValue, _b;
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.getResolvedPath = function (stateIdentifier) {
        if (isStateId(stateIdentifier)) {
            var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
            if (!stateNode) {
                throw new Error("Unable to find state node '" + stateIdentifier + "'");
            }
            return stateNode.path;
        }
        return toStatePath(stateIdentifier, this.delimiter);
    };
    Object.defineProperty(StateNode.prototype, "initialStateValue", {
        get: function () {
            if (this.__cache.initialStateValue) {
                return this.__cache.initialStateValue;
            }
            var initialStateValue = this.type === 'parallel' ? mapFilterValues(this.states, function (state) {
                return state.initialStateValue || EMPTY_OBJECT;
            }, function (stateNode) {
                return !(stateNode.type === 'history');
            }) : isString(this.resolvedStateValue) ? undefined : this.resolvedStateValue[this.key];
            this.__cache.initialStateValue = initialStateValue;
            return this.__cache.initialStateValue;
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.getInitialState = function (stateValue, context) {
        if (context === void 0) {
            context = this.machine.context;
        }
        var tree = this.getStateTree(stateValue);
        var configuration = this.getStateNodes(stateValue);
        configuration.forEach(function (stateNode) {
            tree.addReentryNode(stateNode);
        });
        return this.resolveTransition({
            tree: tree,
            configuration: configuration,
            transitions: [],
            source: undefined,
            actions: [],
            context: context
        });
    };
    Object.defineProperty(StateNode.prototype, "initialState", {
        /**
         * The initial State instance, which includes all actions to be executed from
         * entering the initial state.
         */
        get: function () {
            if (this.__cache.initialState) {
                return this.__cache.initialState;
            }
            var initialStateValue = this.initialStateValue;
            if (!initialStateValue) {
                throw new Error("Cannot retrieve initial state from simple state '" + this.id + "'.");
            }
            this.__cache.initialState = this.getInitialState(initialStateValue);
            return this.__cache.initialState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateNode.prototype, "target", {
        /**
         * The target state value of the history state node, if it exists. This represents the
         * default state value to transition to if no history value exists yet.
         */
        get: function () {
            var target;
            if (this.type === 'history') {
                var historyConfig = this.config;
                if (historyConfig.target && isString(historyConfig.target)) {
                    target = isStateId(historyConfig.target) ? pathToStateValue(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
                } else {
                    target = historyConfig.target;
                }
            }
            return target;
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.getStates = function (stateValue) {
        var e_5, _a;
        if (isString(stateValue)) {
            return [this.states[stateValue]];
        }
        var stateNodes = [];
        try {
            for (var _b = __values$3(keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                stateNodes.push.apply(stateNodes, __spread$4(this.states[key].getStates(stateValue[key])));
            }
        } catch (e_5_1) {
            e_5 = { error: e_5_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
                if (e_5) throw e_5.error;
            }
        }
        return stateNodes;
    };
    /**
     * Returns the leaf nodes from a state path relative to this state node.
     *
     * @param relativeStateId The relative state path to retrieve the state nodes
     * @param history The previous state to retrieve history
     * @param resolve Whether state nodes should resolve to initial child state nodes
     */
    StateNode.prototype.getRelativeStateNodes = function (relativeStateId, historyValue, resolve) {
        if (resolve === void 0) {
            resolve = true;
        }
        if (isString(relativeStateId) && isStateId(relativeStateId)) {
            var unresolvedStateNode = this.getStateNodeById(relativeStateId);
            return resolve ? unresolvedStateNode.type === 'history' ? unresolvedStateNode.resolveHistory(historyValue) : unresolvedStateNode.initialStateNodes : [unresolvedStateNode];
        }
        var statePath = toStatePath(relativeStateId, this.delimiter);
        var rootStateNode = this.parent || this;
        var unresolvedStateNodes = rootStateNode.getFromRelativePath(statePath, historyValue);
        if (!resolve) {
            return unresolvedStateNodes;
        }
        return flatten(unresolvedStateNodes.map(function (stateNode) {
            return stateNode.initialStateNodes;
        }));
    };
    Object.defineProperty(StateNode.prototype, "initialStateNodes", {
        get: function () {
            var _this = this;
            if (this.type === 'atomic' || this.type === 'final') {
                return [this];
            }
            // Case when state node is compound but no initial state is defined
            if (this.type === 'compound' && !this.initial) {
                return [this];
            }
            var initialStateNodePaths = toStatePaths(this.initialStateValue);
            return flatten(initialStateNodePaths.map(function (initialPath) {
                return _this.getFromRelativePath(initialPath);
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves state nodes from a relative path to this state node.
     *
     * @param relativePath The relative path from this state node
     * @param historyValue
     */
    StateNode.prototype.getFromRelativePath = function (relativePath, historyValue) {
        if (!relativePath.length) {
            return [this];
        }
        var _a = __read$4(relativePath),
            stateKey = _a[0],
            childStatePath = _a.slice(1);
        if (!this.states) {
            throw new Error("Cannot retrieve subPath '" + stateKey + "' from node with no states");
        }
        var childStateNode = this.getStateNode(stateKey);
        if (childStateNode.type === 'history') {
            return childStateNode.resolveHistory(historyValue);
        }
        if (!this.states[stateKey]) {
            throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
        }
        return this.states[stateKey].getFromRelativePath(childStatePath, historyValue);
    };
    StateNode.prototype.historyValue = function (relativeStateValue) {
        if (!keys(this.states).length) {
            return undefined;
        }
        return {
            current: relativeStateValue || this.initialStateValue,
            states: mapFilterValues(this.states, function (stateNode, key) {
                if (!relativeStateValue) {
                    return stateNode.historyValue();
                }
                var subStateValue = isString(relativeStateValue) ? undefined : relativeStateValue[key];
                return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
            }, function (stateNode) {
                return !stateNode.history;
            })
        };
    };
    /**
     * Resolves to the historical value(s) of the parent state node,
     * represented by state nodes.
     *
     * @param historyValue
     */
    StateNode.prototype.resolveHistory = function (historyValue) {
        var _this = this;
        if (this.type !== 'history') {
            return [this];
        }
        var parent = this.parent;
        if (!historyValue) {
            return this.target ? flatten(toStatePaths(this.target).map(function (relativeChildPath) {
                return parent.getFromRelativePath(relativeChildPath);
            })) : parent.initialStateNodes;
        }
        var subHistoryValue = nestedPath(parent.path, 'states')(historyValue).current;
        if (isString(subHistoryValue)) {
            return [parent.getStateNode(subHistoryValue)];
        }
        return flatten(toStatePaths(subHistoryValue).map(function (subStatePath) {
            return _this.history === 'deep' ? parent.getFromRelativePath(subStatePath) : [parent.states[subStatePath[0]]];
        }));
    };
    Object.defineProperty(StateNode.prototype, "stateIds", {
        /**
         * All the state node IDs of this state node and its descendant state nodes.
         */
        get: function () {
            var _this = this;
            var childStateIds = flatten(keys(this.states).map(function (stateKey) {
                return _this.states[stateKey].stateIds;
            }));
            return [this.id].concat(childStateIds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateNode.prototype, "events", {
        /**
         * All the event types accepted by this state node and its descendants.
         */
        get: function () {
            var e_6, _a, e_7, _b;
            if (this.__cache.events) {
                return this.__cache.events;
            }
            var states = this.states;
            var events = new Set(this.ownEvents);
            if (states) {
                try {
                    for (var _c = __values$3(keys(states)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var stateId = _d.value;
                        var state = states[stateId];
                        if (state.states) {
                            try {
                                for (var _e = __values$3(state.events), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var event_1 = _f.value;
                                    events.add("" + event_1);
                                }
                            } catch (e_7_1) {
                                e_7 = { error: e_7_1 };
                            } finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                } finally {
                                    if (e_7) throw e_7.error;
                                }
                            }
                        }
                    }
                } catch (e_6_1) {
                    e_6 = { error: e_6_1 };
                } finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    } finally {
                        if (e_6) throw e_6.error;
                    }
                }
            }
            return this.__cache.events = Array.from(events);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateNode.prototype, "ownEvents", {
        /**
         * All the events that have transitions directly from this state node.
         *
         * Excludes any inert events.
         */
        get: function () {
            var _this = this;
            var events = new Set(keys(this.on).filter(function (key) {
                var transitions = _this.on[key];
                return transitions.some(function (transition) {
                    return !(!transition.target && !transition.actions.length && transition.internal);
                });
            }));
            return Array.from(events);
        },
        enumerable: true,
        configurable: true
    });
    StateNode.prototype.formatTransition = function (target, transitionConfig, event) {
        var _this = this;
        var internal = transitionConfig ? transitionConfig.internal : undefined;
        var targets = toArray(target);
        var guards = this.machine.options.guards;
        // Format targets to their full string path
        var formattedTargets = targets.map(function (_target) {
            if (!isString(_target)) {
                return "#" + _target.id;
            }
            var isInternalTarget = _target[0] === _this.delimiter;
            internal = internal === undefined ? isInternalTarget : internal;
            // If internal target is defined on machine,
            // do not include machine key on target
            if (isInternalTarget && !_this.parent) {
                return "#" + _this.getStateNodeByPath(_target.slice(1)).id;
            }
            var resolvedTarget = isInternalTarget ? _this.key + _target : "" + _target;
            if (_this.parent) {
                try {
                    var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
                    return "#" + targetStateNode.id;
                } catch (err) {
                    throw new Error("Invalid transition for state node '" + _this.id + "' on event '" + event + "':\n" + err.message);
                }
            } else {
                return "#" + _this.getStateNodeByPath(resolvedTarget).id;
            }
        });
        if (transitionConfig === undefined) {
            return {
                target: target === undefined ? undefined : formattedTargets,
                source: this,
                actions: [],
                internal: target === undefined || internal,
                event: event
            };
        }
        // Check if there is no target (targetless)
        // An undefined transition signals that the state node should not transition from that event.
        var isTargetless = target === undefined || target === TARGETLESS_KEY;
        return __assign$4({}, transitionConfig, { actions: toActionObjects(toArray(transitionConfig.actions)), cond: toGuard(transitionConfig.cond, guards), target: isTargetless ? undefined : formattedTargets, source: this, internal: isTargetless && internal === undefined || internal, event: event });
    };
    StateNode.prototype.formatTransitions = function () {
        var _this = this;
        var _a, e_8, _b;
        var onConfig = this.config.on || EMPTY_OBJECT;
        var doneConfig = this.config.onDone ? (_a = {}, _a["" + done(this.id)] = this.config.onDone, _a) : undefined;
        var invokeConfig = this.invoke.reduce(function (acc, invokeDef) {
            if (invokeDef.onDone) {
                acc[doneInvoke(invokeDef.id)] = invokeDef.onDone;
            }
            if (invokeDef.onError) {
                acc[error(invokeDef.id)] = invokeDef.onError;
            }
            return acc;
        }, {});
        var delayedTransitions = this.after;
        var formattedTransitions = mapValues(__assign$4({}, onConfig, doneConfig, invokeConfig), function (value, event) {
            if (value === undefined) {
                return [{ target: undefined, event: event, actions: [], internal: true }];
            }
            if (isArray(value)) {
                return value.map(function (targetTransitionConfig) {
                    return _this.formatTransition(targetTransitionConfig.target, targetTransitionConfig, event);
                });
            }
            if (isString(value) || isMachine(value)) {
                return [_this.formatTransition([value], undefined, event)];
            }
            return [_this.formatTransition(value.target, value, event)];
        });
        try {
            for (var delayedTransitions_1 = __values$3(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()) {
                var delayedTransition = delayedTransitions_1_1.value;
                formattedTransitions[delayedTransition.event] = formattedTransitions[delayedTransition.event] || [];
                formattedTransitions[delayedTransition.event].push(delayedTransition);
            }
        } catch (e_8_1) {
            e_8 = { error: e_8_1 };
        } finally {
            try {
                if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_b = delayedTransitions_1.return)) _b.call(delayedTransitions_1);
            } finally {
                if (e_8) throw e_8.error;
            }
        }
        return formattedTransitions;
    };
    return StateNode;
}();

function Machine(config, options, initialContext) {
    if (initialContext === void 0) {
        initialContext = config.context;
    }
    return new StateNode(config, options, initialContext);
}

var __assign$5 = undefined && undefined.__assign || function () {
    __assign$5 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$5.apply(this, arguments);
};
var defaultOptions = {
    deferEvents: false
};
var Scheduler = /** @class */ /*#__PURE__*/function () {
    function Scheduler(options) {
        this.processingEvent = false;
        this.queue = [];
        this.initialized = false;
        this.options = __assign$5({}, defaultOptions, options);
    }
    Scheduler.prototype.initialize = function (callback) {
        this.initialized = true;
        if (callback) {
            if (!this.options.deferEvents) {
                this.schedule(callback);
                return;
            }
            this.process(callback);
        }
        this.flushEvents();
    };
    Scheduler.prototype.schedule = function (task) {
        if (!this.initialized || this.processingEvent) {
            this.queue.push(task);
            return;
        }
        if (this.queue.length !== 0) {
            throw new Error('Event queue should be empty when it is not processing events');
        }
        this.process(task);
        this.flushEvents();
    };
    Scheduler.prototype.flushEvents = function () {
        var nextCallback = this.queue.shift();
        while (nextCallback) {
            this.process(nextCallback);
            nextCallback = this.queue.shift();
        }
    };
    Scheduler.prototype.process = function (callback) {
        this.processingEvent = true;
        try {
            callback();
        } catch (e) {
            // there is no use to keep the future events
            // as the situation is not anymore the same
            this.queue = [];
            throw e;
        } finally {
            this.processingEvent = false;
        }
    };
    return Scheduler;
}();

function isActor(item) {
    try {
        return typeof item.send === 'function';
    } catch (e) {
        return false;
    }
}

var __assign$6 = undefined && undefined.__assign || function () {
    __assign$6 = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign$6.apply(this, arguments);
};
var __values$4 = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read$5 = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread$5 = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$5(arguments[i]));
    return ar;
};
var DEFAULT_SPAWN_OPTIONS = { sync: false, autoForward: false };
/**
 * Maintains a stack of the current service in scope.
 * This is used to provide the correct service to spawn().
 *
 * @private
 */
var withServiceScope = /*#__PURE__*/function () {
    var serviceStack = [];
    return function (service, fn) {
        service && serviceStack.push(service);
        var result = fn(service || serviceStack[serviceStack.length - 1]);
        service && serviceStack.pop();
        return result;
    };
}();
var Interpreter = /** @class */ /*#__PURE__*/function () {
    /**
     * Creates a new Interpreter instance (i.e., service) for the given machine with the provided options, if any.
     *
     * @param machine The machine to be interpreted
     * @param options Interpreter options
     */
    function Interpreter(machine, options) {
        var _this = this;
        if (options === void 0) {
            options = Interpreter.defaultOptions;
        }
        this.machine = machine;
        this.scheduler = new Scheduler();
        this.delayedEventsMap = {};
        this.listeners = new Set();
        this.contextListeners = new Set();
        this.stopListeners = new Set();
        this.doneListeners = new Set();
        this.eventListeners = new Set();
        this.sendListeners = new Set();
        /**
         * Whether the service is started.
         */
        this.initialized = false;
        this.children = new Map();
        this.forwardTo = new Set();
        /**
         * Alias for Interpreter.prototype.start
         */
        this.init = this.start;
        /**
         * Sends an event to the running interpreter to trigger a transition.
         *
         * An array of events (batched) can be sent as well, which will send all
         * batched events to the running interpreter. The listeners will be
         * notified only **once** when all events are processed.
         *
         * @param event The event(s) to send
         */
        this.send = function (event, payload) {
            if (isArray(event)) {
                _this.batch(event);
                return _this.state;
            }
            var eventObject = toEventObject(event, payload);
            if (!_this.initialized && _this.options.deferEvents) ; else if (!_this.initialized) {
                throw new Error("Event \"" + eventObject.type + "\" was sent to uninitialized service \"" + _this.machine.id + "\". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: " + JSON.stringify(eventObject));
            }
            _this.scheduler.schedule(function () {
                var nextState = _this.nextState(eventObject);
                _this.update(nextState, eventObject);
                // Forward copy of event to child interpreters
                _this.forward(eventObject);
            });
            return _this.state; // TODO: deprecate (should return void)
            // tslint:disable-next-line:semicolon
        };
        this.sendTo = function (event, to) {
            var isParent = to === SpecialTargets.Parent;
            var target = isParent ? _this.parent : isActor(to) ? to : _this.children.get(to);
            if (!target) {
                if (!isParent) {
                    throw new Error("Unable to send event to child '" + to + "' from service '" + _this.id + "'.");
                }
                return;
            }
            target.send(event);
        };
        var resolvedOptions = __assign$6({}, Interpreter.defaultOptions, options);
        var clock = resolvedOptions.clock,
            logger = resolvedOptions.logger,
            parent = resolvedOptions.parent,
            id = resolvedOptions.id;
        var resolvedId = id !== undefined ? id : machine.id;
        this.id = resolvedId;
        this.logger = logger;
        this.clock = clock;
        this.parent = parent;
        this.options = resolvedOptions;
        this.scheduler = new Scheduler({
            deferEvents: this.options.deferEvents
        });
        this.initialState = this.state = withServiceScope(this, function () {
            return _this.machine.initialState;
        });
    }
    /**
     * Executes the actions of the given state, with that state's `context` and `event`.
     *
     * @param state The state whose actions will be executed
     * @param actionsConfig The action implementations to use
     */
    Interpreter.prototype.execute = function (state, actionsConfig) {
        var e_1, _a;
        try {
            for (var _b = __values$4(state.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var action = _c.value;
                this.exec(action, state.context, state.event, actionsConfig);
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
                if (e_1) throw e_1.error;
            }
        }
    };
    Interpreter.prototype.update = function (state, event) {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
        // Update state
        this.state = state;
        // Execute actions
        if (this.options.execute) {
            this.execute(this.state);
        }
        // Dev tools
        if (this.devTools) {
            this.devTools.send(event, state);
        }
        // Execute listeners
        if (state.event) {
            try {
                for (var _e = __values$4(this.eventListeners), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var listener = _f.value;
                    listener(state.event);
                }
            } catch (e_2_1) {
                e_2 = { error: e_2_1 };
            } finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                } finally {
                    if (e_2) throw e_2.error;
                }
            }
        }
        try {
            for (var _g = __values$4(this.listeners), _h = _g.next(); !_h.done; _h = _g.next()) {
                var listener = _h.value;
                listener(state, state.event);
            }
        } catch (e_3_1) {
            e_3 = { error: e_3_1 };
        } finally {
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
            } finally {
                if (e_3) throw e_3.error;
            }
        }
        try {
            for (var _j = __values$4(this.contextListeners), _k = _j.next(); !_k.done; _k = _j.next()) {
                var contextListener = _k.value;
                contextListener(this.state.context, this.state.history ? this.state.history.context : undefined);
            }
        } catch (e_4_1) {
            e_4 = { error: e_4_1 };
        } finally {
            try {
                if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
            } finally {
                if (e_4) throw e_4.error;
            }
        }
        if (this.state.tree && this.state.tree.done) {
            // get donedata
            var doneData = this.state.tree.getDoneData(this.state.context, toEventObject(event));
            try {
                for (var _l = __values$4(this.doneListeners), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var listener = _m.value;
                    listener(doneInvoke(this.id, doneData));
                }
            } catch (e_5_1) {
                e_5 = { error: e_5_1 };
            } finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                } finally {
                    if (e_5) throw e_5.error;
                }
            }
            this.stop();
        }
    };
    /*
     * Adds a listener that is notified whenever a state transition happens. The listener is called with
     * the next state and the event object that caused the state transition.
     *
     * @param listener The state listener
     */
    Interpreter.prototype.onTransition = function (listener) {
        this.listeners.add(listener);
        return this;
    };
    Interpreter.prototype.subscribe = function (nextListener,
    // @ts-ignore
    errorListener, completeListener) {
        var _this = this;
        if (nextListener) {
            this.onTransition(nextListener);
        }
        if (completeListener) {
            this.onDone(completeListener);
        }
        return {
            unsubscribe: function () {
                nextListener && _this.listeners.delete(nextListener);
                completeListener && _this.doneListeners.delete(completeListener);
            }
        };
    };
    /**
     * Adds an event listener that is notified whenever an event is sent to the running interpreter.
     * @param listener The event listener
     */
    Interpreter.prototype.onEvent = function (listener) {
        this.eventListeners.add(listener);
        return this;
    };
    /**
     * Adds an event listener that is notified whenever a `send` event occurs.
     * @param listener The event listener
     */
    Interpreter.prototype.onSend = function (listener) {
        this.sendListeners.add(listener);
        return this;
    };
    /**
     * Adds a context listener that is notified whenever the state context changes.
     * @param listener The context listener
     */
    Interpreter.prototype.onChange = function (listener) {
        this.contextListeners.add(listener);
        return this;
    };
    /**
     * Adds a listener that is notified when the machine is stopped.
     * @param listener The listener
     */
    Interpreter.prototype.onStop = function (listener) {
        this.stopListeners.add(listener);
        return this;
    };
    /**
     * Adds a state listener that is notified when the statechart has reached its final state.
     * @param listener The state listener
     */
    Interpreter.prototype.onDone = function (listener) {
        this.doneListeners.add(listener);
        return this;
    };
    /**
     * Removes a listener.
     * @param listener The listener to remove
     */
    Interpreter.prototype.off = function (listener) {
        this.listeners.delete(listener);
        this.eventListeners.delete(listener);
        this.sendListeners.delete(listener);
        this.stopListeners.delete(listener);
        this.doneListeners.delete(listener);
        this.contextListeners.delete(listener);
        return this;
    };
    /**
     * Starts the interpreter from the given state, or the initial state.
     * @param initialState The state to start the statechart from
     */
    Interpreter.prototype.start = function (initialState) {
        var _this = this;
        if (this.initialized) {
            // Do not restart the service if it is already started
            return this;
        }
        this.initialized = true;
        var resolvedState = withServiceScope(this, function () {
            return initialState === undefined ? _this.machine.initialState : initialState instanceof State ? _this.machine.resolveState(initialState) : _this.machine.resolveState(State.from(initialState));
        });
        if (this.options.devTools) {
            this.attachDev();
        }
        this.scheduler.initialize(function () {
            _this.update(resolvedState, { type: init });
        });
        return this;
    };
    /**
     * Stops the interpreter and unsubscribe all listeners.
     *
     * This will also notify the `onStop` listeners.
     */
    Interpreter.prototype.stop = function () {
        var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
        try {
            for (var _f = __values$4(this.listeners), _g = _f.next(); !_g.done; _g = _f.next()) {
                var listener = _g.value;
                this.listeners.delete(listener);
            }
        } catch (e_6_1) {
            e_6 = { error: e_6_1 };
        } finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            } finally {
                if (e_6) throw e_6.error;
            }
        }
        try {
            for (var _h = __values$4(this.stopListeners), _j = _h.next(); !_j.done; _j = _h.next()) {
                var listener = _j.value;
                // call listener, then remove
                listener();
                this.stopListeners.delete(listener);
            }
        } catch (e_7_1) {
            e_7 = { error: e_7_1 };
        } finally {
            try {
                if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
            } finally {
                if (e_7) throw e_7.error;
            }
        }
        try {
            for (var _k = __values$4(this.contextListeners), _l = _k.next(); !_l.done; _l = _k.next()) {
                var listener = _l.value;
                this.contextListeners.delete(listener);
            }
        } catch (e_8_1) {
            e_8 = { error: e_8_1 };
        } finally {
            try {
                if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
            } finally {
                if (e_8) throw e_8.error;
            }
        }
        try {
            for (var _m = __values$4(this.doneListeners), _o = _m.next(); !_o.done; _o = _m.next()) {
                var listener = _o.value;
                this.doneListeners.delete(listener);
            }
        } catch (e_9_1) {
            e_9 = { error: e_9_1 };
        } finally {
            try {
                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
            } finally {
                if (e_9) throw e_9.error;
            }
        }
        // Stop all children
        this.children.forEach(function (child) {
            if (isFunction(child.stop)) {
                child.stop();
            }
        });
        try {
            // Cancel all delayed events
            for (var _p = __values$4(keys(this.delayedEventsMap)), _q = _p.next(); !_q.done; _q = _p.next()) {
                var key = _q.value;
                this.clock.clearTimeout(this.delayedEventsMap[key]);
            }
        } catch (e_10_1) {
            e_10 = { error: e_10_1 };
        } finally {
            try {
                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
            } finally {
                if (e_10) throw e_10.error;
            }
        }
        this.initialized = false;
        return this;
    };
    Interpreter.prototype.batch = function (events) {
        var _this = this;
        if (!this.initialized && this.options.deferEvents) ; else if (!this.initialized) {
            throw new Error(
            // tslint:disable-next-line:max-line-length
            events.length + " event(s) were sent to uninitialized service \"" + this.machine.id + "\". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.");
        }
        this.scheduler.schedule(function () {
            var e_11, _a, _b;
            var nextState = _this.state;
            try {
                for (var events_1 = __values$4(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                    var event_1 = events_1_1.value;
                    var changed = nextState.changed;
                    var eventObject = toEventObject(event_1);
                    var actions = nextState.actions.map(function (a) {
                        return bindActionToState(a, nextState);
                    });
                    nextState = _this.machine.transition(nextState, eventObject);
                    (_b = nextState.actions).unshift.apply(_b, __spread$5(actions));
                    nextState.changed = nextState.changed || !!changed;
                    _this.forward(eventObject);
                }
            } catch (e_11_1) {
                e_11 = { error: e_11_1 };
            } finally {
                try {
                    if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
                } finally {
                    if (e_11) throw e_11.error;
                }
            }
            _this.update(nextState, toEventObject(events[events.length - 1]));
        });
    };
    /**
     * Returns a send function bound to this interpreter instance.
     *
     * @param event The event to be sent by the sender.
     */
    Interpreter.prototype.sender = function (event) {
        return this.send.bind(this, event);
    };
    /**
     * Returns the next state given the interpreter's current state and the event.
     *
     * This is a pure method that does _not_ update the interpreter's state.
     *
     * @param event The event to determine the next state
     */
    Interpreter.prototype.nextState = function (event) {
        var _this = this;
        var eventObject = toEventObject(event);
        if (eventObject.type.indexOf(errorPlatform) === 0 && !this.state.nextEvents.some(function (nextEvent) {
            return nextEvent.indexOf(errorPlatform) === 0;
        })) {
            throw eventObject.data;
        }
        var nextState = withServiceScope(this, function () {
            return _this.machine.transition(_this.state, eventObject, _this.state.context);
        });
        return nextState;
    };
    Interpreter.prototype.forward = function (event) {
        var e_12, _a;
        try {
            for (var _b = __values$4(this.forwardTo), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                var child = this.children.get(id);
                if (!child) {
                    throw new Error("Unable to forward event '" + event + "' from interpreter '" + this.id + "' to nonexistant child '" + id + "'.");
                }
                child.send(event);
            }
        } catch (e_12_1) {
            e_12 = { error: e_12_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
                if (e_12) throw e_12.error;
            }
        }
    };
    Interpreter.prototype.defer = function (sendAction) {
        var _this = this;
        var delay = sendAction.delay;
        if (isString(delay)) {
            if (!this.machine.options.delays || this.machine.options.delays[delay] === undefined) {
                // Do not send anything
                return;
            } else {
                var delayExpr = this.machine.options.delays[delay];
                delay = typeof delayExpr === 'number' ? delayExpr : delayExpr(this.state.context, this.state.event);
            }
        }
        this.delayedEventsMap[sendAction.id] = this.clock.setTimeout(function () {
            if (sendAction.to) {
                _this.sendTo(sendAction.event, sendAction.to);
            } else {
                _this.send(sendAction.event);
            }
        }, delay || 0);
    };
    Interpreter.prototype.cancel = function (sendId) {
        this.clock.clearTimeout(this.delayedEventsMap[sendId]);
        delete this.delayedEventsMap[sendId];
    };
    Interpreter.prototype.exec = function (action, context, event, actionFunctionMap) {
        var actionOrExec = getActionFunction(action.type, actionFunctionMap) || action.exec;
        var exec = isFunction(actionOrExec) ? actionOrExec : actionOrExec ? actionOrExec.exec : action.exec;
        if (exec) {
            // @ts-ignore (TODO: fix for TypeDoc)
            return exec(context, event, { action: action, state: this.state });
        }
        switch (action.type) {
            case send:
                var sendAction = action;
                if (sendAction.delay) {
                    this.defer(sendAction);
                    return;
                } else {
                    if (sendAction.to) {
                        this.sendTo(sendAction.event, sendAction.to);
                    } else {
                        this.send(sendAction.event);
                    }
                }
                break;
            case cancel:
                this.cancel(action.sendId);
                break;
            case start:
                {
                    var activity = action.activity;
                    // If the activity will be stopped right after it's started
                    // (such as in transient states)
                    // don't bother starting the activity.
                    if (!this.state.activities[activity.type]) {
                        break;
                    }
                    // Invoked services
                    if (activity.type === ActionTypes.Invoke) {
                        var serviceCreator = this.machine.options.services ? this.machine.options.services[activity.src] : undefined;
                        var id = activity.id,
                            data = activity.data;
                        var autoForward = 'autoForward' in activity ? activity.autoForward : !!activity.forward;
                        if (!serviceCreator) {
                            return;
                        }
                        var source = isFunction(serviceCreator) ? serviceCreator(context, event) : serviceCreator;
                        if (isPromiseLike(source)) {
                            this.spawnPromise(Promise.resolve(source), id);
                        } else if (isFunction(source)) {
                            this.spawnCallback(source, id);
                        } else if (isObservable(source)) {
                            this.spawnObservable(source, id);
                        } else if (isMachine(source)) {
                            // TODO: try/catch here
                            this.spawnMachine(data ? source.withContext(mapContext(data, context, event)) : source, {
                                id: id,
                                autoForward: autoForward
                            });
                        }
                    } else {
                        this.spawnActivity(activity);
                    }
                    break;
                }
            case stop:
                {
                    this.stopChild(action.activity.id);
                    break;
                }
            case log:
                var expr = action.expr ? action.expr(context, event) : undefined;
                if (action.label) {
                    this.logger(action.label, expr);
                } else {
                    this.logger(expr);
                }
                break;
            default:
                break;
        }
        return undefined;
    };
    Interpreter.prototype.stopChild = function (childId) {
        var child = this.children.get(childId);
        if (!child) {
            return;
        }
        this.children.delete(childId);
        this.forwardTo.delete(childId);
        if (isFunction(child.stop)) {
            child.stop();
        }
    };
    Interpreter.prototype.spawn = function (entity, name, options) {
        if (isPromiseLike(entity)) {
            return this.spawnPromise(Promise.resolve(entity), name);
        } else if (isFunction(entity)) {
            return this.spawnCallback(entity, name);
        } else if (isObservable(entity)) {
            return this.spawnObservable(entity, name);
        } else if (isMachine(entity)) {
            return this.spawnMachine(entity, __assign$6({}, options, { id: name }));
        } else {
            throw new Error("Unable to spawn entity \"" + name + "\" of type \"" + typeof entity + "\".");
        }
    };
    Interpreter.prototype.spawnMachine = function (machine, options) {
        var _this = this;
        if (options === void 0) {
            options = {};
        }
        var childService = new Interpreter(machine, __assign$6({}, this.options, { parent: this, id: options.id || machine.id }));
        var resolvedOptions = __assign$6({}, DEFAULT_SPAWN_OPTIONS, options);
        if (resolvedOptions.sync) {
            childService.onTransition(function (state) {
                _this.send(update, { state: state, id: childService.id });
            });
        }
        childService.onDone(function (doneEvent) {
            _this.send(doneEvent);
        }).start();
        var actor = childService;
        // const actor = {
        //   id: childService.id,
        //   send: childService.send,
        //   state: childService.state,
        //   subscribe: childService.subscribe,
        //   toJSON() {
        //     return { id: childService.id };
        //   }
        // } as Actor<State<TChildContext, TChildEvents>>;
        this.children.set(childService.id, actor);
        if (resolvedOptions.autoForward) {
            this.forwardTo.add(childService.id);
        }
        return actor;
    };
    Interpreter.prototype.spawnPromise = function (promise, id) {
        var _this = this;
        var canceled = false;
        promise.then(function (response) {
            if (!canceled) {
                _this.send(doneInvoke(id, response));
            }
        }, function (errorData) {
            if (!canceled) {
                var errorEvent = error(id, errorData);
                try {
                    // Send "error.execution" to this (parent).
                    _this.send(errorEvent);
                } catch (error) {
                    _this.reportUnhandledExceptionOnInvocation(errorData, error, id);
                    if (_this.devTools) {
                        _this.devTools.send(errorEvent, _this.state);
                    }
                    if (_this.machine.strict) {
                        // it would be better to always stop the state machine if unhandled
                        // exception/promise rejection happens but because we don't want to
                        // break existing code so enforce it on strict mode only especially so
                        // because documentation says that onError is optional
                        _this.stop();
                    }
                }
            }
        });
        var actor = {
            id: id,
            send: function () {
                return void 0;
            },
            subscribe: function (next, handleError, complete) {
                var unsubscribed = false;
                promise.then(function (response) {
                    if (unsubscribed) {
                        return;
                    }
                    next && next(response);
                    if (unsubscribed) {
                        return;
                    }
                    complete && complete();
                }, function (err) {
                    if (unsubscribed) {
                        return;
                    }
                    handleError(err);
                });
                return {
                    unsubscribe: function () {
                        return unsubscribed = true;
                    }
                };
            },
            stop: function () {
                canceled = true;
            },
            toJSON: function () {
                return { id: id };
            }
        };
        this.children.set(id, actor);
        return actor;
    };
    Interpreter.prototype.spawnCallback = function (callback, id) {
        var _this = this;
        var canceled = false;
        var receive = function (e) {
            if (canceled) {
                return;
            }
            _this.send(e);
        };
        var listeners = new Set();
        var callbackStop;
        try {
            callbackStop = callback(receive, function (newListener) {
                listeners.add(newListener);
            });
        } catch (err) {
            this.send(error(id, err));
        }
        if (isPromiseLike(callbackStop)) {
            // it turned out to be an async function, can't reliably check this before calling `callback`
            // because transpiled async functions are not recognizable
            return this.spawnPromise(callbackStop, id);
        }
        var actor = {
            id: id,
            send: function (event) {
                return listeners.forEach(function (listener) {
                    return listener(event);
                });
            },
            subscribe: function (next) {
                listeners.add(next);
                return {
                    unsubscribe: function () {
                        listeners.delete(next);
                    }
                };
            },
            stop: function () {
                canceled = true;
                if (isFunction(callbackStop)) {
                    callbackStop();
                }
            },
            toJSON: function () {
                return { id: id };
            }
        };
        this.children.set(id, actor);
        return actor;
    };
    Interpreter.prototype.spawnObservable = function (source, id) {
        var _this = this;
        var subscription = source.subscribe(function (value) {
            _this.send(value);
        }, function (err) {
            _this.send(error(id, err));
        }, function () {
            _this.send(doneInvoke(id));
        });
        var actor = {
            id: id,
            send: function () {
                return void 0;
            },
            subscribe: function (next, handleError, complete) {
                return source.subscribe(next, handleError, complete);
            },
            stop: function () {
                return subscription.unsubscribe();
            },
            toJSON: function () {
                return { id: id };
            }
        };
        this.children.set(id, actor);
        return actor;
    };
    Interpreter.prototype.spawnActivity = function (activity) {
        var implementation = this.machine.options && this.machine.options.activities ? this.machine.options.activities[activity.type] : undefined;
        if (!implementation) {
            return;
        }
        // Start implementation
        var dispose = implementation(this.state.context, activity);
        this.spawnEffect(activity.id, dispose);
    };
    Interpreter.prototype.spawnEffect = function (id, dispose) {
        this.children.set(id, {
            id: id,
            send: function () {
                return void 0;
            },
            subscribe: function () {
                return { unsubscribe: function () {
                        return void 0;
                    } };
            },
            stop: dispose || undefined,
            toJSON: function () {
                return { id: id };
            }
        });
    };
    Interpreter.prototype.reportUnhandledExceptionOnInvocation = function (originalError, currentError, id) {
    };
    Interpreter.prototype.attachDev = function () {
        if (this.options.devTools && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
            var devToolsOptions = typeof this.options.devTools === 'object' ? this.options.devTools : undefined;
            this.devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect(__assign$6({ name: this.id, autoPause: true, stateSanitizer: function (state) {
                    return {
                        value: state.value,
                        context: state.context,
                        actions: state.actions
                    };
                } }, devToolsOptions, { features: __assign$6({ jump: false, skip: false }, devToolsOptions ? devToolsOptions.features : undefined) }));
            this.devTools.init(this.state);
        }
    };
    Interpreter.prototype.toJSON = function () {
        return {
            id: this.id
        };
    };
    /**
     * The default interpreter options:
     *
     * - `clock` uses the global `setTimeout` and `clearTimeout` functions
     * - `logger` uses the global `console.log()` method
     */
    Interpreter.defaultOptions = /*#__PURE__*/function (global) {
        return {
            execute: true,
            deferEvents: true,
            clock: {
                setTimeout: function (fn, ms) {
                    return global.setTimeout.call(null, fn, ms);
                },
                clearTimeout: function (id) {
                    return global.clearTimeout.call(null, id);
                }
            },
            logger: global.console.log.bind(console),
            devTools: false
        };
    }(typeof window === 'undefined' ? global : window);
    Interpreter.interpret = interpret;
    return Interpreter;
}();
/**
 * Creates a new Interpreter instance for the given machine with the provided options, if any.
 *
 * @param machine The machine to interpret
 * @param options Interpreter options
 */
function interpret(machine, options) {
    var interpreter = new Interpreter(machine, options);
    return interpreter;
}

/**
 * Select component, use in conjuction with wcs-select-option.
 *
 * @example ```hmtl
 *  <wcs-select>
 *      <wcs-select-option value="1">One</wcs-select-option>
 *  </wcs-select>```
 * @todo Complete keyboard navigation.
 */
class Select {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /** Wether the select is expanded */
        this.expanded = false;
        /** Wether the component is fully loaded in the DOM. */
        this.hasLoaded = false;
        /** If `true`, the user cannot interact with the select. */
        this.disabled = false;
        /** If `true`, the user can select multiple values at once. */
        this.multiple = false;
        this.wcsChange = __chunk_1.createEvent(this, "wcsChange", 7);
        this.wcsFocus = __chunk_1.createEvent(this, "wcsFocus", 7);
        this.wcsBlur = __chunk_1.createEvent(this, "wcsBlur", 7);
        this.window = __chunk_1.getContext(this, "window");
    }
    /** Open the component. */
    async open() {
        this.stateService.send('OPEN');
    }
    /** Close the component. */
    async close() {
        this.stateService.send('CLOSE');
    }
    componentDidLoad() {
        this.optionsEl = this.el.shadowRoot.querySelector('.wcs-select-options');
        this.contentEl = this.el.shadowRoot.querySelector('.wcs-select-content');
        const stateMachine = Machine(this.initMachineConfig(), this.initMachineOptions());
        this.stateService = interpret(stateMachine);
        if (this.multiple) {
            this.values = [];
            this.options
                .forEach((opt) => opt.multiple = true);
        }
        this.addRippleEffect();
        // TODO: is this still usefull for anything ?
        this.hasLoaded = true;
        this.stateService.start();
    }
    get options() {
        const opts = this.optionsEl.querySelectorAll('wcs-select-option');
        return opts.length !== 0
            ? opts
            : this.optionsEl.querySelector('slot').assignedElements();
    }
    initMachineConfig() {
        return {
            key: 'select',
            initial: 'blurred',
            states: {
                blurred: {
                    entry: ['blur'],
                    on: {
                        CLOSE: { target: 'closed', cond: 'enabled' },
                        FOCUS: { target: 'closed', cond: 'enabled' },
                        OPEN: { target: 'opened', cond: 'enabled' },
                        CLICK: { target: 'opened', cond: 'enabled' },
                    }
                },
                closed: {
                    entry: ['close'],
                    on: {
                        CLICK: 'opened',
                        OPEN: 'opened',
                        BLUR: 'blurred',
                    },
                },
                opened: {
                    entry: ['open'],
                    on: {
                        CLICK: 'closed',
                        CLOSE: 'closed',
                        BLUR: 'blurred',
                        OPTION_CLICKED: { actions: ['selectOption'] }
                    },
                },
            }
        };
    }
    initMachineOptions() {
        return {
            actions: {
                open: () => {
                    this.expanded = true;
                    this.focused = true;
                },
                close: () => {
                    this.focused = true;
                    this.expanded = false;
                },
                blur: () => {
                    this.focused = false;
                    this.expanded = false;
                },
                focus: () => {
                    this.focused = true;
                },
                selectOption: (_, event) => {
                    if (event.type === 'OPTION_CLICKED') {
                        this.handleClickEvent(event.value);
                    }
                }
            },
            guards: {
                enabled: () => !this.disabled
            }
        };
    }
    handleClickEvent(event) {
        if (this.multiple) {
            this.handleClickOnMultiple(event);
        }
        else {
            this.handleNormalClick(event);
        }
        this.wcsChange.emit({
            value: this.value
        });
    }
    handleClickOnMultiple(event) {
        const index = this.values.findIndex(v => v.value === event.value);
        if (index === -1) {
            const { value, displayText } = event;
            this.values.push({ value, displayText });
            event.source.selected = true;
        }
        else {
            event.source.selected = false;
            this.values.splice(index, 1);
        }
        // TODO: Let user provide sorting function and use this if defined.
        // this.values = this.values.sort((a, b) => a.value - b.value);
        this.value = `[${this.values.map(v => v.value).join(', ')}]`;
        this.displayText = this.values.length !== 0
            ? this.values.map(v => v.displayText).join(', ')
            : undefined;
    }
    handleNormalClick(event) {
        // Reset other options to false if they were selected.
        this.options
            .forEach(option => {
            if (option.selected)
                option.selected = false;
        });
        event.source.selected = true;
        this.value = event.value;
        this.displayText = event.displayText;
        this.stateService.send('CLOSE');
    }
    componentDidUnload() {
        this.stateService.stop();
    }
    addRippleEffect() {
        // TODO: wrap MDCRipple dependency so we can eventually write our own or at least decouple a bit.
        const ripple = new MDCRipple(this.contentEl);
        ripple.unbounded = false;
    }
    get hasValue() {
        // TODO: change this behavior.
        return this.displayText !== undefined;
    }
    onMouseDown(_event) {
        this.stateService.send('CLICK');
    }
    onWindowClickEvent(event) {
        const clickedOnSelectOrChildren = event.target instanceof Node && this.el.contains(event.target);
        // TODO: Move this logic in the state machine
        if (this.expanded && !clickedOnSelectOrChildren) {
            this.stateService.send('BLUR');
        }
    }
    selectedOptionChanged(event) {
        this.stateService.send({ type: 'OPTION_CLICKED', value: event.detail });
    }
    focus() { this.stateService.send('FOCUS'); }
    blur() { this.stateService.send('BLUR'); }
    render() {
        if (this.hasLoaded) {
            this.updateStyles();
        }
        return (__chunk_1.h(__chunk_1.Host, Object.assign({ class: this.expanded ? 'expanded ' : '' }, this.focusedAttributes()), __chunk_1.h("div", { class: "wcs-select-content" }, __chunk_1.h("label", { class: "wcs-select-text" }, this.hasValue
            ? this.displayText
            : this.placeholder), __chunk_1.h(SelectArrow, { up: this.expanded })), __chunk_1.h("div", { class: "wcs-select-options" }, __chunk_1.h("slot", { name: "wcs-select-option" }))));
    }
    updateStyles() {
        // Make the options container width the same width as everything.
        const borderSize = 1;
        // TODO: Consider using a mutation observer to rerender the size each time ?
        // Be cautious as it may cause infinite loop with render ?
        this.optionsEl.setAttribute('style', `width: ${Math.ceil(this.el.getBoundingClientRect().width - 2 * borderSize)}px;`);
    }
    focusedAttributes() {
        return !this.disabled ? { tabIndex: 0 } : {};
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "\@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.wcs-select-text{padding:.65625rem 1.25rem;font-weight:500;cursor:pointer;color:var(--text-medium);-webkit-transition:color 125ms ease-in;transition:color 125ms ease-in;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wcs-select-content{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding-right:var(--wcs-text-padding);background-color:var(--light);border-radius:var(--wcs-border-radius);border:1px solid transparent;font-size:1rem;line-height:1.5;cursor:pointer}.wcs-select-content:after,.wcs-select-content:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.wcs-select-content:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.wcs-select-content.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.wcs-select-content.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.wcs-select-content.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.wcs-select-content.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.wcs-select-content.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.wcs-select-content:after,.wcs-select-content:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.wcs-select-content.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.wcs-select-content:after,.wcs-select-content:before{background-color:#999}.wcs-select-content:hover:before{opacity:.1}.wcs-select-content.mdc-ripple-upgraded--background-focused:before,.wcs-select-content:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.2}.wcs-select-content:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.wcs-select-content:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.3}.wcs-select-content.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.3}.wcs-select-options{display:none;position:absolute;z-index:1;margin:0;max-height:22.5rem;overflow-y:auto;background-color:var(--white);color:var(--text-medium);border-left:var(--text-light) solid 1px;border-right:var(--text-light) solid 1px;border-bottom:var(--text-light) solid 1px;border-bottom-right-radius:var(--wcs-border-radius);border-bottom-left-radius:var(--wcs-border-radius)}:host{position:relative;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host,:host(.expanded) .wcs-select-options{display:block}:host(.expanded) .wcs-select-content{border-top:var(--text-light) solid 1px;border-right:var(--text-light) solid 1px;border-left:var(--text-light) solid 1px;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom:var(--text-light) solid 1px}:host(:not(.expanded):focus) .wcs-select-content{border:var(--primary) solid 1px}:host([value]) .wcs-select-text{color:var(--black)}:host([value=\"[]\"]) .wcs-select-text{color:var(--text-medium)}:host([disabled]) .wcs-select-content,:host([disabled]) .wcs-select-text{cursor:default;pointer-events:none}:host([disabled]) .wcs-select-text{color:var(--text-disabled)}:host([disabled]) .arrow{fill:var(--text-medium)}"; }
}

/**
 * Select option component, use in conjunction with wcs-select.
 */
class SelectOption {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /** Wether this option can be selected. */
        this.disabled = false;
        /** Wether this option is selected. */
        this.selected = false;
        /**
         * This property musn't be set by hand, it is used by the `wcs-select` component.
         * If you want a multiple select, set `multiple` attribute on the parent select instead.
         * @internal
         * @ignore
         */
        this.multiple = false;
        this.wcsSelectOptionClick = __chunk_1.createEvent(this, "wcsSelectOptionClick", 7);
    }
    componentWillLoad() {
        if (this.value === undefined) {
            // If no value was given we use the text content instead.
            this.value = this.el.innerText || '';
        }
    }
    componentDidLoad() {
        const ripple = new MDCRipple(this.el);
        ripple.unbounded = true;
    }
    onMouseDown(event) {
        if (!this.disabled) {
            event.stopPropagation();
            // We select inner HTML as it's what's passed into the slot.
            const displayText = this.el.innerText;
            this.wcsSelectOptionClick.emit({
                source: this.el,
                value: this.value,
                displayText
            });
        }
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { slot: "wcs-select-option" }, this.multiple &&
            __chunk_1.h("wcs-checkbox", { checked: this.selected }), __chunk_1.h("slot", null)));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "\@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}\@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}\@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}\@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#000}.mdc-ripple-surface:hover:before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,calc(50% - 50%));left:var(--mdc-ripple-left,calc(50% - 50%));width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#6200ee}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#6200ee)}}.mdc-ripple-surface--primary:hover:before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#018786}\@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#018786)}}.mdc-ripple-surface--accent:hover:before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}wcs-select-option{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity;overflow:hidden;display:-ms-flexbox;display:flex;padding:0 var(--wcs-padding);height:3rem;line-height:3rem;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500;color:#000}wcs-select-option:after,wcs-select-option:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}wcs-select-option:before{-webkit-transition:opacity 15ms linear,background-color 15ms linear;transition:opacity 15ms linear,background-color 15ms linear;z-index:1}wcs-select-option.mdc-ripple-upgraded:before{-webkit-transform:scale(var(--mdc-ripple-fg-scale,1));transform:scale(var(--mdc-ripple-fg-scale,1))}wcs-select-option.mdc-ripple-upgraded:after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}wcs-select-option.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}wcs-select-option.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}wcs-select-option.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1));transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}wcs-select-option:after,wcs-select-option:before{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}wcs-select-option.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}wcs-select-option:after,wcs-select-option:before{background-color:#999}wcs-select-option:hover:before{opacity:.1}wcs-select-option.mdc-ripple-upgraded--background-focused:before,wcs-select-option:not(.mdc-ripple-upgraded):focus:before{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.2}wcs-select-option:not(.mdc-ripple-upgraded):after{-webkit-transition:opacity .15s linear;transition:opacity .15s linear}wcs-select-option:not(.mdc-ripple-upgraded):active:after{-webkit-transition-duration:75ms;transition-duration:75ms;opacity:.3}wcs-select-option.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.3}wcs-select-option:hover{color:var(--primary);background-color:var(--light)}wcs-select-option[disabled]{cursor:default;pointer-events:none;color:var(--text-disabled)}wcs-select-option[selected]{color:var(--primary);background-color:var(--light)}wcs-select-option[multiple] wcs-checkbox{margin-right:10px}"; }
}

class Sidebar {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    hostData() {
        return {
            'slot': 'sidebar'
        };
    }
    __stencil_render() {
        return (__chunk_1.h("nav", null, __chunk_1.h("slot", { name: "link" })));
    }
    render() { return __chunk_1.h(__chunk_1.Host, this.hostData(), this.__stencil_render()); }
    static get style() { return "nav{z-index:2;background:var(--primary);height:calc(100% - 2.5rem);padding:1rem 1.5rem;position:-webkit-sticky;position:sticky;top:64px;overflow-y:auto}::slotted(a){color:#fff;text-decoration:none;display:block;padding:.25rem}"; }
}

/**
 * Tab content component.
 * Use this component to specify the content of a component.
 */
class Tab {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.wcsTabDidLoad = __chunk_1.createEvent(this, "wcsTabDidLoad", 7);
    }
    componentDidLoad() {
        this.wcsTabDidLoad.emit();
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { slot: "wcs-tab" }, __chunk_1.h("slot", null)));
    }
}

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
class Tabs {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.align = 'start';
        /**
         * Current selected tab index
         */
        this.selectedIndex = 0;
        this.headers = [];
        this.didLoad = false;
        this.wcsTabsChange = __chunk_1.createEvent(this, "wcsTabsChange", 7);
    }
    componentDidLoad() {
        this.tabsEl = this.el.shadowRoot.querySelector('.wcs-tabs');
        this.didLoad = true;
        if (this.tabsEl.querySelector('slot') === null) {
            Array.from(this.el.querySelectorAll('wcs-tab'))
                .filter(node => node.parentNode !== this.tabsEl)
                .forEach(tab => {
                this.el.removeChild(tab);
                this.tabsEl.appendChild(tab);
            });
        }
        this.refreshHeaders();
    }
    selectedIndexChanged() {
        this.wcsTabsChange.emit({
            tabName: this.headers[this.selectedIndex],
            tabIndex: this.selectedIndex
        });
    }
    /**
     * XXX: Temporary fix waiting for two issues to be resolved:
     * - https://github.com/ionic-team/stencil/issues/1261
     * - https://github.com/ionic-team/stencil/issues/1130
     *
     * When resolved this should just be done once in the componentDidLoad method.
     */
    refreshHeaders() {
        if (this.didLoad) {
            const slot = this.tabsEl.querySelector('slot');
            if (slot && slot.assignedElements) {
                this.headers = slot.assignedElements()
                    .map(x => x.getAttribute('header'));
            }
            else {
                this.headers = [];
                this.tabsEl.querySelectorAll('wcs-tab')
                    .forEach(x => {
                    this.headers.push(x.getAttribute('header'));
                });
            }
        }
    }
    selectTab(index) {
        this.selectedIndex = index;
    }
    getHeaderAlignClass() {
        switch (this.align) {
            case 'start':
                return 'start';
            case 'end':
                return 'end';
            case 'center':
                return 'center';
        }
    }
    componentWillUpdate() {
        const slot = this.tabsEl.querySelector('slot');
        const tabs = slot && slot.assignedElements
            ? slot.assignedElements()
            : this.tabsEl.querySelectorAll('wcs-tab');
        tabs.forEach((el, idx) => {
            if (idx !== this.selectedIndex) {
                el.setAttribute('style', 'display: none;');
            }
            else {
                el.setAttribute('style', 'display: initial;');
            }
        });
    }
    render() {
        return [
            __chunk_1.h("ul", { class: 'wcs-tabs-headers ' + this.getHeaderAlignClass() }, this.headers.map((header, idx) => __chunk_1.h("li", { class: 'wcs-tab-header ' + (this.selectedIndex === idx ? 'active' : ''), onClick: () => this.selectTab(idx) }, __chunk_1.h("span", null, header)))),
            __chunk_1.h("div", { class: "wcs-tabs" }, __chunk_1.h("slot", { name: "wcs-tab" }))
        ];
    }
    get el() { return __chunk_1.getElement(this); }
    static get watchers() { return {
        "selectedIndex": ["selectedIndexChanged"]
    }; }
    static get style() { return ":host{margin-top:.5rem!important}.wcs-tabs-headers{display:-ms-flexbox;display:flex;list-style:none;padding-left:0;border-bottom:var(--wcs-tabs-headers-border-bottom);margin:0;padding-bottom:14px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wcs-tabs-headers.center{-ms-flex-pack:center;justify-content:center}.wcs-tabs-headers.end{-ms-flex-pack:end;justify-content:end}.wcs-tabs-headers.start{-ms-flex-pack:start;justify-content:start}.wcs-tab-header{padding-right:1.5rem;cursor:pointer}.wcs-tab-header span{color:var(--secondary);font-size:1rem;font-weight:400;line-height:1.375;padding-top:.25rem;padding-bottom:1rem}.active span,.wcs-tab-header:hover>span{color:var(--primary)}.active span{font-weight:500;position:relative}.active span:after{position:absolute;bottom:0;left:0;width:100%;height:.3125rem;content:\"\";background-color:var(--primary);border-radius:3px}"; }
}

exports.wcs_app = App;
exports.wcs_badge = Badge;
exports.wcs_button = Button;
exports.wcs_card = Card;
exports.wcs_card_body = CardBody;
exports.wcs_checkbox = Checkbox;
exports.wcs_header = Header;
exports.wcs_icon = Icon;
exports.wcs_input = Input;
exports.wcs_progress_bar = ProgressBar;
exports.wcs_progress_radial = ProgressRadial;
exports.wcs_select = Select;
exports.wcs_select_option = SelectOption;
exports.wcs_sidebar = Sidebar;
exports.wcs_tab = Tab;
exports.wcs_tabs = Tabs;
