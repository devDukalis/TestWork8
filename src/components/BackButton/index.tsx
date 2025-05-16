import { type FC } from "react";
import { useRouter } from "next/navigation";

import { BackToMainIcon } from "../BackToMainIcon";

import styles from "@/components/BackButton/BackButton.module.scss";

interface Props {
  value: string;
}

export const BackButton: FC<Props> = ({ value }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={`${styles.backButton}`}>
      <BackToMainIcon />
      {value}
    </button>
  );
};
