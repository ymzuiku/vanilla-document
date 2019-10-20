export declare function createStore<T>(state: T): {
    state: T;
    events: Set<any>;
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: (fn: (state: T) => any, memo?: ((state: T) => any[]) | undefined) => () => void;
    unListen: (fn: any) => void;
    setState: (payload: T) => void;
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => void;
    update: (fn?: ((state: T) => any) | undefined) => void;
};
