import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
    const { setShowEventModal } = useContext(GlobalContext);
    return (
        <button
            onClick={() => setShowEventModal(true)}
            className="border border-green-600 p-2 rounded-full flex items-center shadow-md hover:shadow-2xl shadow-green-900 "
        >
            <img src={plusImg} alt="create_event" className="w-10 h-10" />
            <span className="pl-3 pr-7 text-lg text-white font-medium">
                {" "}
                Create
            </span>
        </button>
    );
}
