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
declare const Route: <S>({ path, component, delay, keep, leaveTime }: import("./createRoute").IRouteProps) => import("./dom-tools").IDOM<HTMLDivElement>, routeManage: import("./createHistory").IHistory;
export { store, Route, routeManage };
