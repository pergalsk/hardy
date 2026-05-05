export type ListItem = {
  $$id: number;
  $$visible: boolean;
  $$hidden: boolean;
  pageref: string | undefined;
  startedDateTime: string;
  time: number;
  method: string;
  url: string;
  status: number;
  statusText: string;
};

export type SortField = "url" | "status" | "method" | "time" | "pageref";
