export interface Action<T> {
    run(...args: Array<unknown>): Promise<T>;
}
