import { type FC } from "react";

import styles from "@/components/ForecastTitle/ForecastTitle.module.scss";

interface Props {
  city: string;
  value: string;
}

export const ForecastTitle: FC<Props> = ({ city, value }) => (
  <h2 className={`text-center mb-5 ${styles.title || ""}`}>
    {value} {city}
  </h2>
);
