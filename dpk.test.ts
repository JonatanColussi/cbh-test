import { deterministicPartitionKey } from './dpk';

describe('deterministicPartitionKey', () => {
  it("should returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe('0');
  });

  test('should return a same partitionKey if inputed partitionKey is a string', () => {
    const event = { partitionKey: 'test' };
    const result = deterministicPartitionKey(event);

    expect(typeof result).toBe('string');
    expect(result).toBe(event.partitionKey);
  });

  test('should return a hash if partitionKey is too long', () => {
    const event = { partitionKey: 'a'.repeat(300) };
    const result = deterministicPartitionKey(event);

    expect(result).not.toBe(event.partitionKey);
    expect(result).toHaveLength(128);
  });

  test("should return a stringified partitionKey if it's not a string", () => {
    const event = { partitionKey: { test: 'test' } };
    const result = deterministicPartitionKey(event as any);

    expect(result).toBe(JSON.stringify(event.partitionKey));
  });

  test('should return a hash if partitionKey is undefined', () => {
    const event = {};
    const result = deterministicPartitionKey(event);

    expect(result).toHaveLength(128);
  });

  test('should return "0" if candidate is empty', () => {
    const event = { partitionKey: '' };
    const result = deterministicPartitionKey(event);

    expect(result).toBe('0');
  });
});
