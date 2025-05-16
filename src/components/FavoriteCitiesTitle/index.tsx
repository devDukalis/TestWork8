import { type FC } from "react";

import styles from "@/components/FavoriteCitiesTitle/FavoriteCitiesTitle.module.scss";

interface Props {
  value: string;
}

export const FavoriteCitiesTitle: FC<Props> = ({ value }) => {
  return <h2 className={`text-center mb-5 ${styles.title}`}>{value}</h2>;
};
