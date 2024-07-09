import { useMemo } from 'react';

const useCustomHook = (data) => {
  const memoizedValue = useMemo(() => {
    return data.length;
  }, [data]);

  return { memoizedValue };
};

export default useCustomHook;
