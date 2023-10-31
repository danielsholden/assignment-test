import React, { memo } from "react";
import styles from "./Icon.module.css";

export const Icon = memo(() => (
  <svg fill="currentColor" viewBox="0 0 32 32" className={styles.svg}>
    <path
      fillRule="evenodd"
      d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12zm2 0c0 7.732-6.268 14-14 14S2 23.732 2 16 8.268 2 16 2s14 6.268 14 14zm-5.5 2a1 1 0 100-2H17V7.5a1 1 0 10-2 0V18h9.5z"
      clipRule="evenodd"
      stroke="#a1a2a4"
      strokeWidth="1.5"
    />
  </svg>
));
