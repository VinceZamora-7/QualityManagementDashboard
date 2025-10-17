import React, { useState, useMemo } from "react";
import ParetoFilter from "./ParetoFilter";
import ParetoChart from "./ParetoChart";
import data from "../../../data/dataEvents/data.json"; // Your monthly data array

// Week ranges: fixed four weeks with respective start/end days
const getFourWeeksOfMonth = (year, month) => {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return [
    { label: "Week 1", start: 1, end: 7 },
    { label: "Week 2", start: 8, end: 14 },
    { label: "Week 3", start: 15, end: 21 },
    { label: "Week 4", start: 22, end: lastDay },
  ];
};

// Helper: format full date string for day filter comparison
const formatDate = (date) => new Date(date).toDateString();

const ParetoPanel = () => {
  const now = new Date();
  const [filter, setFilter] = useState("month"); // 'day' | 'month' | 'year'
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getMonth() + 1}/${now.getFullYear()}`
  );
  const [weekFilter, setWeekFilter] = useState("all");

  // Month options derived from data dates (e.g. "10/2025")
  const monthOptions = useMemo(() => data.map((m) => m.date), [data]);

  // Get weeks for currently selected month
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

  // Filter data based on main filter and week filter
  const filteredData = useMemo(() => {
    if (filter === "day") {
      // Aggregate all tasks with date === today
      const todayStr = now.toDateString();
      // Get all labels
      const allLabels = Array.from(
        new Set(data.flatMap((m) => m.tasks.map((t) => t.label)))
      );
      // Sum values for day filter
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

  // Calculate total of filtered data
  const total = filteredData.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="flex gap-6 items-start w-full max-w-7xl p-6 mx-auto">
      <div className="flex bg-white rounded-xl p-6 border border-gray-100 min-h-[400px] w-full shadow-lg">
        <pre className="font-mono mb-6">{`Total: ${total}`}</pre>
        <ParetoChart data={filteredData} />

        <div className="items-center space-x-4 mb-6 block md:flex-row flex-col mt-4">
          <ParetoFilter filter={filter} setFilter={setFilter} />
          &nbsp;
          <div>
            {filter === "month" && (
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setWeekFilter("all");
                }}
                className="border rounded p-2"
              >
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}
            &nbsp;
            {filter === "month" && (
              <select
                value={weekFilter}
                onChange={(e) => setWeekFilter(e.target.value)}
                className="border rounded p-2"
              >
                {weeksOptions.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParetoPanel;
