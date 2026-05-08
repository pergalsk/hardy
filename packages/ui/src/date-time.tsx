import React from "react";

export const DateTime = React.memo(function DateTime({ value }: { value: string }) {
  return value ? <div className="ml-auto">{value}</div> : null;
});
