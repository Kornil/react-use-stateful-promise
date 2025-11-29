import { describe, expect, test } from "vitest";

import { actions } from "../actions";
import { ActionTypes } from "../types";

describe("actions", () => {
    test("creates idle action", () => {
    expect(actions.idle()).toEqual({ type: ActionTypes.IDLE });
  });
  
  test("creates reset action with payload", () => {
    const result = actions.reset("data");
    expect(result).toEqual({ type: ActionTypes.RESET, payload: "data" });
  });
  
  test("creates loading action", () => {
    expect(actions.loading()).toEqual({ type: ActionTypes.LOADING });
  });

  test("creates error action", () => {
    const err = new Error("boom");
    expect(actions.error(err)).toEqual({
      type: ActionTypes.ERROR,
      payload: err,
    });
  });

  test("creates success action with payload", () => {
    const result = actions.success(123);
    expect(result).toEqual({ type: ActionTypes.SUCCESS, payload: 123 });
  });
});
