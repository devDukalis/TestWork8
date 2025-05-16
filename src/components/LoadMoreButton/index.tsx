import { type FC } from "react";

interface Props {
  handleClick: () => void;
  value: string;
}

export const LoadMoreButton: FC<Props> = ({ handleClick, value }) => {
  return (
    <button onClick={handleClick} className="btn btn-primary">
      {value}
    </button>
  );
};
