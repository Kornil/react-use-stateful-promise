import {
  Status,
  type ActionError,
  type ActionIdle,
  type ActionLoading,
  type ActionSuccess,
} from "./types";

export const actions = {
  idle: (): ActionIdle => ({ type: Status.IDLE }),
  loading: (): ActionLoading => ({ type: Status.LOADING }),
  error: (payload: Error): ActionError => ({ type: Status.ERROR, payload }),
  success: <T>(payload: T): ActionSuccess<T> => ({
    type: Status.SUCCESS,
    payload,
  }),
};
