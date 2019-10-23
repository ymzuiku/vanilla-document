export interface IRouteProps {
    component?: any;
    delay?: number;
    keep?: boolean;
    leaveTime?: number;
    path: string;
    children?: any;
}
declare const routeManage: import("./createHistory").IHistory, Route: <S>({ path, component, delay, keep, leaveTime }: IRouteProps) => HTMLDivElement;
export { routeManage, Route };
