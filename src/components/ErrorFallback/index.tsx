"use client";

import { type FC } from "react";
import { type FallbackProps } from "react-error-boundary";

import styles from "@/components/ErrorFallback/ErrorFallback.module.scss";

export const ErrorFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div
      className={`container py-4 ${styles.container}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="row justify-content-center">
        <div className={`${styles.errorContent} col-md-8 col-lg-6`}>
          <h2 className={styles.errorTitle}>Something went wrong</h2>
          <pre className={styles.errorMessage}>
            {(error && error?.message) || "Unknown error"}
          </pre>
          <button
            onClick={resetErrorBoundary}
            className={styles.resetButton}
            aria-label="Retry loading content"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
