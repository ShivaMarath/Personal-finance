import { useState } from "react";
import { toast } from "sonner";

// T = return type of callback
// A = argument types of callback (tuple)
function useFetch<T, A extends any[]>(cb: (...args: A) => Promise<T>) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: A): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (err) {
      const e = err instanceof Error ? err : new Error("Unknown error");
      setError(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fn,
    setData,
  };
}

export default useFetch;
