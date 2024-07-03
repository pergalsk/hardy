import React from "react";
import JsonView from "@uiw/react-json-view";
import { DetailSegment } from "./DetailSegment";
import { DetailButtons } from "./DetailButtons";
import { DetailCommon } from "./DetailCommon";
import { Headers, HeaderItem } from "./Headers";
import { formatAsJson } from "../helpers/helpers";
import { NoData } from "./NoData";
import { Collapsible } from "./Collapsible";
import { useAppStore } from "../store/store";
import { selectTab, selectPartsData } from "../store/selectors";

export function Detail(): JSX.Element {
  const tab = useAppStore(selectTab);
  const parts = useAppStore(selectPartsData);

  const customTheme = {
    "--w-rjv-color": "#9cdcfe",
    "--w-rjv-key-number": "#b3d9ed88",
    "--w-rjv-key-string": "#b3d9ed",
    "--w-rjv-background-color": "#0e1016",
    "--w-rjv-line-color": "#b3d9ed22",
    "--w-rjv-arrow-color": "#838383",
    "--w-rjv-edit-color": "#9cdcfe",
    "--w-rjv-info-color": "#9c9c9c7a",
    "--w-rjv-update-color": "#9cdcfe",
    "--w-rjv-copied-color": "#9cdcfe",
    "--w-rjv-copied-success-color": "#28a745",

    "--w-rjv-curlybraces-color": "#b3d9ed88",
    "--w-rjv-colon-color": "#b3d9ed88",
    "--w-rjv-brackets-color": "#b3d9ed88",
    "--w-rjv-ellipsis-color": "#ff0000",
    "--w-rjv-quotes-color": "#b3d9ed88",
    "--w-rjv-quotes-string-color": "#ffd70088",

    "--w-rjv-type-string-color": "#ffd700ee",
    "--w-rjv-type-int-color": "#42d939",
    "--w-rjv-type-float-color": "#42d939",
    "--w-rjv-type-bigint-color": "#42d939",
    "--w-rjv-type-boolean-color": "#569cd6",
    "--w-rjv-type-date-color": "#b5cea8",
    "--w-rjv-type-url-color": "#3b89cf",
    "--w-rjv-type-null-color": "#fa8072",
    "--w-rjv-type-nan-color": "#859900",
    "--w-rjv-type-undefined-color": "#fa8072",
  };

  const headersMap: {
    [key: string]: { headers: HeaderItem[]; content: string };
  } = {
    REQ: {
      headers: parts?.request?.headers,
      content: parts?.request?.content,
    },
    RES: {
      headers: parts?.response?.headers,
      content: parts?.response?.content,
    },
  };

  const partsSelection: { headers: HeaderItem[]; content: string } | null =
    headersMap[tab] || null;

  return (
    <>
      <DetailCommon />
      <DetailButtons />
      <DetailSegment>
        <Collapsible title="Headers">
          {partsSelection?.headers && (
            <Headers headers={partsSelection.headers} />
          )}
        </Collapsible>

        <Collapsible title="Content">
          <div className="text-mirage-200 break-all text-lg">
            {partsSelection?.content ? (
              <JsonView
                value={formatAsJson(partsSelection.content)}
                collapsed={2}
                indentWidth={24}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
                highlightUpdates={false}
                style={customTheme}
              />
            ) : (
              <NoData>No data</NoData>
            )}
          </div>
        </Collapsible>
      </DetailSegment>
    </>
  );
}
