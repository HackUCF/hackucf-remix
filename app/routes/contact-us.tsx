import type { MetaFunction } from '@remix-run/cloudflare';
import { useState, useEffect, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

import { ClientOnly } from "@/components/ClientOnly";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Replace with your actual Cloudflare Turnstile site key
const TURNSTILE_SITE_KEY = '0x4AAAAAAA_5HexOM2PrjMHA';

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap(match => match.meta ?? []);

  const routeMeta = [
    { title: 'Contact Us | Hack@UCF' },
    {
      name: 'description',
      content:
        'Need to reach us? Send us an email or fill out a form, and someone from our team will get back to you as soon as possible.',
    },
  ];

  return [...parentMeta, ...routeMeta];
};

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<any>(null);

  const validateField = (name: string, value: string) => {
    if (
      name === 'email' &&
      (typeof value !== 'string' || !value.includes('@'))
    ) {
      return 'Invalid email address';
    }
    if (name === 'message' && (typeof value !== 'string' || value.length < 8)) {
      return 'Message should contain more content';
    }
    if (
      (name === 'firstName' || name === 'lastName') &&
      (typeof value !== 'string' || value.trim().length < 1)
    ) {
      return `Enter a valid ${name === 'firstName' ? 'first' : 'last'} name`;
    }
    return '';
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const { firstName, lastName, email, message } = formData;

    // Client-side validation
    const newErrors: Record<string, string> = {};

    if (!email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }
    if (message.length < 9) {
      newErrors.message = 'Message should contain more content';
    }
    if (!firstName.trim()) {
      newErrors.firstName = 'Enter a valid first name';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Enter a valid last name';
    }
    if (!turnstileToken) {
      newErrors.turnstile = 'Please complete the CAPTCHA';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://workers.hackucf.org', {
        method: 'POST',
        body: new URLSearchParams({
          email,
          firstName,
          lastName,
          message,
          'cf-turnstile-response': turnstileToken,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      let data: any;
      if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        if (data?.error?.includes('turnstile') || data?.error?.includes('captcha')) {
          setErrors({ turnstile: data?.error || 'CAPTCHA validation failed' });
        } else {
          setErrors({ form: data?.error || 'Failed to submit form' });
        }
      } else {
        setShowSuccessMessage(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        });
        setTurnstileToken('');
        if (turnstileRef.current?.reset) {
          turnstileRef.current.reset();
        }
        const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ form: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background text-white min-h-screen mt-20 px-8">
      <div className="container mx-auto max-w-6xl py-16">
        <h1 className="text-5xl font-bold mb-16 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-lg mb-8">
              Need to reach us? No problem. Send us an email or fill out a form,
              and someone from our team will get back to you as soon as
              possible.
            </p>

            <div className="space-y-4">
              <ContactInfo label="General Inquiries" email="ops@hackucf.org" />
              <ContactInfo
                label="Sponsorship"
                email="sponsorship@hackucf.org"
              />
              <ContactInfo label="Disclosure" email="disclosure@hackucf.org" />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-brandGold">
                Mailing Address
              </h3>
              <address className="not-italic">
                Collegiate Cyber Defense Club @ UCF<br />
                c/o Dr. Thomas Nedorost<br />
                Department of Computer Science<br />
                University of Central Florida<br />
                4328 Scorpius Street, HEC 346<br />
                Orlando, FL 32816-2362
              </address>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.form && (
              <div className="text-red-500 bg-red-100 border border-red-400 rounded p-2">
                {errors.form}
              </div>
            )}
            {showSuccessMessage && (
              <div className="text-green-500 bg-green-100 border border-green-400 rounded p-2">
                Your message has been sent successfully!
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name (required)
              </label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="bg-white text-background"
                value={formData.firstName}
                onChange={handleInputChange}
                aria-invalid={errors.firstName ? true : undefined}
                aria-errormessage={
                  errors.firstName ? 'firstName-error' : undefined
                }
              />
              {errors.firstName && (
                <div id="firstName-error" className="text-red-500 text-sm">
                  {errors.firstName}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name (required)
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="bg-white text-background"
                value={formData.lastName}
                onChange={handleInputChange}
                aria-invalid={errors.lastName ? true : undefined}
                aria-errormessage={
                  errors.lastName ? 'lastName-error' : undefined
                }
              />
              {errors.lastName && (
                <div id="lastName-error" className="text-red-500 text-sm">
                  {errors.lastName}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email (required)
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="bg-white text-background"
                value={formData.email}
                onChange={handleInputChange}
                aria-invalid={errors.email ? true : undefined}
                aria-errormessage={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <div id="email-error" className="text-red-500 text-sm">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                Message (required)
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="bg-white text-background"
                rows={8}
                value={formData.message}
                onChange={handleInputChange}
                aria-invalid={errors.message ? true : undefined}
                aria-errormessage={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <div id="message-error" className="text-red-500 text-sm">
                  {errors.message}
                </div>
              )}
            </div>

            {/* Cloudflare Turnstile */}
            <div className="my-4">
              <ClientOnly fallback={<div>Loading captcha...</div>}>
                <Turnstile
                  siteKey={TURNSTILE_SITE_KEY}
                  ref={turnstileRef}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken('')}
                  onExpire={() => setTurnstileToken('')}
                  options={{
                    theme: 'dark',
                    size: 'normal',
                  }}
                />
                {errors.turnstile && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.turnstile}
                  </div>
                )}
              </ClientOnly>
            </div>

            <Button
              type="submit"
              className="bg-brandGold hover:bg-brandGold/90 text-background font-semibold py-2 px-4 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

function ContactInfo({
  label,
  email,
}: {
  label: string;
  email: string;
  link?: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-1 text-brandGold">{label}</h3>
      <a href={`mailto:${email}`} className="text-brandGold hover:underline">
        {email}
      </a>
    </div>
  );
}
