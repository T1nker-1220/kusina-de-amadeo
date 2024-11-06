'use client';
import GlassInput from '@/components/ui/GlassInput';
import { useInput } from '@/hooks/useInput';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ExamplePage() {
  const email = useInput({
    validate: (value) => {
      if (!value) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address';
      return undefined;
    }
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <GlassInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<EnvelopeIcon className="w-5 h-5" />}
        value={email.value}
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        error={email.error}
        helperText="We'll never share your email"
      />
    </div>
  );
} 