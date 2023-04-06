import React from "react";
import styles from './Container.module.scss';

export interface ContainerProps {
  children?: React.ReactNode,
  as?: "div" | "section" | "nav" | "footer",
}

function Container({children, as}: ContainerProps) {
  const Tag = as ?? "section";

  return <>
    <Tag className={styles.container}>
      {children}
    </Tag>
  </>
}

export default Container;
