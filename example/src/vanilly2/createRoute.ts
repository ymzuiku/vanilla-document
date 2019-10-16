import { DOM, IStyle } from './dom-tools';
import { createHistory } from './createHistory';

const SHOW_DISPLAY = 'block';
const HIDDEN_DISPLAY = 'block';
const HIDDEN_ZINDEX = 1;
const LAST_ZINDEX = 2;
const SHOW_ZINDEX = 3;
const HIDDEN_POSITION = 'absolute';
const SHOW_POSIRION = 'relative';
const SHOW_POINTEREVENTS = 'auto';
const HIDDEN_POINTEREVENTS = 'none';

export interface IRouteProps {
  /* component 可以是组件对象，也可以是 import() 函数, 其中 import() 函数需要配合 delay 实现 */
  component?: any;
  /* 等待若干毫秒，异步读取组件，若未定义，则同步读取组件; 如果路由提前切换到目标组件，会忽略延迟加载，直接开始异步 */
  delay?: number;
  /* 如果历史路由中包含path，使用 div包裹子组件，并设置 dispatch=none 代替 return null */
  keep?: boolean;
  /* 预留给页面跳转的时间，等待若干毫秒，才将当前画面设置为 display: none */
  leaveTime?: number;
  /* 用于校验路由的路径 */
  path: string;
  children?: any;
}

export function createRoute(store: any) {
  const routeManage = createHistory(store);

  /**
   *  Route 使用 history.listen 而不使用 consumer 是因为 Route 属于非常固定的模式.
   *  Route 会常驻 ReactNode 对象树，使用 listen 可以有效减少不必要的 consumer 订阅。
   */
  function Route<S>({ path, component, delay, keep = true, leaveTime }: IRouteProps) {
    const route = DOM('div');
    route.setAttribute('route', path);

    route.setStyle({
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      left: '0px',
      top: '0px',
      backgroundColor: '#fff',
      pointerEvents: HIDDEN_POINTEREVENTS,
      display: HIDDEN_DISPLAY,
      position: HIDDEN_POSITION,
      zIndex: HIDDEN_ZINDEX,
    });

    const state = {
      animeTimer: null as any,
      unListen: null as any,
      isRenderChild: false,
      style: {} as IStyle,
      realChild: null as any,
    };

    const onHistoryUpdate = () => {
      const [match, stackMatch, lastPage] = routeManage.checkPathMatch(path);

      console.log(match, stackMatch, lastPage, path);

      if (match) {
        // 如果没有 child, 先读取，再重新执行

        if (!state.realChild) {
          if (delay === undefined) {
            state.realChild = component();
            route.innerHTML('').append(state.realChild);
            onHistoryUpdate();
          } else {
            component().then((comp: any) => {
              state.realChild = comp();
              route.innerHTML('').append(state.realChild);
              onHistoryUpdate();
            });
          }
        }
        state.isRenderChild = true;
        state.style = {
          pointerEvents: SHOW_POINTEREVENTS,
          display: SHOW_DISPLAY,
          position: SHOW_POSIRION,
          zIndex: SHOW_ZINDEX,
        };
        route.setStyle(state.style);
      } else {
        // 如果不需要保持组件，清空child
        const isKeepChild = keep && stackMatch;
        const oldIsRenderChild = state.isRenderChild;

        if (state.isRenderChild === undefined || state.isRenderChild === true) {
          if (lastPage > 0 && leaveTime && leaveTime > 0) {
            state.style = {
              pointerEvents: SHOW_POINTEREVENTS,
              display: SHOW_DISPLAY,
              position: HIDDEN_POSITION,
              zIndex: SHOW_DISPLAY,
            };
            route.setStyle(state.style);

            setTimeout(() => {
              state.isRenderChild = isKeepChild;
              state.style = {
                pointerEvents: HIDDEN_POINTEREVENTS,
                display: HIDDEN_DISPLAY,
                position: HIDDEN_POSITION,
                zIndex: HIDDEN_ZINDEX,
              };
              route.setStyle(state.style);
              if (oldIsRenderChild && !state.isRenderChild) {
                route.innerHTML('');
              } else {
                if (!oldIsRenderChild) {
                  route.innerHTML('').append(state.realChild);
                }
              }
            }, leaveTime);
          } else {
            state.isRenderChild = isKeepChild;
            state.style = {
              pointerEvents: HIDDEN_POINTEREVENTS,
              display: HIDDEN_DISPLAY,
              position: HIDDEN_POSITION,
              zIndex: lastPage > 0 ? LAST_ZINDEX : HIDDEN_ZINDEX,
            };
            route.setStyle(state.style);
            if (oldIsRenderChild && !state.isRenderChild) {
              route.innerHTML('');
            } else {
              if (!oldIsRenderChild) {
                route.innerHTML('').append(state.realChild);
              }
            }
          }
        }
      }
    };

    route.onAppend(() => {
      state.unListen = routeManage.listen(onHistoryUpdate);
    });

    route.onRemove(() => {
      if (state.unListen) {
        state.unListen();
      }
      state.realChild = null;
      state.animeTimer = null;
    });

    return route.target;
  }

  return { routeManage, Route };
}
