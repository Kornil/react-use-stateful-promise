import { Status, useStatefulPromise } from "../lib/main.ts";
import { useCallback, useState } from "react";

import "./App.css";

function App() {
  const [delay, setDelay] = useState(2000);
  const [shouldError, setShouldError] = useState(false);

  // logs for demo purposes
  const [log, setLog] = useState<string[]>([]);
  const appendLog = (msg: string) =>
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const waitPromise = (ms: number, shouldError: boolean): Promise<number> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldError) {
          reject(new Error("Simulated error"));
        } else {
          resolve(data + 1);
        }
      }, ms);
    });
  };

  const { status, data, run, cancel, reset } = useStatefulPromise<
    number,
    [number, boolean]
  >(waitPromise, 0);

  const onRun = useCallback(() => {
    appendLog(`Run started (delay=${delay}, error=${shouldError})`);
    run(delay, shouldError).then((result) => {
      if (status === Status.SUCCESS) {
        appendLog(`Run succeeded with result: ${result}`);
      } else if (status === Status.ERROR) {
        appendLog(`Run failed with error.`);
      } else if (status === Status.IDLE) {
        appendLog(`Run was canceled.`);
      }
    });
  }, [delay, run, shouldError, status]);

  const onCancel = useCallback(() => {
    appendLog("Run canceled by user.");
    cancel();
  }, [cancel]);

  const onReset = useCallback(() => {
    appendLog("Reset triggered by user.");
    reset();
  }, [reset]);

  return (
    <div className="demo">
      <h1 className={status}>{status}</h1>
      <h2>{data}</h2>

      <div className="controls">
        <label>
          Delay (ms):
          <input
            type="number"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
        </label>

        <label>
          Error?
          <input
            type="checkbox"
            checked={shouldError}
            onChange={(e) => setShouldError(e.target.checked)}
          />
        </label>
      </div>

      <div className="buttons">
        <button onClick={onRun}>Run</button>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onReset}>Reset</button>
      </div>

      <div className="log-wrapper">
        <pre className="log-box">
        <h3 className="log-title">Logs</h3>
          {log.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
        <button onClick={() => setLog([])}>Clear logs</button>
      </div>
    </div>
  );
}

export default App;
