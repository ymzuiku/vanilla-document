export interface IRouteProps {
    component?: any;
    delay?: number;
    keep?: boolean;
    leaveTime?: number;
    path: string;
    children?: any;
}
export declare function createRoute(store: any): {
    routeManage: import("./createHistory").IHistory;
    Route: <S>({ path, component, delay, keep, leaveTime }: IRouteProps) => import("./dom-tools").IChain<HTMLDivElement>;
};
