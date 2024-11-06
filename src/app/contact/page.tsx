'use client';
import GlassInput from '@/components/glass/inputs/GlassInput';
import GlassTextarea from '@/components/glass/inputs/GlassTextarea';
import { useGlassInput } from '@/hooks/useGlassInput';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const email = useGlassInput({
    validate: (value) => {
      if (!value) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email address';
    },
  });

  const message = useGlassInput({
    validate: (value) => {
      if (!value) return 'Message is required';
      if (value.length < 10) return 'Message must be at least 10 characters';
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <GlassInput
        label="Email"
        type="email"
        placeholder="your@email.com"
        icon={<EnvelopeIcon className="w-5 h-5" />}
        value={email.value}
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        error={email.error}
      />

      <GlassTextarea
        label="Message"
        placeholder="Your message..."
        rows={5}
        value={message.value}
        onChange={message.handleChange}
        onBlur={message.handleBlur}
        error={message.error}
      />
    </div>
  );
} 