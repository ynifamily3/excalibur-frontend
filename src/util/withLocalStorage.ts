// persist Data (preferences)

function isJSON(test: string, res: any): boolean {
  try {
    res = JSON.parse(test);
  } catch (error) {
    res = test;
    return false;
  }
  return true;
}

export default function useLocalStorage<T>(
  storage: string,
  defaultValue: T
): [() => T, (value: T) => T] {
  const val = localStorage.getItem(storage);
  if (val === null) {
    const strVal =
      typeof defaultValue !== "string"
        ? JSON.stringify(defaultValue)
        : defaultValue;
    localStorage.setItem(storage, strVal);
  }
  const getValue = (): T => {
    const val = localStorage.getItem(storage);
    if (val) {
      let res: T = {} as T;
      isJSON(val, res);
      return res;
    } else throw new Error("localStorage Error!");
  };
  const setValue = (value: T): T => {
    localStorage.setItem(storage, JSON.stringify(value));
    return value;
  };
  return [getValue, setValue];
}
