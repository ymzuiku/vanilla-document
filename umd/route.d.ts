export declare const navHistory: import("./createHistory").IHistory;
export interface IRouteProps {
    component?: any;
    delay?: number;
    keep?: boolean;
    leaveTime?: number;
    path: string;
    children?: any;
}
/**
 *  Route 使用 history.listen 而不使用 consumer 是因为 Route 属于非常固定的模式.
 *  Route 会常驻 ReactNode 对象树，使用 listen 可以有效减少不必要的 consumer 订阅。
 */
export declare function Route<S>({ path, component, delay, keep, leaveTime }: IRouteProps): HTMLDivElement;
