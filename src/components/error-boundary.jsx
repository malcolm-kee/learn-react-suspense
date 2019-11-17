import React from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    return this.state.error ? this.props.fallback : <>{this.props.children}</>;
  }

  static defaultProps = {
    fallback: (
      <div className="container">
        <h1>Something goes wrong.</h1>
      </div>
    ),
  };
}
