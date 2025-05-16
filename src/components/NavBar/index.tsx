import { FC, ReactNode } from "react";

import styles from "@/components/NavBar/NavBar.module.scss";

interface Props {
  children?: ReactNode;
}

export const NavBar: FC<Props> = ({ children }) => (
  <nav className={`${styles.nav} shadow-sm mb-4`}>
    <div className="d-flex gap-3 flex-wrap">{children}</div>
  </nav>
);
