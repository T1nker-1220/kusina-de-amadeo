import { useState, useCallback } from 'react';

interface UseInputProps {
  initialValue?: string;
  validate?: (value: string) => string | undefined;
}

export function useInput({ initialValue = '', validate }: UseInputProps = {}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (validate && touched) {
      setError(validate(newValue));
    }
  }, [touched, validate]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validate) {
      setError(validate(value));
    }
  }, [validate, value]);

  return {
    value,
    setValue,
    error,
    touched,
    handleChange,
    handleBlur,
    reset: () => {
      setValue(initialValue);
      setError(undefined);
      setTouched(false);
    }
  };
} 