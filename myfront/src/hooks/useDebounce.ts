import { useEffect, useState } from 'react';

// 디바운스를 위한 공통 커스텀 훅
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay); // delay 시간만큼 기다림

    return () => clearTimeout(handler);
  }, [value, delay]);

  // 잠시 기다린 후에 값을 반환
  return debouncedValue;
}

export default useDebounce;
