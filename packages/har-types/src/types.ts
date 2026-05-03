import type {
  Har as _Har,
  Log as _Log,
  Page as _Page,
  PageTiming as _PageTiming,
  Entry as _Entry,
  Request as _Request,
  Response as _Response,
  Cookie as _Cookie,
  Timings as _Timings,
  Param as _Param,
} from 'har-format';

// Pass-through types — no changes from the HAR 1.2 spec
export type {
  Creator,
  Browser,
  Header,
  QueryString,
  Param,
  Content,
  Cache,
  CacheDetails,
  Chunk,
  Initiator,
} from 'har-format';

/**
 * Patch: Chrome emits `"expires": null` for session cookies instead of omitting the field.
 * Patch: Chrome emits `sameSite` (no underscore prefix) since it added SameSite support.
 */
export type Cookie = Omit<_Cookie, 'expires'> & {
  expires?: string | null | undefined;
  sameSite?: string | null | undefined;
};

/**
 * Patch: Chrome always exports both `params` and `text` simultaneously.
 * The HAR spec treats them as mutually exclusive but no browser respects that.
 */
export interface PostData {
  mimeType: string;
  params?: _Param[] | undefined;
  text?: string | undefined;
  comment?: string | undefined;
}

/**
 * Patch: `wait` and `receive` are absent on aborted or preflight requests.
 */
export type Timings = Omit<_Timings, 'wait' | 'receive'> & {
  wait?: number | undefined;
  receive?: number | undefined;
};

/**
 * Patch: Chrome emits `null` for unavailable page timings instead of omitting the field.
 */
export type PageTiming = Omit<_PageTiming, 'onLoad' | 'onContentLoad'> & {
  onLoad?: number | null | undefined;
  onContentLoad?: number | null | undefined;
};

/**
 * Patch: `title` is absent in some Firefox HAR exports.
 * Uses patched PageTiming.
 */
export type Page = Omit<_Page, 'title' | 'pageTimings'> & {
  title?: string | undefined;
  pageTimings: PageTiming;
  [customField: `_${string}`]: unknown | null | undefined;
};

/** Uses patched Cookie and PostData. */
export type Request = Omit<_Request, 'cookies' | 'postData'> & {
  cookies: Cookie[];
  postData?: PostData | undefined;
};

/** Uses patched Cookie. */
export type Response = Omit<_Response, 'cookies'> & {
  cookies: Cookie[];
};

/** Uses patched Request, Response, and Timings. */
export type Entry = Omit<_Entry, 'request' | 'response' | 'timings'> & {
  request: Request;
  response: Response;
  timings: Timings;
  [customField: `_${string}`]: unknown | null | undefined;
};

/** Uses patched Entry and Page. */
export type Log = Omit<_Log, 'entries' | 'pages'> & {
  entries: Entry[];
  pages?: Page[] | undefined;
};

/** Root HAR object. Uses patched Log. */
export type Har = Omit<_Har, 'log'> & {
  log: Log;
};
