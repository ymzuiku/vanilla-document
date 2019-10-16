declare const store: {
    __listenFns: Set<any>;
    __listenNodes: Set<any>;
    __state: any;
    mutationObserver: (target: any) => any;
    middleware: {
        update: any[];
        getState: any[];
    };
    getState: <T extends any>() => T;
    update: <T extends any>(fn: (draft: T) => any) => void;
    listen: (fn: any) => void;
};
declare const Route: <S>({ path, component, delay, keep, leaveTime }: import("./createRoute").IRouteProps) => {
    __isChain: boolean;
    target: HTMLDivElement;
    ref: (fn: (selfTarget: HTMLDivElement) => any) => any;
    addEventListener: <K extends "input" | "progress" | "select" | "fullscreenchange" | "fullscreenerror" | "abort" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "blur" | "cancel" | "canplay" | "canplaythrough" | "change" | "click" | "close" | "contextmenu" | "cuechange" | "dblclick" | "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop" | "durationchange" | "emptied" | "ended" | "error" | "focus" | "gotpointercapture" | "invalid" | "keydown" | "keypress" | "keyup" | "load" | "loadeddata" | "loadedmetadata" | "loadend" | "loadstart" | "lostpointercapture" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "pause" | "play" | "playing" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "ratechange" | "reset" | "resize" | "scroll" | "securitypolicyviolation" | "seeked" | "seeking" | "selectionchange" | "selectstart" | "stalled" | "submit" | "suspend" | "timeupdate" | "toggle" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "volumechange" | "waiting" | "wheel" | "copy" | "cut" | "paste">(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined) => any;
    removeEventListener: <K extends "input" | "progress" | "select" | "fullscreenchange" | "fullscreenerror" | "abort" | "animationcancel" | "animationend" | "animationiteration" | "animationstart" | "auxclick" | "blur" | "cancel" | "canplay" | "canplaythrough" | "change" | "click" | "close" | "contextmenu" | "cuechange" | "dblclick" | "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop" | "durationchange" | "emptied" | "ended" | "error" | "focus" | "gotpointercapture" | "invalid" | "keydown" | "keypress" | "keyup" | "load" | "loadeddata" | "loadedmetadata" | "loadend" | "loadstart" | "lostpointercapture" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup" | "pause" | "play" | "playing" | "pointercancel" | "pointerdown" | "pointerenter" | "pointerleave" | "pointermove" | "pointerout" | "pointerover" | "pointerup" | "ratechange" | "reset" | "resize" | "scroll" | "securitypolicyviolation" | "seeked" | "seeking" | "selectionchange" | "selectstart" | "stalled" | "submit" | "suspend" | "timeupdate" | "toggle" | "touchcancel" | "touchend" | "touchmove" | "touchstart" | "transitioncancel" | "transitionend" | "transitionrun" | "transitionstart" | "volumechange" | "waiting" | "wheel" | "copy" | "cut" | "paste">(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined) => void;
    innerText: (text: string) => any;
    innerHTML: (html: string) => any;
    textContent: (text: string) => any;
    children: (fn: (nodes: HTMLElement[]) => any) => void;
    clearChildren: () => any;
    removeChild: (forEach: (node: HTMLElement, index: number) => any) => void;
    remove: () => any;
    append: (...nodes: any[]) => any;
    setProps: (obj: import("./dom-tools").ISetHTMLElement) => any;
    setAttribute: (key: string, value: any) => any;
    removeAttribute(key: string): any;
    cssText: (text: string) => any;
    setClass: (cssString: string) => any;
    setStyle: (obj: import("./dom-tools").IStyle) => any;
    onUpdate: <S extends any, M extends any[]>(memo: (state: S) => M, fn: (memo: M, selfTarget: HTMLDivElement) => any) => any;
    onAppend: <M extends any[]>(fn: (memo: M, selfTarget: HTMLDivElement) => any) => any;
    onRemove: <M extends any[]>(fn: (memo: M, selfTarget: HTMLDivElement) => any) => any;
}, routeManage: import("./createHistory").IHistory;
export { store, Route, routeManage };
