import React, { useContext, useState } from "react";
import SmallCalendar from "./SmallCalendar";
import GlobalContext from "../context/GlobalContext";
import Axios from "axios";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
        useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            Axios.put("http://localhost:3001/edit", calendarEvent).then(
                (response) => {
                    console.log(response);
                }
            );
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            Axios.post("http://localhost:3001/save", calendarEvent).then(
                (response) => {
                    console.log(response);
                }
            );
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
    }
    const handleDeleteElement = () => {
        Axios.delete(`http://localhost:3001/delete/${selectedEvent.id}`).then(
            (response) => {
                console.log(response);
            }
        );
        dispatchCalEvent({
            type: "delete",
            payload: selectedEvent,
        });
        setShowEventModal(false);
    };
    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
            <form className="bg-gray-900 rounded-lg shadow-2xl w-1/4">
                <header className="bg-slate-700 px-4 py-2 flex justify-between items-center ">
                    <span className="material-icons-outlined text-white text-3xl">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={handleDeleteElement}
                                className="material-icons-outlined text-white cursor-pointer"
                            >
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className="material-icons-outlined text-white">
                                close
                            </span>
                        </button>
                    </div>
                </header>

                <div className="p-3">
                    <div className="grid grid-cols-1/ items-end gap-y-7">
                        <span className="col-span-1 material-icons-outlined text-white text-2xl">
                            schedule
                        </span>
                        <p className="col-span-4 flex text-white font-bold text-xl">
                            {daySelected.format("dddd, MMMM DD")}
                        </p>
                        <div className="col-span-5">
                            <SmallCalendar />
                        </div>
                        <div className="border-t border-green-500 col-span-5">
                            {" "}
                        </div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title}
                            required
                            className="col-start-2 col-span-4 pt-3 border-0 text-white bg-gray-900 text-xl font-semibold pb-2 w-full border-b-2 border-gray-600 focus:outine-none focus:ring-0 focus:border-green-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className="material-icons-outlined text-white text-3xl">
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add description"
                            value={description}
                            required
                            className="col-span-4 pt-3 border-0 text-white text-xl bg-gray-900 font-semibold pb-2 w-full border-b-2 border-gray-700 focus:outine-none focus:ring-0 focus:border-green-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="material-icons-outlined text-white text-3xl">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelsClasses.map((lblClass, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(lblClass)}
                                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lblClass && (
                                        <span className="material-icons-outlined text-white text-sm">
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t border-green-500 p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
}
