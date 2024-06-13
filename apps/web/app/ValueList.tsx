import React from "react";

interface ValuesListProps {
  label: string;
  value: string;
}

export function ValueList({
  data,
}: {
  data: ValuesListProps[];
}): JSX.Element[] {
  return data.map((item) => (
    <div className="text-mirage-200 font-mono" key={item.label}>
      <span className="font-bold pr-2">{item.label}:</span>
      {item.value}
    </div>
  ));
}
