# React Pledge

Declarative way to track promise states

```js
import React, { Fragment } from "react";

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });

const submit = delay(2000);

const App = () => (
  <Track promise={submit}>
    {(handleSubmit, { pending, resolved, rejected }) =>
      pending ? (
        "Loading..."
      ) : rejected ? (
        "Woops, sorry someting went wrong."
      ) : resolved ? (
        "Woohoo, submission "
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )
    }
  </Track>
);
```
