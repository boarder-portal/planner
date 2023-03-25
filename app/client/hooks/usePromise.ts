import { useEffect, useRef, useState } from 'react';

import { AnyAsyncValue } from 'client/types/async';

import useImmutableCallback from 'client/hooks/useImmutableCallback';

export type UsePromise<T> = AnyAsyncValue<T> & {
  run(): Promise<T>;
};

export default function usePromise<T>(getPromise: (signal: AbortSignal) => Promise<T>): UsePromise<T> {
  const [promiseValue, setPromiseValue] = useState<AnyAsyncValue<T>>({
    value: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    ...promiseValue,
    run: useImmutableCallback(async () => {
      abortControllerRef.current?.abort();

      const controller = new AbortController();

      abortControllerRef.current = controller;

      try {
        setPromiseValue({
          value: null,
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: null,
        });

        const result = await getPromise(controller.signal);

        setPromiseValue({
          value: result,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        });

        return result;
      } catch (err) {
        setPromiseValue({
          value: null,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: err,
        });

        throw err;
      }
    }),
  };
}
