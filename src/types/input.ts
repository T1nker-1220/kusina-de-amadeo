export interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'error' | 'success'; 