export declare const store: {
    listens: Set<ICache>;
    addListen: (item: ICache) => () => void;
    _state: any;
    getState: <T>() => T;
    update: <T>(fn: (stateImmerDraft: T) => any) => void;
};
