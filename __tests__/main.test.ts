import { Calver } from '../src/calver';
import { expect, test } from '@jest/globals';

describe('freeze time at 2006/1/2 15:04:05', () => {
  beforeAll(() => {
    const mockDate: Date = new Date('2006/1/2 15:04:05');
    jest.spyOn<any, any>(global, 'Date').mockImplementation(() => mockDate);
  });

  test('v06.01.0 -> v06.01.1', async () => {
    const calver: Calver = new Calver('v06.01.0');
    expect(calver.inc().toString()).toBe('v06.01.1');
  });
  test('v06.01.1 -> v06.01.2', async () => {
    const calver: Calver = new Calver('v06.01.1');
    expect(calver.inc().toString()).toBe('v06.01.2');
  });
  test('v05.12.0 -> v06.01.0', async () => {
    const calver: Calver = new Calver('v05.12.0');
    expect(calver.inc().toString()).toBe('v06.01.0');
  });
});
