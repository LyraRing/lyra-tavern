"use client";

import { useState, useEffect } from "react";

export default function CalendarCard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Only update on client to match server/client hydration
    setCurrentDate(new Date());
  }, []);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const today = currentDate.getDate();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="text-center font-bold text-gray-800 mb-4 flex justify-between items-center">
        <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-500">
          ◀
        </span>
        <span>
          {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
        </span>
        <span className="text-sm text-gray-400 cursor-pointer hover:text-blue-500">
          ▶
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-gray-400">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="h-8"></div>
        ))}
        {days.map((d) => (
          <div
            key={d}
            className={`h-8 flex items-center justify-center rounded-full transition-colors 
                ${
                  d === today
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/30 font-bold"
                    : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                }`}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
