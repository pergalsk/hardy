import { selectHarData } from "../../../core/selectors";
import { useAppStore } from "../../../store/store";
import { Url } from "@repo/ui/url";
import { getUrlParts } from "../../../core/helpers/getUrlParts";

export function PageRef({
  pageref,
  counts,
}: {
  pageref: string | undefined;
  counts?: number;
}) {
  const harData = useAppStore(selectHarData);
  const pages = harData?.pages || [];
  const title = pages.find((page) => page.id === pageref)?.title || null;

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
            <Url {...getUrlParts(title)} />
          </div>
        )}
      </div>
    </div>
  );
}
