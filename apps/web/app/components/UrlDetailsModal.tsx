import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import UrlQueryTable from "./UrlQueryTable";
import Button from "./Button";

export default function UrlDetailsModal({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  const parsed = useMemo(() => {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  }, [url]);

  const queryEntries = useMemo(() => {
    if (!parsed) return [] as Array<[string, string]>;
    return Array.from(parsed.searchParams.entries());
  }, [parsed]);

  // map human label to URL property name used by MDN
  const labelToPropertyMap: Record<string, string> = {
    Href: "href",
    Origin: "origin",
    Protocol: "protocol",
    Host: "host",
    Hostname: "hostname",
    Port: "port",
    Pathname: "pathname",
    Search: "search",
    Hash: "hash",
    Username: "username",
    Password: "password",
  };

  const openMdnFor = (label: string) => {
    const prop = labelToPropertyMap[label] || label.toLowerCase();
    const mdnUrl = `https://developer.mozilla.org/en-US/docs/Web/API/URL/${encodeURIComponent(
      prop,
    )}`;
    window.open(mdnUrl, "_blank");
  };

  const parts: Array<{ label: string; value: React.ReactNode }> =
    useMemo(() => {
      if (!parsed) return [{ label: "Invalid URL", value: url }];
      return [
        { label: "Href", value: parsed.href },
        { label: "Origin", value: parsed.origin },
        { label: "Protocol", value: parsed.protocol },
        { label: "Host", value: parsed.host },
        { label: "Hostname", value: parsed.hostname },
        { label: "Port", value: parsed.port || "" },
        { label: "Pathname", value: parsed.pathname },
        { label: "Hash", value: parsed.hash || "" },
        { label: "Username", value: parsed.username || "" },
        { label: "Password", value: parsed.password || "" },
        {
          label: "Search",
          value: (
            <>
              <div className="break-all">
                {parsed.search || <span className="text-mirage-400">—</span>}
              </div>
              {queryEntries.length > 0 && (
                <div className="mt-2">
                  <UrlQueryTable entries={queryEntries} />
                </div>
              )}
            </>
          ),
        },
      ];
    }, [parsed, url, queryEntries]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Show URL details"
        className="iconify material-symbols--list-alt-outline-rounded text-accent-400 hover:text-accent-200 text-xl"
      />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="URL details"
        size="medium"
        closeOnBackdropClick
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="primary" onClick={() => setOpen(false)}>
              OK
            </Button>
          </div>
        }
      >
        <div className="select-text">
          <div className="rounded-md bg-transparent">
            {parts.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-9 gap-4 border-b border-gray-200 py-2 last:border-b-0 dark:border-slate-700"
              >
                <div className="text-mirage-700 col-span-2 flex text-sm font-medium dark:text-white">
                  <span className="">{label}</span>
                  <span
                    className="iconify material-symbols--help-outline-rounded dark:text-mirage-600 text-mirage-100 dark:hover:text-accent-300 hover:text-accent-600 ml-1 inline-flex cursor-pointer select-none items-center align-top text-lg"
                    onClick={() => openMdnFor(label)}
                  />
                </div>
                <div className="text-mirage-700 dark:text-mirage-200 col-span-7 break-all text-sm">
                  {value || <span className="text-mirage-600">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
