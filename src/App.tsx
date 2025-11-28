import { useStatefulPromise } from '../lib/main.ts';
import { useCallback } from 'react';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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
  }

  const { status, data, run, cancel, reset } = useStatefulPromise<number, [number, boolean]>(waitPromise, 0);

  const runOnce = useCallback(() => {
    run(2000, false);
  }, [run]);

  const runWithError = useCallback(() => {
    run(2000, true);
  }, [run]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{status}</h1>
      <h2>{data}</h2>
      <div>
        <button onClick={runOnce}>Run</button>
        <button onClick={runWithError}>Run with error</button>
      </div>
      <button onClick={cancel}>Cancel</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default App
