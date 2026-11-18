import type React from "react";
import type { MessageData } from "../types";
import type { SearchSection } from "../../search/types";
import { searchSectionProps } from "../../search/sections";
import { Headers } from "./Headers";
import { Content } from "./Content";

/** Request or Response tab: headers and body. */
export function MessageTab({
  data,
  headerSection,
  bodySection,
}: {
  data: MessageData;
  headerSection: SearchSection;
  bodySection: SearchSection;
}): React.JSX.Element {
  return (
    <div className="mr-2 flex flex-col gap-2">
      <div {...searchSectionProps(headerSection)}>
        <Headers data={data} />
      </div>
      <div {...searchSectionProps(bodySection)}>
        <Content data={data} searchSection={bodySection} />
      </div>
    </div>
  );
}
