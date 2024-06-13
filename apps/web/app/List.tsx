import { ListItem } from "./ListItem";

export function List(): JSX.Element {
  const requestItems = [
    {
      status: 404,
      method: "GET",
      url: "https://stackoverflow.com/questions/61343447/my-tailwind-css-intellisense-plugin-just-isnt-working-on-my-vscode",
    },
    {
      status: 900,
      method: "POST",
      url: "https://www.youtube.com/watch?v=pfaSUYaSgRo&ab_channel=Fireship",
    },
    {
      status: 102,
      method: "PUT",
      url: "https://aukro.cz/australie-kompletni-set-minci-7061798757",
    },
    {
      status: 303,
      method: "DELETE",
      url: "https://aukro.cz/australie-kompletni-set-minci-7061798757",
    },
    {
      status: 200,
      method: "PATCH",
      url: "https://aukro.cz/australie-kompletni-set-minci-7061798757",
    },
    {
      status: 200,
      method: "GET",
      url: "https://stackoverflow.com/questions/61343447/my-tailwind-css-intellisense-plugin-just-isnt-working-on-my-vscode",
    },
    {
      status: 200,
      method: "GET",
      url: "https://www.youtube.com/watch?v=pfaSUYaSgRo&ab_channel=Fireship",
    },
    {
      status: 200,
      method: "POST",
      url: "https://aukro.cz/australie-kompletni-set-minci-7061798757",
    },
    {
      status: 400,
      method: "POST",
      url: "https://www.youtube.com/watch?v=pfaSUYaSgRo&ab_channel=Fireship",
    },
    {
      status: 200,
      method: "GET",
      url: "https://aukro.cz/australie-kompletni-set-minci-7061798757",
    },
  ];

  return (
    <div className="flex flex-col flex-1 bg-bunker-950 border-r border-thin border-bunker-700 h-full">
      {requestItems.map((item, index) => (
        <ListItem
          key={index}
          status={item.status}
          method={item.method}
          url={item.url}
        />
      ))}
    </div>
  );
}
