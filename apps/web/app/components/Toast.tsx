export function Toast({
  text,
  icon = "iconify material-symbols--info-outline-rounded",
}: {
  text: string;
  icon: string;
}): JSX.Element {
  return (
    <div className="fixed bottom-16 z-10 mx-auto flex min-w-52 self-center rounded-lg bg-yellow-500 p-3 align-middle text-black shadow-xl">
      <div className={`${icon} text-2xl`}></div>
      <div className="my-auto ml-2">{text}</div>
    </div>
  );
}
