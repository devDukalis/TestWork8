import { type FC } from "react";

interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  pathD: string;
  viewBox?: string;
}

export const Icon: FC<Props> = ({
  className = "",
  width = 24,
  height = 24,
  pathD,
  viewBox = "0 0 16 16",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="currentColor"
      className={className}
      viewBox={viewBox}
    >
      <path d={pathD} />
    </svg>
  );
};
