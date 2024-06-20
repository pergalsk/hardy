import { ListItem } from "./ListItem";

interface ListProps {
  data: any[];
  selected: number;
  onSelect: (index: number) => void;
}

export function List({ data, selected, onSelect }: ListProps): JSX.Element {
  return (
    <div className="bg-bunker-950 border-thin border-bunker-700 flex h-1/2 w-full flex-none flex-col gap-2 overflow-auto border-r p-2 lg:h-full lg:w-1/2">
      {data.map((item, index) => (
        <ListItem
          key={index}
          index={index}
          isSelected={index === selected}
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
