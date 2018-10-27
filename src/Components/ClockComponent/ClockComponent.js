import React, { Component } from 'react';

class ClockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.clockInterval = setInterval(() => {
      this.setState((prevState, props) => ({
        date: new Date(),
      }));
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  render() {
    return (
      <div className="container"><span>{this.state.date.toDateString()} </span>{this.state.date.toLocaleTimeString()}</div>
    );
  }
}

export default ClockComponent;
