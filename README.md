# React Pledge 🕴

Declarative way to track promise lifecycle states using "render props" 🕶

✅ Zero dependencies

✅ [**3.2k gzipped**](https://bundlephobia.com/result?p=react-pledge)

## Usage

```js
import React from 'react'
import Track from 'react-pledge'

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
  })

const submit = async () => {
  await delay(2000)
  if (Math.random() > 0.5) {
    throw Error('Some error message 🤒')
  }
  return '🙌'
}

const App = () => (
  <Track promise={submit}>
    {(handleSubmit, { pending, resolved, value, rejected, error }) => (
      <div>
        <div>
          {pending ? (
            'Loading...'
          ) : rejected ? (
            error.message
          ) : resolved ? (
            <span>Woohoo, success!!!</span>
          ) : null}
        </div>
        <button onClick={handleSubmit} disabled={pending}>
          {pending ? 'Submitting' : 'Submit'}
        </button>
        {resolved && <div>The returned value of the promise is: {value}</div>}
      </div>
    )}
  </Track>
)
```

### [Simple Example](https://codesandbox.io/s/2z06vmyv0y)

## Installation

```bash
npm install --save react-pledge
```

or

```bash
yarn add react-pledge
```

## Props

### `promise`

A promise you want to track

### `children` or `render`

A render function that will be called with the following arguments:

* `invoke function` to trigger the given promise
* `state object` with the current state of the promise

The state will contain the following:

* `pending`: boolean
* `resolved`: boolean
* `value`: the returned value of the promise | null,
* `rejected`: boolean,
* `error`: the returned error during the rejection of the promise | null
