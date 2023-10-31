import { DayName, TimeProp } from "../typings";

const HOUR_IN_SECONDS = 3600;
const CLOSE = "close";

export const formatTime = (value: number) => {
  if (value < 0) return null;

  const timeValue = value / HOUR_IN_SECONDS;
  const suffix = timeValue >= 12 ? " PM" : " AM";

  return ((timeValue + 11) % 12) + 1 + suffix;
};

export const createPeriodString = (arr: TimeProp[]) => {
  if (!arr.length) return null;

  return arr.reduce((str, item, idx) => {
    str = str + formatTime(item.value);

    if (!(idx % 2) && idx !== arr.length-1) {
      str += ' - ';
    }

    if ((idx % 2) && idx !== arr.length-1) {
      str += ', ';
    }

    return str;
  }, '');
}

export const getTimetable = (timetable: Record<DayName, TimeProp[]>) => {
  const data = Object.entries(timetable);

  const [_, mondayTimetable] = data[0];
  const sundayCloseTime = mondayTimetable.length && mondayTimetable[0].type === CLOSE ? mondayTimetable.pop() : null;
  const timesArr: TimeProp[][] = [];

  data.forEach(([_, time], idx) => {
    if (time.length && time[0].type === CLOSE) {
      timesArr[idx - 1] = [...timesArr[idx - 1], ...time.splice(0, 1)];
    }

    timesArr.push(time);
  });

  if (sundayCloseTime) {
    timesArr[timesArr.length-1] = [...timesArr[timesArr.length-1], sundayCloseTime];
  }

  return data.map(([day, _], idx) => ({
    day,
    period: createPeriodString(timesArr[idx])
  }))
};

export const prepareData = (timetable: Record<DayName, TimeProp[]>) => {
  const timetableCopy = JSON.parse(JSON.stringify(timetable));

  return getTimetable(timetableCopy);
}
