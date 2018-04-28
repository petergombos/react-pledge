# React Pledge


```js
import React, { Fragment } from 'react'

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
  })

const upVote = delay(2000)
const downVote = delay(3000)

const App = () => (
  <Track these={{ upVote, downVote }}>
    {({ upVote, downVote }, { pending, error, upVote: up, downVote: down }) =>
      pending ? (
        'Loading...'
      ) : error ? (
        'Woops, sorry someting went wrong.'
      ) : (
        <Fragment>
          <button onClick={downVote} disabled={pending || down.resolved}>
            {down.resolved ? 'Success' : 'Downvote'}
          </button>
          <button onClick={upVote} disabled={pending || up.resolved}>
            {up.resolved ? 'Success' : 'Upvote'}
          </button>
        </Fragment>
      )
    }
  </Track>
)

```
