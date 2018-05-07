import React, { Fragment } from 'react'
import { mount, shallow } from 'enzyme'

import Track from '../src/index'

const delay = (ms = 1000) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
  })

const submitReject = async () => {
  await delay(100)
  throw Error('failed')
}

const submitResolve = async () => {
  await delay(100)
  return 'resolved'
}

const App = ({ promise }) => (
  <Track promise={promise}>
    {(handleSubmit, { pending, resolved, value, rejected, error }) => (
      <Fragment>
        <span>
          {pending
            ? 'pending'
            : resolved
              ? value
              : rejected
                ? error.message
                : null}
        </span>
        <button onClick={handleSubmit}>Submit</button>
      </Fragment>
    )}
  </Track>
)

const reject = mount(<App promise={submitReject} />)
const rejectPromise = reject.find('button').props().onClick
const resolve = mount(<App promise={submitResolve} />)
const resolvePromise = resolve.find('button').props().onClick

describe('react-pledge', () => {
  it('should have a `pending` state after the promise is invoked but not yet rejected/resolved', async () => {
    resolve.find('button').simulate('click')
    expect(resolve.find('span').text()).toEqual('pending')
  })

  it('should be in a `resolved` state with the `value` returned from the promise', async () => {
    await resolvePromise()
    expect(resolve.find('span').text()).toEqual('resolved')
  })

  it('should be in `rejected` state and have the `error` with the rejected promise error', async () => {
    reject.find('button').simulate('click')
    await rejectPromise()
    expect(reject.find('span').text()).toEqual('failed')
  })

  it('should throw an error if the supplied `promise` prop is not a valid Promise', () => {
    expect(() => {
      shallow(<Track promise={submitResolve} />)
    }).toThrowError(
      Error(
        'One of the props: `render` or `children` must be defined and it must be a function.'
      )
    )
  })

  it('should throw an error if no `promise` prop is defined', () => {
    expect(() => {
      shallow(<Track render={() => {}} />)
    }).toThrowError(Error('The prop `promise` is required.'))
  })
})
