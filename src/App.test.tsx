import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true should be true', () => {
    expect(true).toBe(true);
  });

  it('false should be false', () => {
    expect(false).toBe(false);
  });
});
