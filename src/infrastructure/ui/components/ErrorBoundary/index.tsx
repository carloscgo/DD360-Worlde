// infrastructure/ui/components/ErrorBoundary

import React, { ReactNode } from 'react'

interface ComponentProps {
  hasError?: boolean
  children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Some = any

interface ComponentState {
  hasError: boolean
  error: Some
}

class ErrorBoundary extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: props.hasError || false, error: null }
  }

  static getDerivedStateFromError(error: Some) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error }
  }

  componentDidCatch(error: Some, errorInfo: Some) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again?
          </button>
        </div>
      )
    }

    // Some children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
