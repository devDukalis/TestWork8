import { type FC } from "react";

import styles from "@/components/FavoriteCounter/FavoriteCounter.module.scss";

interface Props {
  count: number;
}

export const FavoriteCounter: FC<Props> = ({ count }) => {
  return <div className={styles.counter}>{count}</div>;
};
