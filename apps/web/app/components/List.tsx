import { useAppStore } from "../store/store";
import { selectFilter } from "../store/selectors";
import { filterData } from "../helpers/filter";
import { ListItem } from "./ListItem";

interface ListProps {
  data: any[];
  selected: number;
  onSelect: (index: number) => void;
}

export function List({ data, selected, onSelect }: ListProps): JSX.Element {
  const filter = useAppStore(selectFilter);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2">
      {data.filter(filterData(filter)).map((item) => (
        <ListItem
          key={item.$$id}
          id={item.$$id}
          isSelected={item.$$id === selected}
          status={item.status}
          statusText={item.statusText}
          method={item.method}
          url={item.url}
          dateTime={item.startedDateTime}
          time={item.time}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
