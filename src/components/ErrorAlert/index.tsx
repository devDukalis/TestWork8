import { type FC } from "react";

interface Props {
  message: string;
}

export const ErrorAlert: FC<Props> = ({ message }) => (
  <div className="alert alert-danger mt-4 text-center" role="alert">
    {message}
  </div>
);
