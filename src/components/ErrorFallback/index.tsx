import { type FC } from "react";
import { type FallbackProps } from "react-error-boundary";

export const ErrorFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div>
      <p>Something went wrong</p>
      <pre>{(error && error?.message) || "Unknown error"}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
