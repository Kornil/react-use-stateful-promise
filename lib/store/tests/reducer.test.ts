import { describe, expect, test } from "vitest";

import { reducer } from "../reducer";
import { Status, ActionTypes } from "../types";

describe("reducer", () => {
  const initial = {
    status: Status.IDLE,
    data: null,
    error: null,
  };

  test("handles IDLE", () => {
    const next = reducer(
      { status: Status.LOADING, data: null, error: new Error("boom") },
      { type: ActionTypes.IDLE }
    );
    expect(next.status).toBe(Status.IDLE);
    expect(next.error).toBe(null);
  });

  test("handles RESET", () => {
    const next = reducer(
      { status: Status.SUCCESS, data: 10, error: null },
      { type: ActionTypes.RESET, payload: null }
    );

    expect(next.status).toBe(Status.IDLE);
    expect(next.data).toBe(null);
  });

  test("handles LOADING", () => {
    const next = reducer(initial, { type: ActionTypes.LOADING });
    expect(next.status).toBe(Status.LOADING);
    expect(next.error).toBe(null);
  });

  test("handles ERROR", () => {
    const err = new Error("boom");
    const next = reducer(initial, { type: ActionTypes.ERROR, payload: err });
    expect(next.status).toBe(Status.ERROR);
    expect(next.error).toBe(err);
  });

  test("handles SUCCESS", () => {
    const next = reducer(initial, { type: ActionTypes.SUCCESS, payload: 42 });
    expect(next.status).toBe(Status.SUCCESS);
    expect(next.data).toBe(42);
  });

  test("throws on unknown action", () => {
    expect(() =>
      reducer(initial, { type: "UNKNOWN_ACTION" } as never)
    ).toThrowErrorMatchingInlineSnapshot(
      `[Error: Unknown action {"type":"UNKNOWN_ACTION"}]`
    );
  });
});
