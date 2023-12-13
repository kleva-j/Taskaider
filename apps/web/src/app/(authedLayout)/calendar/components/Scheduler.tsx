"use client";

/**
 * React Scheduler
 *
 * Learn More
 *  (Youtube: https://www.youtube.com/watch?v=9oy4rTVEfBQ)
 *  (Github: https://github.com/Bitnoise/react-scheduler)
 */

import { Scheduler, SchedulerData } from "@bitnoi.se/react-scheduler";
import { useCallback, useMemo, useState } from "react";

import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

dayjs.extend(isBetween);

type Props = { data: SchedulerData; isLoading: boolean };
type ParsedDatesRange = { startDate: Date; endDate: Date };

export const TScheduler = ({ data, isLoading }: Props) => {
  const [filterButtonState, setFilterButtonState] = useState(0);

  const [range, setRange] = useState<ParsedDatesRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const filteredData = useMemo(
    () =>
      data.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(
              range.startDate,
              range.endDate,
            ) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.startDate, "day")),
        ),
      })),
    [range.startDate, range.endDate],
  );

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  return (
    <section className="relative w-full h-full">
      <Scheduler
        data={filteredData}
        isLoading={isLoading}
        onRangeChange={handleRangeChange}
        onFilterData={() => setFilterButtonState(1)}
        onClearFilterData={() => setFilterButtonState(0)}
        config={{ zoom: 1, filterButtonState, maxRecordsPerPage: 5 }}
      />
    </section>
  );
};
