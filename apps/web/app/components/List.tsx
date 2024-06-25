import { Filter, selectFilter, useAppStore } from "../store/store";
import { ListItem } from "./ListItem";

interface ListProps {
  data: any[];
  selected: number;
  onSelect: (index: number) => void;
}

export function List({ data, selected, onSelect }: ListProps): JSX.Element {
  const filter = useAppStore(selectFilter);

  const filterData = (actualFilter: Filter) => (item: any) => {
    // wrong filter definition
    if (typeof actualFilter.url !== "string" || actualFilter.url === "") {
      return true;
    }

    // negative filter
    if (actualFilter.url.startsWith("-")) {
      if (item.url.includes(actualFilter.url.substring(1))) {
        return false;
      } else {
        return true;
      }
    }

    // positive filter
    if (item.url.includes(actualFilter.url)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
      {data.filter(filterData(filter)).map((item, index) => (
        <ListItem
          key={index}
          index={index}
          isSelected={item.$$id === selected}
          status={item.status}
          statusText={item.statusText}
          method={item.method}
          url={item.url}
          dateTime={item.startedDateTime}
          time={item.time}
          id={item.$$id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
