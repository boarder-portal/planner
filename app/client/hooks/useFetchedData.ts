import { useEffect, useState } from 'react';

import { ErrorAsyncValue, LoadingAsyncValue, SuccessAsyncValue } from 'client/types/async';

import useImmutableCallback from 'client/hooks/useImmutableCallback';

type FetchingAsyncValue<T> = LoadingAsyncValue | SuccessAsyncValue<T> | ErrorAsyncValue;

export default function useFetchedData<T>(getData: (signal: AbortSignal) => Promise<T>): FetchingAsyncValue<T> {
  const [fetchingValue, setFetchingValue] = useState<FetchingAsyncValue<T>>({
    value: null,
    isLoading: true,
    isSuccess: false,
    isError: false,
    error: null,
  });

  const immutableGetData = useImmutableCallback(getData);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setFetchingValue({
          value: null,
          isLoading: true,
          isSuccess: false,
          isError: false,
          error: null,
        });

        const result = await immutableGetData(controller.signal);

        setFetchingValue({
          value: result,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: null,
        });

        return result;
      } catch (err) {
        setFetchingValue({
          value: null,
          isLoading: false,
          isSuccess: false,
          isError: true,
          error: err,
        });

        throw err;
      }
    })();

    return () => {
      controller.abort();
    };
  }, [immutableGetData]);

  return fetchingValue;
}
