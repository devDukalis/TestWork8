import { type FC } from "react";

interface Props {
  value: string;
}

export const NoFavoriteCitiesMessage: FC<Props> = ({ value }) => {
  return (
    <p className="mt-3 mb-0" aria-live="polite">
      {value}
    </p>
  );
};
