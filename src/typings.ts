export type DayName = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type TimeProp = {
  type: string;
  value: number;
}

export type EmptyTimetableProps = {
  day: string;
  period: TimeProp[];
}

export type TimetableItemProps = {
  day: string;
  period: string | null;
}

export interface AppProps {
  timetable: Record<DayName, TimeProp[]>
};
