import React from "react";

export function DetailButtons() {
  const tabs = ["Request", "Response", "Cookies", "Timing"];

  return (
    <div className="flex gap-4 p-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="px-4 py-1 bg-bunker-500 text-mirage-200 font-bold rounded-md hover:bg-bunker-300 transition-colors duration-200 uppercase"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
