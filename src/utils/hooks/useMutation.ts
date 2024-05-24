import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

type MutationOptions = {
  onSuccess?: () => void;
  onFailure?: () => void;
};

export function useMutation<T, Args extends any[]>(
  fun: (...args: Args) => Promise<T>,
  { onSuccess, onFailure }: MutationOptions,
) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      try {
        const result = await fun(...args);
        setData(result);
        setError(null);
        onSuccess?.();
        router.refresh();
        return result;
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
        onFailure?.();
      } finally {
        setIsLoading(false);
      }
    },
    [fun, onFailure, onSuccess, router],
  );
  return { isLoading, data, error, mutate };
}
