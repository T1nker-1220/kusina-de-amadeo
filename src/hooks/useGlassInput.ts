import { useState, useCallback } from 'react';

interface UseGlassInputProps {
  initialValue?: string;
  validate?: (value: string) => string | undefined;
}

export function useGlassInput({ initialValue = '', validate }: UseGlassInputProps = {}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>();
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (validate && isTouched) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  }, [validate, isTouched]);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    }
  }, [validate, value]);

  return {
    value,
    setValue,
    error,
    setError,
    isTouched,
    handleChange,
    handleBlur,
  };
} 