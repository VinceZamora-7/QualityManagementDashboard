import React, { useState, useMemo } from "react";
import ParetoFilter from "./ParetoFilter";
import ParetoChart from "./ParetoChart";
import data from "../../../data/dataEvents/data.json";

const getFourWeeksOfMonth = (year, month) => {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return [
    { label: "Week 1", start: 1, end: 7 },
    { label: "Week 2", start: 8, end: 14 },
    { label: "Week 3", start: 15, end: 21 },
    { label: "Week 4", start: 22, end: lastDay },
  ];
};

const formatDate = (date) => new Date(date).toDateString();

const ParetoPanel = () => {
  const now = new Date();
  const [filter, setFilter] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getMonth() + 1}/${now.getFullYear()}`
  );
  const [weekFilter, setWeekFilter] = useState("all");

  const monthOptions = useMemo(() => data.map((m) => m.date), [data]);
  const weeksOptions = useMemo(() => {
    if (!selectedMonth) return [];
    const [monthPart, yearPart] = selectedMonth.split("/");
    const monthNum = parseInt(monthPart, 10) - 1;
    const yearNum = parseInt(yearPart, 10);
    return [
      { value: "all", label: "All Weeks" },
      ...getFourWeeksOfMonth(yearNum, monthNum).map((w) => ({
        value: w.label,
        label: w.label,
        start: w.start,
        end: w.end,
      })),
    ];
  }, [selectedMonth]);

  const filteredData = useMemo(() => {
    if (filter === "day") {
      const todayStr = now.toDateString();
      const allLabels = Array.from(
        new Set(data.flatMap((m) => m.tasks.map((t) => t.label)))
      );
      return allLabels.map((label) => {
        let sum = 0;
        data.forEach((month) => {
          month.tasks.forEach(({ label: tLabel, value, date }) => {
            if (tLabel === label && date && formatDate(date) === todayStr)
              sum += value;
          });
        });
        return { label, value: sum };
      });
    }
    if (filter === "year") {
      const year = now.getFullYear();
      const allLabels = Array.from(
        new Set(data.flatMap((m) => m.tasks.map((t) => t.label)))
      );
      return allLabels.map((label) => {
        let sum = 0;
        data.forEach((month) => {
          month.tasks.forEach(({ label: tLabel, value, date }) => {
            if (
              tLabel === label &&
              date &&
              new Date(date).getFullYear() === year
            )
              sum += value;
          });
        });
        return { label, value: sum };
      });
    }
    if (filter === "month") {
      if (!selectedMonth) return [];
      const monthData = data.find((m) => m.date === selectedMonth);
      if (!monthData) return [];
      const allLabels = Array.from(
        new Set(data.flatMap((m) => m.tasks.map((t) => t.label)))
      );
      const [monthPart, yearPart] = selectedMonth.split("/");
      const monthNum = parseInt(monthPart, 10) - 1;
      const yearNum = parseInt(yearPart, 10);
      const selectedWeek = weeksOptions.find((w) => w.value === weekFilter);
      return allLabels.map((label) => {
        const task = monthData.tasks.find((t) => t.label === label);
        if (!task || !task.date) return { label, value: 0 };
        if (
          weekFilter === "all" ||
          (selectedWeek &&
            (() => {
              const d = new Date(task.date);
              const day = d.getDate();
              return (
                d.getFullYear() === yearNum &&
                d.getMonth() === monthNum &&
                day >= selectedWeek.start &&
                day <= selectedWeek.end
              );
            })())
        ) {
          return task;
        }
        return { label, value: 0 };
      });
    }
    return [];
  }, [filter, selectedMonth, weekFilter, now, data, weeksOptions]);

  const total = filteredData.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="w-full max-w-7xl p-4 mx-auto flex flex-col gap-8">
      {/* Filter and selectors */}
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex-shrink-0 md:w-auto w-full">
          <ParetoFilter filter={filter} setFilter={setFilter} />
        </div>
        {filter === "month" && (
          <div className="flex flex-col md:flex-row gap-2 md:ml-4 w-full md:w-auto">
            <select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setWeekFilter("all");
              }}
              className="border rounded p-2 bg-white"
            >
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={weekFilter}
              onChange={(e) => setWeekFilter(e.target.value)}
              className="border rounded p-2 bg-white"
            >
              {weeksOptions.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Chart and total, center-aligned */}
      <div className="flex flex-col items-start gap-6">
        <div className="font-mono w-full md:w-56 mb-4 md:mb-0 flex-shrink-0 text-center md:text-left">{`Total: ${total}`}</div>
        <div className="border pl-0 md:pl-6 pt-6 md:pt-0 w-full flex justify-center">
          <ParetoChart data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default ParetoPanel;
