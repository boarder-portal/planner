import { useEffect, useState } from 'react';

import Atom, { AtomKey, AtomValue } from 'client/utilities/Atom';

import useImmutableCallback from 'client/hooks/useImmutableCallback';

export type UseAtom<Key extends AtomKey> = [
  AtomValue<Key>,
  (value: AtomValue<Key> | ((value: AtomValue<Key>) => AtomValue<Key>)) => void,
];

export default function useAtom<Key extends AtomKey>(atom: Atom<Key>): UseAtom<Key> {
  const [value, setValue] = useState<AtomValue<Key>>(atom.getValue());

  useEffect(() => {
    return atom.subscribe(setValue);
  }, [atom]);

  return [
    value,
    useImmutableCallback((value) => {
      atom.setValue(value);
    }),
  ];
}
