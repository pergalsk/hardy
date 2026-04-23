import type React from "react";

interface UrlProps {
  protocol?: string;
  domain: string;
  port?: string;
  path: string;
  params?: string;
  hash?: string;
}

export function Url({ protocol, domain, port, path, params, hash }: UrlProps): React.JSX.Element {
  return (
    <span className="break-all">
      {protocol && (
        <span className="dark:text-mirage-400 text-slate-600">
          {protocol + "//"}
        </span>
      )}
      <span className="dark:text-mirage-200 text-slate-600">{domain}</span>
      {port && (
        <span className="dark:text-mirage-400 text-slate-400">
          {":" + port}
        </span>
      )}
      <span className="font-bold text-black dark:text-white">{path}</span>
      <span className="dark:text-mirage-200 text-slate-600">{params}</span>
      <span className="dark:text-mirage-400 text-slate-400">{hash}</span>
    </span>
  );
}
