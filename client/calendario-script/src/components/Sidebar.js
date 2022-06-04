import React from "react";
import CreateEventButton from "./CreateEventButton";
import Labels from "./Labels";

export default function Sidebar() {
    return (
        <aside className="border border-green-800 bg-gray-900 p-5 w-64">
            <CreateEventButton />
            <Labels />
        </aside>
    );
}
