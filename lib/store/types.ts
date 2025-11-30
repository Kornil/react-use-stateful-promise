export const Status = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const ActionTypes = {
  IDLE: "IDLE",
  RESET: "RESET",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes];

export interface ReducerState<T> {
  status: Status;
  data: T;
  error: Error | null;
}

export interface ActionIdle { type: typeof ActionTypes.IDLE }
export interface ActionReset<T> { type: typeof ActionTypes.RESET; payload: T }
export interface ActionLoading { type: typeof ActionTypes.LOADING }
export interface ActionError { type: typeof ActionTypes.ERROR; payload: Error }
export interface ActionSuccess<T> { type: typeof ActionTypes.SUCCESS; payload: T }

export type Action<T> =
  | ActionIdle
  | ActionReset<T>
  | ActionLoading
  | ActionError
  | ActionSuccess<T>;
