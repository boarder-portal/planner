export interface AtomValues {}

export type AtomKey = keyof AtomValues;

export type AtomValue<Key extends AtomKey> = AtomValues[Key];

export type AtomSubscriber<Key extends AtomKey> = (value: AtomValue<Key>) => unknown;

class Atom<Key extends AtomKey> {
  readonly key: Key;
  #value: AtomValue<Key>;
  #subscribers = new Set<AtomSubscriber<Key>>();

  constructor(key: Key, initialValue: AtomValue<Key>) {
    this.key = key;
    this.#value = initialValue;
  }

  getValue(): AtomValue<Key> {
    return this.#value;
  }

  setValue(value: AtomValue<Key> | ((value: AtomValue<Key>) => AtomValue<Key>)): void {
    const newValue = typeof value === 'function' ? value(this.#value) : value;

    this.#value = newValue;

    for (const subscriber of this.#subscribers) {
      subscriber(newValue);
    }
  }

  subscribe(subscriber: AtomSubscriber<Key>): () => void {
    this.#subscribers.add(subscriber);

    return () => {
      this.#subscribers.delete(subscriber);
    };
  }
}

export default Atom;
