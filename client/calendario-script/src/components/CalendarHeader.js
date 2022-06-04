import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    }
    return (
        <header className="px-4 py-2 flex items-center bg-gray-900">
            <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
            <h1 className="mr-10 text-xl text-white font-bold">Calendar</h1>
            <button
                onClick={handleReset}
                className="border rounded text-white py-2 px-4 mr-5 font-bold"
            >
                Today
            </button>
            <button onClick={handlePrevMonth}>
                <span className="material-icons-outlined cursor-pointer text-white mx-2 font-bold">
                    chevron_left
                </span>
            </button>
            <h2 className="ml-4 text-xl text-gray-300 font-bold">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMM YYYY")}
            </h2>
            <button onClick={handleNextMonth}>
                <span className="material-icons-outlined cursor-pointer text-white mx-2 font-bold">
                    chevron_right
                </span>
            </button>
        </header>
    );
}
