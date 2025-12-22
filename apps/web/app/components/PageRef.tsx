import { selectHarData } from "../store/selectors";
import { useAppStore } from "../store/store";
import { Url } from "./Url";

export function PageRef({ pageref }: { pageref: any }) {
  const harData = useAppStore(selectHarData);
  const pages = harData?.pages || [];
  const title = pages.find((page: any) => page.id === pageref)?.title || null;

  return (
    <div className="dark:bg-bunker-950 bg-white">
      <div
        className={`${pageref ? "dark:bg-bunker-500 bg-slate-300" : "dark:bg-bunker-600 bg-slate-200"} mb-2 flex gap-8 rounded-md p-2 text-sm text-slate-700 dark:text-white`}
      >
        <div className="uppercase">{pageref ?? "-"}</div>
        {title && (
          <div className="ml-auto overflow-hidden text-ellipsis whitespace-nowrap text-right">
            <Url url={title} />
          </div>
        )}
      </div>
    </div>
  );
}
