import React, { FC, memo } from "react";
import cls from "classnames";
import { DayProps } from "./TimetableItem.typings";
import styles from "./TimetableItem.module.css";

export const TimetableItem: FC<DayProps> = memo(({ day, period, isToday }) => (
  <li className={styles.listItem}>
    <span className={styles.dayName}>
      <div className={styles.day}>{day}</div>
      {isToday && <div className={styles.today}>TODAY</div>}
    </span>
    <div className={cls(!period && styles.closed)}>{period || "Closed"}</div>
  </li>
));
