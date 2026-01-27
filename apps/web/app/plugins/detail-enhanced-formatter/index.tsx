import { Formatter } from "../../providers/Formatter";
import { Detail } from "../../components/Detail";

export const detailEnhancedFormatter: Formatter<any> = {
  id: "detail-enhanced-formatter",
  title: "Table",
  icon: "iconify material-symbols--table-rows-outline",
  tooltip: "Detail enhanced view",
  format: (): JSX.Element | string => {
    return <Detail />;
  },
};
