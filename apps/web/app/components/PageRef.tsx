import { selectHarData } from "../store/selectors";
import { useAppStore } from "../store/store";
import { Url } from "./Url";

export function PageRef({
  pageref,
  counts,
}: {
  pageref: any;
  counts?: number;
}) {
  const harData = useAppStore(selectHarData);
  const pages = harData?.pages || [];
  const title = pages.find((page: any) => page.id === pageref)?.title || null;

  return (
    <div>
      <div
        className={`flex gap-8 overflow-y-auto text-sm text-slate-700 dark:text-white`}
      >
        <div className="uppercase">
          {pageref ?? "-"}
          {counts && counts > 0 && ` (${counts})`}
        </div>
        {title && (
          <div className="ml-auto break-all text-right">
            <Url url={title} />
          </div>
        )}
      </div>
    </div>
  );
}
