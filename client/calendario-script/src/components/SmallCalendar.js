import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
        useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }
    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);

        if (nowDay === currDay) {
            return "bg-green-500 rounded-full text-white";
        } else if (currDay === slcDay) {
            return "bg-green-100 rounded-full text-green-600 font-bold";
        } else {
            return "";
        }
    }

    return (
        <div>
            <header className="flex justify-around">
                <div>
                    <button onClick={handlePrevMonth}>
                        <span className="material-icons-outlined cursor-pointer text-white mx-5 font-semibold text-2xl">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth}>
                        <span className="material-icons-outlined cursor-pointer text-white mx-5 font-semibold text-2xl">
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-7 grid-rows-6 text-white">
                {currentMonth[0].map((day, i) => (
                    <span key={i} className="text-sm py-1 text-center">
                        {day.format("dd").charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSmallCalendarMonth(currentMonthIdx);
                                    setDaySelected(day);
                                }}
                                className={`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className="text-sm">
                                    {day.format("D")}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
