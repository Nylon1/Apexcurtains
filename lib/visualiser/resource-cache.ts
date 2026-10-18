/** Adapted from CurtainsUK rooms/loading.mjs, Git blob
 * 71c40ceb9bb8e985ff20c042be1214941c2817d7. Independently owned by Apex.
 * Share pending loads, evict failures, bound retained decoded resources.
 */
export function createResourceCache<T>(
  load: (key: string) => Promise<T>,
  maxEntries = 2,
) {
  const entries = new Map<string, Promise<T>>();
  return {
    get(key: string) {
      const existing = entries.get(key);
      if (existing) {
        entries.delete(key);
        entries.set(key, existing);
        return existing;
      }
      const pending = Promise.resolve()
        .then(() => load(key))
        .catch((error) => {
          if (entries.get(key) === pending) entries.delete(key);
          throw error;
        });
      entries.set(key, pending);
      while (entries.size > maxEntries)
        entries.delete(entries.keys().next().value!);
      return pending;
    },
    clear() {
      entries.clear();
    },
  };
}
