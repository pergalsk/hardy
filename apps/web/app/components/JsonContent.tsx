import JsonView from "@uiw/react-json-view";
import { useAppStore } from "../store/store";
import { selectJsonViewerSettings } from "../store/selectors";

const style = {
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

export function JsonContent({ data }: { data: any }): JSX.Element {
  const settings = useAppStore(selectJsonViewerSettings);

  return (
    <div className="break-all">
      <JsonView value={data} style={style} {...settings} />
    </div>
  );
}
