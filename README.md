# UseStatefulPromise react hook

![npm version](https://img.shields.io/npm/v/react-use-stateful-promise)
![build](https://img.shields.io/github/actions/workflow/status/kornil/react-use-stateful-promise/publish.yaml)
![dependencies](https://img.shields.io/librariesio/release/npm/react-use-stateful-promise)
[![codecov](https://codecov.io/gh/Kornil/react-use-stateful-promise/graph/badge.svg?token=GLE1K3QYHG)](https://codecov.io/gh/Kornil/react-use-stateful-promise)
![license](https://img.shields.io/npm/l/react-use-stateful-promise)

A tiny, no-dependencies, fully type-safe React hook for running async functions with built-in status management, cancellation, reset, state synchronization and optional side effects.

### Features

- 🚀 Run any async function (`fetch` or any other library or custom)
- 👁️ Track async operation status `idle | loading | success | error`
- 🧠 Stores data & error inside hook state
- ❌ Supports cancellation (prevents state updates after cancel)
- 🔄 Supports reset (cancels and restores initial state)
- 🔒 Race-condition safe (only the latest call can update state)
- 🪶 Lightweight (no dependencies)
- 🔧 Fully typed with TypeScript generics
- ⚛️ React Compiler compatible (no need for useCallback)

## Demo

[Live Demo on GitHub Pages](https://kornil.github.io/react-use-stateful-promise/)

The demo showcases:

- Running successful async operations
- Error handling on rejected async operations
- Canceling in-flight promises
- Resetting state
- Ensuring no race conditions (Only the latest invocation resolves — stale promises are ignored automatically.)
- Visualizing status transitions (IDLE → LOADING → SUCCESS / ERROR)

You can also explore the full demo source code inside the `/demo` folder of the repository.

## Install

npm:

```bash
npm install react-use-stateful-promise
```

yarn:

```bash
yarn add react-use-stateful-promise
```



## Usage

TypeScript (with types):

```ts
import { useStatefulPromise, Status } from "react-use-stateful-promise";

import { User } from "./types";

function Example() {
  const fetchUser = async (id: number) => {
    const res = await fetch(`/api/user/${id}`);
    return res.json();
  };

  const { status, data, error, run, cancel, reset } = useStatefulPromise<
    User,
    [number]
  >(fetchUser, {});

  return (
    <div>
      <button onClick={() => run(1)}>Load user</button>

      {status === Status.LOADING && <p>Loading...</p>}
      {status === Status.ERROR && <p>Error: {error?.message}</p>}
      {status === Status.SUCCESS && <pre>{JSON.stringify(data.name)}</pre>}

      <button onClick={cancel}>Cancel</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

JavaScript (no types):

```js
import { useStatefulPromise, Status } from "react-use-stateful-promise";

function Example() {
  const fetchUser = async (id) => {
    const res = await fetch(`/api/user/${id}`);
    return res.json();
  };

  const { status, data, error, run, cancel, reset } = useStatefulPromise(
    fetchUser,
    {}
  );

  return (
    <div>
      <button onClick={() => run(1)}>Load user</button>

      {status === Status.LOADING && <p>Loading...</p>}
      {status === Status.ERROR && <p>Error: {error?.message}</p>}
      {status === Status.SUCCESS && <pre>{JSON.stringify(data.name)}</pre>}

      <button onClick={cancel}>Cancel</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## API Reference

```js
const { status, data, run, cancel, reset } = useStatefulPromis(
  asyncFunction,
  initialData,
  {
    // optional callbacks for each action
    onSuccess: (newData) => newData,
    onError: (error) => error,
    onCancel: () => null,
    onReset: () => null,
  }
);
```

#### Returned values

| Name               | Type                                                     | Description                                                                                                               |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **`status`**       | `Status` (`"IDLE" \| "LOADING" \| "ERROR" \| "SUCCESS"`) | The current state of the async call.                                                                                      |
| **`data`**         | `T`                                                      | The resolved value from the async function.                                                                               |
| **`error`**        | `Error \| null`                                          | The caught error if the async function rejects.                                                                           |
| **`run(...args)`** | `(...args: Args) => Promise<T>`                          | Runs the async function with the given arguments, updates state accordingly. Returns the underlying promise for chaining. |
| **`cancel()`**     | `() => void`                                             | Cancels the current pending async call and resets the hook to `IDLE`. Prevents updates from the canceled promise.         |
| **`reset()`**      | `() => void`                                             | Fully resets state, clears `data` and `error`, and cancels any pending promise.                                           |

#### Parameters

| Parameter               | Type                          | Required | Description                                                       |
| ----------------------- | ----------------------------- | -------- | ----------------------------------------------------------------- |
| **`asyncFunction`**     | `(…args: Args) => Promise<T>` | ✔️ Yes   | Any function returning a Promise. The hook manages its lifecycle. |
| **`initialData`**       | `T`                           | ✔️ Yes   | Initial value for data.                                           |
| **`options`**           | `object`                      | ✖️ No    | Optional callbacks triggered on success, error, cancel, or reset. |
| **`options.onSuccess`** | `(data: T) => void`           | ✖️ No    | Called when the async function resolves.                          |
| **`options.onError`**   | `(error: Error) => void`      | ✖️ No    | Called when the async function rejects.                           |
| **`options.onCancel`**  | `() => void`                  | ✖️ No    | Called when the async operation is cancelled.                     |
| **`options.onReset`**   | `() => void`                  | ✖️ No    | Called when `reset()` is invoked.                                 |

## Contributing

Contributions are welcome and appreciated, be it opening issues, opening pull requests or just asking questions.

The repository includes the demo environment for easier testing of the hook.

To start working, fork and clone the repository locally and then

```bash
cd react-use-stateful-promise

npm i # Install deps

npm run test # Run tests
npm run dev # Spin up demo environment
```

The hook code is located in the `/lib` folder.

The demo code is located in the `/demo` folder.

## LICENSE

[MIT](LICENSE)
