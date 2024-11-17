import { useState, useCallback } from 'react';

type ValidationRules<T> = {
  [K in keyof T]: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: T[K]) => boolean;
    message?: string;
  };
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const rules = validationRules[name];
      if (!rules) return '';

      if (rules.required && !value) {
        return rules.message || 'This field is required';
      }

      if (rules.pattern && !rules.pattern.test(String(value))) {
        return rules.message || 'Invalid format';
      }

      if (rules.minLength && String(value).length < rules.minLength) {
        return rules.message || `Minimum length is ${rules.minLength}`;
      }

      if (rules.maxLength && String(value).length > rules.maxLength) {
        return rules.message || `Maximum length is ${rules.maxLength}`;
      }

      if (rules.custom && !rules.custom(value)) {
        return rules.message || 'Invalid value';
      }

      return '';
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateField, values]
  );

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationRules]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
  };
}
