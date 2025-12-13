export function PageRef({ pageref }: { pageref: any }) {
  return (
    <div className="bg-bunker-950">
      <div
        className={`${pageref ? "bg-bunker-500" : "bg-bunker-600"} mb-2 rounded-md p-2 text-sm uppercase text-white`}
      >
        {pageref ?? "-"}
      </div>
    </div>
  );
}
