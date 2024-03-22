import {useCallback, useState} from 'react';

export function useUserRefetch<T>(refetch: () => Promise<T>) {
  const [isUserRefetching, setIsUserRefetching] = useState(false);

  const handleUserRefetch = useCallback(() => {
    setIsUserRefetching(true);
    refetch().then(() => setIsUserRefetching(false));
  }, []);

  return {isUserRefetching, handleUserRefetch};
}
