import { describe, it, expect } from 'vitest';
import { formatLargeNumber } from '~/lib/format-large-number';

describe('formatLargeNumber', () => {
  it('formats trillions correctly', () => {
    expect(formatLargeNumber(3_500_000_000_000)).toBe('$3.50T');
  });

  it('formats billions correctly', () => {
    expect(formatLargeNumber(1_234_000_000)).toBe('$1.23B');
  });

  it('formats millions correctly', () => {
    expect(formatLargeNumber(7_500_000)).toBe('$7.50M');
  });

  it('formats smaller numbers with commas', () => {
    expect(formatLargeNumber(123_456)).toBe('$123,456');
  });

  it('formats zero correctly', () => {
    expect(formatLargeNumber(0)).toBe('$0');
  });
});
