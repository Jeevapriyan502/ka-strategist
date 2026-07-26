"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
}

export default class ClientErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.label ?? "page"}]`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-max px-4 py-20 text-center">
          <h2 className="heading-md mb-3">Something went wrong loading this section</h2>
          <p className="mb-6 text-site-muted">
            Try a hard refresh (Ctrl + Shift + R). If it persists, go back to the home page.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
            className="btn-primary"
          >
            Reload home page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
