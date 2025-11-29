import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { Status, useStatefulPromise } from "../main";

describe("useStatefulPromise", () => {
  test("runs successfully and updates state", async () => {
    vi.useFakeTimers();
    let runPromise: Promise<number | null>;
    const initialData = 0;
    const newData = 42;

    const asyncFn = vi.fn(
      (ms: number) =>
        new Promise<number>((resolve) => {
          setTimeout(() => resolve(newData), ms);
        })
    );

    const { result } = renderHook(() =>
      useStatefulPromise(asyncFn, initialData)
    );

    act(() => {
      runPromise = result.current.run(1000);
    });

    // Immediately after calling run → status should be LOADING
    expect(result.current.status).toBe(Status.LOADING);

    // Trigger timeout
    await act(async () => {
      vi.runAllTimers();
      await runPromise;
    });

    expect(result.current.status).toBe(Status.SUCCESS);
    expect(result.current.data).toBe(newData);
    expect(asyncFn).toHaveBeenCalledWith(1000);

    vi.useRealTimers();
  });

  test("handles errors correctly", async () => {
    vi.useFakeTimers();
    let promise: Promise<number | null>;
    const initialData = 0;

    const asyncFn = vi.fn(
      (ms: number) =>
        new Promise<number>((_resolve, reject) => {
          setTimeout(() => reject(new Error("Fail!")), ms);
        })
    );

    const { result } = renderHook(() =>
      useStatefulPromise(asyncFn, initialData)
    );

    act(() => {
      promise = result.current.run(1000);
    });

    expect(result.current.status).toBe(Status.LOADING);

    await act(async () => {
      vi.runAllTimers();
      await promise;
    });

    expect(result.current.status).toBe(Status.ERROR);
    expect(result.current.error?.message).toBe("Fail!");

    vi.useRealTimers();
  });

  test("cancels a running promise", async () => {
    vi.useFakeTimers();
    let promise: Promise<number | null>;
    const initialData = 0;
    const newData = 42;

    const asyncFn = vi.fn(
      (ms: number) =>
        new Promise<number>((resolve) => {
          setTimeout(() => resolve(newData), ms);
        })
    );

    const { result } = renderHook(() =>
      useStatefulPromise(asyncFn, initialData)
    );

    act(() => {
      promise = result.current.run(1000);
    });

    act(() => {
      result.current.cancel();
    });

    expect(result.current.status).toBe(Status.IDLE);
    expect(result.current.data).toBe(initialData);

    await act(async () => {
      vi.runAllTimers();
      await promise;
    });

    expect(result.current.data).toBe(initialData);
    expect(result.current.status).toBe(Status.IDLE);

    vi.useRealTimers();
  });

  test("resets back to initialData", () => {
    const initialData = 0;
    const newData = 42;

    const asyncFn = vi.fn(() => Promise.resolve(newData));

    const { result } = renderHook(() =>
      useStatefulPromise(asyncFn, initialData)
    );

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBe(initialData);
    expect(result.current.status).toBe(Status.IDLE);
  });
});
