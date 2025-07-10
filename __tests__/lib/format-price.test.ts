import { describe, it, expect } from 'vitest';
import { formatPrice } from '~/lib/format-price';

describe('formatPrice', () => {
  it('formats integer prices correctly', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
  });

  it('formats float prices correctly', () => {
    expect(formatPrice(1234.56)).toBe('$1,234.56');
  });

  it('formats small decimals correctly', () => {
    expect(formatPrice(0.5)).toBe('$0.50');
  });

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats negative prices correctly', () => {
    expect(formatPrice(-199.99)).toBe('-$199.99');
  });
});
