import { describe, it, expect } from 'vitest';
import { isHar, hasPostDataText, hasPostDataParams } from './guards';
import type { PostData } from './types';

const validHar = {
  log: {
    version: '1.2',
    creator: { name: 'Browser', version: '1.0' },
    entries: [],
  },
};

describe('isHar', () => {
  it('returns true for a valid HAR object', () => {
    expect(isHar(validHar)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isHar(null)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isHar('har')).toBe(false);
  });

  it('returns false for an array', () => {
    expect(isHar([])).toBe(false);
  });

  it('returns false for a plain object without log', () => {
    expect(isHar({})).toBe(false);
  });

  it('returns false when log.entries is missing', () => {
    expect(isHar({ log: { creator: { name: 'x', version: '1' } } })).toBe(false);
  });

  it('returns false when log.entries is not an array', () => {
    expect(isHar({ log: { creator: { name: 'x', version: '1' }, entries: null } })).toBe(false);
  });

  it('returns false when log.creator is missing', () => {
    expect(isHar({ log: { entries: [] } })).toBe(false);
  });

  it('returns false when creator.name is not a string', () => {
    expect(isHar({ log: { entries: [], creator: { name: 1, version: '1' } } })).toBe(false);
  });

  it('returns false when creator.version is not a string', () => {
    expect(isHar({ log: { entries: [], creator: { name: 'x', version: 2 } } })).toBe(false);
  });
});

describe('hasPostDataText', () => {
  it('returns true when text is a non-empty string', () => {
    const pd: PostData = { mimeType: 'text/plain', text: 'body content' };
    expect(hasPostDataText(pd)).toBe(true);
  });

  it('returns false when text is undefined', () => {
    const pd: PostData = { mimeType: 'text/plain' };
    expect(hasPostDataText(pd)).toBe(false);
  });

  it('returns false when text is an empty string', () => {
    const pd: PostData = { mimeType: 'text/plain', text: '' };
    expect(hasPostDataText(pd)).toBe(false);
  });
});

describe('hasPostDataParams', () => {
  it('returns true when params is a non-empty array', () => {
    const pd: PostData = { mimeType: 'application/x-www-form-urlencoded', params: [{ name: 'key', value: 'val' }] };
    expect(hasPostDataParams(pd)).toBe(true);
  });

  it('returns false when params is undefined', () => {
    const pd: PostData = { mimeType: 'application/x-www-form-urlencoded' };
    expect(hasPostDataParams(pd)).toBe(false);
  });

  it('returns false when params is an empty array', () => {
    const pd: PostData = { mimeType: 'application/x-www-form-urlencoded', params: [] };
    expect(hasPostDataParams(pd)).toBe(false);
  });
});
