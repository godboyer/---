import { expect,it,describe } from 'vitest';
import { getItems } from './index';

describe('getItems function', () => {
  it('should return the correct data', async () => {
    const result = await getItems(1);
    expect(result.length).toBe(10);
    expect(result[0].id).toBe(1);
    expect(result[9].id).toBe(10);
  });
});