"use client";

import { type FC, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/components/ErrorFallback";

interface Props {
  children?: ReactNode;
}

export const AppErrorBoundary: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};
