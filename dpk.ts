import type { BinaryLike } from 'node:crypto';
import { createHash } from 'node:crypto';

interface EventType {
  partitionKey?: string;
}

function makeHash(data: BinaryLike) {
  return data ? createHash('sha3-512').update(data).digest('hex') : '';
}

export function deterministicPartitionKey(event?: EventType): string {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event?.partitionKey ?? makeHash(JSON.stringify(event));

  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = makeHash(candidate);
  }

  return candidate.length > 0 ? candidate : TRIVIAL_PARTITION_KEY;
}
