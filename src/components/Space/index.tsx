"use client";

import { type FC } from "react";

interface Props {
  direction?: "horizontal" | "vertical";
  size?: number;
}

export const Space: FC<Props> = ({ direction = "horizontal", size = 20 }) => {
  if (direction === "horizontal") {
    return <div style={{ display: "inline-block", width: `${size}px` }} />;
  }

  return <div style={{ display: "block", height: `${size}px` }} />;
};
