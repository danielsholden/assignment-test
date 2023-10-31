import React, { FC, memo } from "react";
import { TimetableProps } from "./Timetable.typings";
import { TimetableItem } from "..";
import styles from "./Timetable.module.css";

const curDate = new Date();
const today = curDate.toLocaleString("en-us", {
  weekday: "long",
});

export const Timetable: FC<TimetableProps> = memo(({ data }) => {
  if (!data) return null;

  return (
    <ul className={styles.list}>
      {data.map(({ day, period }, idx) => {
        const isToday = day.toLowerCase() === today.toLowerCase();

        return (
          <TimetableItem
            key={`${day}-${idx}`}
            day={day}
            period={period}
            isToday={isToday}
          />
        );
      })}
    </ul>
  );
});
