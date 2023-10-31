import { formatTime, createPeriodString, getTimetable } from "./helpers";
import { DayName, TimeProp } from "./typings";

describe("getTimetable", () => {
  test("should return simple open close time", () => {
    const testData = {
      tuesday: [
        {
          type: "open",
          value: 36000,
        },
        {
          type: "close",
          value: 64800,
        },
      ],
    };
    const resString = getTimetable(testData as Record<DayName, TimeProp[]>);

    expect(resString[0].period).toBe("10 AM - 6 PM");
  });

  test("should return 2 times of restaurant opening", () => {
    const testData = {
      tuesday: [
        {
          type: "open",
          value: 32400,
        },
        {
          type: "close",
          value: 39600,
        },
        {
          type: "open",
          value: 57600,
        },
        {
          type: "close",
          value: 82800,
        },
      ],
    };
    const resString = getTimetable(testData as Record<DayName, TimeProp[]>);

    expect(resString[0].period).toBe("9 AM - 11 AM, 4 PM - 11 PM");
  });

  test("should return moving close time from next to previos day", () => {
    const testData = {
      friday: [
        {
          type: "open",
          value: 64800,
        },
      ],
      saturday: [
        {
          type: "close",
          value: 3600,
        },
        {
          type: "open",
          value: 32400,
        },
        {
          type: "close",
          value: 39600,
        },
        {
          type: "open",
          value: 57600,
        },
        {
          type: "close",
          value: 82800,
        },
      ],
    };

    const resString = getTimetable(testData as Record<DayName, TimeProp[]>);
    const res = resString.reduce((acc, { period }) => `${period} | ${acc}`, "");

    expect(res).toBe("9 AM - 11 AM, 4 PM - 11 PM | 6 PM - 1 AM | ");
  });

  test("should return moving close time from monday to sunday", () => {
    const testData = {
      monday: [
        {
          type: "close",
          value: 75600,
        },
      ],
      tuesday: [
        {
          type: "open",
          value: 36000,
        },
        {
          type: "close",
          value: 64800,
        },
      ],
      wednesday: [],
      thursday: [
        {
          type: "open",
          value: 36000,
        },
        {
          type: "close",
          value: 64800,
        },
      ],
      friday: [
        {
          type: "open",
          value: 64800,
        },
      ],
      saturday: [
        {
          type: "close",
          value: 3600,
        },
        {
          type: "open",
          value: 32400,
        },
        {
          type: "close",
          value: 39600,
        },
        {
          type: "open",
          value: 57600,
        },
        {
          type: "close",
          value: 82800,
        },
      ],
      sunday: [
        {
          type: "open",
          value: 43200,
        },
      ],
    };

    const resString = getTimetable(testData as Record<DayName, TimeProp[]>);
    const res = resString.reduce(
      (acc, { day, period }) => `${day} - ${period}, ${acc}`,
      ""
    );

    expect(res).toBe(
      "sunday - 12 PM - 9 PM, saturday - 9 AM - 11 AM, 4 PM - 11 PM, friday - 6 PM - 1 AM, thursday - 10 AM - 6 PM, wednesday - null, tuesday - 10 AM - 6 PM, monday - null, "
    );
  });
});

describe("createPeriodString", () => {
  test("should return times at am|pm format from ms", () => {
    const testData = [
      {
        type: "close",
        value: 3600,
      },
      {
        type: "open",
        value: 32400,
      },
      {
        type: "close",
        value: 39600,
      },
      {
        type: "open",
        value: 57600,
      },
      {
        type: "close",
        value: 82800,
      },
    ];

    const resString = createPeriodString(testData);

    expect(resString).toBe("1 AM - 9 AM, 11 AM - 4 PM, 11 PM");
  });
});

describe("convert", () => {
  test("should return 10 AM", () => {
    const testData = 36000;

    expect(formatTime(testData)).toBe("10 AM");
  });

  test("should return 6 PM", () => {
    const testData = 64800;
    expect(formatTime(testData)).toBe("6 PM");
  });

  test("should return 12 AM", () => {
    const testData = 0;
    expect(formatTime(testData)).toBe("12 AM");
  });

  test("should return -6 AM", () => {
    const testData = -64800;
    expect(formatTime(testData)).toBe(null);
  });
});
