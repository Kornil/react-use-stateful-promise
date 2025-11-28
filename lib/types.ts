export type Run<S, Args extends unknown[]> = (...args: Args) => Promise<S>;
