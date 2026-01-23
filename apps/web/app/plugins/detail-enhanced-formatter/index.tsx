import { Formatter } from "../../providers/contentValueFormatter";
import { Detail } from "../../components/Detail";

export const detailEnhancedFormatter: Formatter<any> = {
  title: "Table",
  icon: "iconify material-symbols--table-rows-outline",
  tooltip: "Detail enhanced view",
  format: (): JSX.Element | string => {
    return <Detail />;
  },
};
