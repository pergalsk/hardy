import { Formatter } from "../../providers/Formatter";
import { JsonContent } from "../../components/JsonContent";

export const detailRawFormatter: Formatter<any> = {
  id: "detail-raw-formatter",
  title: "Raw",
  icon: "iconify material-symbols--code-blocks-outline-rounded",
  tooltip: "Detail raw view",
  format: (data: any): JSX.Element | string => {
    return <JsonContent data={data} collapseBtns={true} />;
  },
};
