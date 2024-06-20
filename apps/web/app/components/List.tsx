import { ListItem } from "./ListItem";

interface ListProps {
  data: any[];
  selected: number;
  onSelect: (index: number) => void;
}

export function List({ data, selected, onSelect }: ListProps): JSX.Element {
  return (
    <div className="flex flex-col flex-1 max-w-1/2 p-2 bg-bunker-950 border-r border-thin border-bunker-700 gap-2 overflow-auto">
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
