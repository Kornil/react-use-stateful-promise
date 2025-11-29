import { useStatefulPromise } from "../lib/main.ts";
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
  >(waitPromise, 0, {
    onSuccess: (newData) =>appendLog(`Run succeeded with data: ${newData}`),
    onError: (error) => appendLog(`Run failed with error: ${error.message}.`),
    onCancel: () => appendLog(`Cancel triggered by user.`),
    onReset: () => appendLog(`Reset triggered by user.`),
  });

  const onRun = useCallback(async () => {
    appendLog(`Run started (delay=${delay}, error=${shouldError})`);
    await run(delay, shouldError);
  }, [delay, run, shouldError]);

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
        <button onClick={cancel}>Cancel</button>
        <button onClick={reset}>Reset</button>
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
