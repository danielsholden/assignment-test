import React, { FC, useMemo } from "react";
import styles from "./App.module.css";
import { prepareData } from "./helpers";
import { AppProps } from "./typings";
import { Icon, Timetable } from "./components";

export const App: FC<AppProps> = ({ timetable }) => {
  const data = useMemo(() => prepareData(timetable), [timetable]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.timetable}>
        <div className={styles.header}>
          <Icon />
          <span className={styles.title}>Opening hours</span>
        </div>
        <Timetable data={data} />
      </div>
    </div>
  );
};
