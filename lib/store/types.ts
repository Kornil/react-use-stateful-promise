export const Status = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export interface ReducerState<T> {
  status: Status;
  data: T | null;
  error: Error | null;
}

export type ActionIdle = { type: typeof Status.IDLE }
export type ActionLoading = { type: typeof Status.LOADING }
export type ActionError = { type: typeof Status.ERROR; payload: Error }
export type ActionSuccess<T> = { type: typeof Status.SUCCESS; payload: T }

export type Action<T> =
  | ActionIdle
  | ActionLoading
  | ActionError
  | ActionSuccess<T>
