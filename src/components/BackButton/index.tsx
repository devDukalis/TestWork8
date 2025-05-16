import { type FC } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/Icon";

import styles from "@/components/BackButton/BackButton.module.scss";

interface Props {
  value: string;
}

export const BackButton: FC<Props> = ({ value }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={`${styles.backButton}`}>
      <Icon
        width={20}
        height={20}
        pathD="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
      />
      {value}
    </button>
  );
};
