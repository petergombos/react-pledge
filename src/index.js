import { Component } from "react";

const initialState = {
  pending: false,
  resolved: false,
  rejected: false,
  value: null,
  error: null
};

class Track extends Component {
  state = initialState;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  triggerPromise = async (...args) => {
    const { promise } = this.props;
    const isMounted = this.mounted;

    isMounted &&
      this.setState({
        pending: true
      });

    try {
      const value = await promise(...args);
      isMounted &&
        this.setState({
          value,
          pending: false,
          resolved: true
        });
    } catch (error) {
      isMounted &&
        this.setState({
          error,
          pending: false,
          rejected: true
        });
    }
  };

  render() {
    const { render, children } = this.props;
    const callback = render || children;
    if (typeof callback !== "function") {
      throw Error("Props `render` or `children` must be a function.");
    }
    if (typeof promise !== "function") {
      throw Error("The prop `promise` is required.");
    }

    return callback(this.triggerPromise, this.state);
  }
}

export default Track;
