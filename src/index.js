import { Component } from 'react'

const initialState = {
  pending: false,
  resolved: false,
  rejected: false,
  value: null,
  error: null
}

class Track extends Component {
  state = initialState

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  triggerPromise = (...args) => {
    const { promise } = this.props
    const isMounted = this.mounted

    isMounted &&
      this.setState({
        ...initialState,
        pending: true
      })

    return promise(...args)
      .then(value => {
        isMounted &&
          this.setState({
            ...initialState,
            value,
            resolved: true
          })
      })
      .catch(error => {
        isMounted &&
          this.setState({
            ...initialState,
            error,
            rejected: true
          })
      })
  }

  render() {
    const { render, children, promise } = this.props
    const callback = render || children
    if (typeof callback !== 'function') {
      throw Error(
        'One of the props: `render` or `children` must be defined and it must be a function.'
      )
    }

    if (!promise) {
      throw Error('The prop `promise` is required.')
    }

    return callback(this.triggerPromise, this.state)
  }
}

export default Track
