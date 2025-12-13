import { selectHarData } from "../store/selectors";
import { useAppStore } from "../store/store";
import { Url } from "./Url";

export function PageRef({ pageref }: { pageref: any }) {
  const harData = useAppStore(selectHarData);
  const pages = harData?.pages || [];
  const title = pages.find((page: any) => page.id === pageref)?.title || null;

  return (
    <div className="bg-bunker-950">
      <div
        className={`${pageref ? "bg-bunker-500" : "bg-bunker-600"} mb-2 flex gap-8 rounded-md p-2 text-sm text-white`}
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
