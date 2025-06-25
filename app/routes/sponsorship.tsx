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
    { title: 'Sponsorship | Hack@UCF' },
    {
      name: 'description',
      content:
        'Support the UCF Collegiate Cyber Defense Competition Club by becoming a sponsor. Help fund our students and our mission to educate the community about computer security.',
    },
  ];

  return [...parentMeta, ...routeMeta];
};

export default function Sponsorship() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    company: '',
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
      name === 'company' &&
      (typeof value !== 'string' || value.trim().length < 1)
    ) {
      return 'Enter a valid company name';
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

    const { firstName, lastName, email, message, company } = formData;

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
    if (!company.trim()) {
      newErrors.company = 'Enter a valid company name';
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
      // Append company to lastName for sponsorship form
      const fullLastName = `${lastName} at ${company}`;
      
      const response = await fetch('https://workers.hackucf.org/send', {
        method: 'POST',
        body: new URLSearchParams({
          email,
          firstName,
          lastName: fullLastName,
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
          company: '',
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
        <h1 className="text-5xl font-bold mb-16 text-center">Sponsorship</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p className="text-lg">
              We are a community on campus at University of Central Florida.
              Each member supports each other through the sharing of knowledge
              and passion for computer security. We also reach out to educate
              our local community about computer security through public events
              and forums.
            </p>

            <p className="text-lg">
              We are looking for organizations willing to support our students
              and our mission while we strive to produce high-valued results.
              Our club is primarily funded through corporate sponsorships and
              private donations which help offset the costs associated with
              participating in competitions, team travel, training, and
              equipment. We also welcome in-kind donations—hardware, software,
              training subscriptions, peripheral devices, etc.—that support who
              we are and what we do.
            </p>

            <p className="text-lg">
              Every donation is greatly appreciated and recognized as a
              contribution to our continued success. Properly designated
              donations made to us (the Collegiate Cyber Defense Club) a
              501(c)(3) non-profit organization, may be tax deductible.
            </p>

            <p className="text-lg">
              Learn how to officially sponsor the UCF Collegiate Cyber Defense
              Competition Club by contacting us either with the following form
              or at{' '}
              <a
                href="mailto:sponsorship@hackucf.org"
                className="text-brandGold hover:underline"
              >
                sponsorship@hackucf.org
              </a>
              .
            </p>

            <p className="text-lg">
              For our nonprofit's incorporated bylaws, visit{' '}
              <a
                href="https://hackucf.org/bylaws"
                className="text-brandGold hover:underline"
              >
                hackucf.org/bylaws
              </a>
              .
            </p>
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
              <label htmlFor="company" className="block text-sm font-medium">
                Company Name (required)
              </label>
              <Input
                id="company"
                name="company"
                placeholder="Company Name"
                className="bg-white text-background"
                value={formData.company}
                onChange={handleInputChange}
                aria-invalid={errors.company ? true : undefined}
                aria-errormessage={
                  errors.company ? 'company-error' : undefined
                }
              />
              {errors.company && (
                <div id="company-error" className="text-red-500 text-sm">
                  {errors.company}
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

        <div className="mt-16 text-sm text-center">
          <p className="mb-2">
            A COPY OF THE OFFICIAL REGISTRATION AND FINANCIAL INFORMATION MAY BE
            OBTAINED FROM THE DIVISION OF CONSUMER SERVICES BY CALLING TOLL-FREE
            WITHIN THE STATE.
          </p>
          <p>
            REGISTRATION DOES NOT IMPLY ENDORSEMENT, APPROVAL, OR RECOMMENDATION
            BY THE STATE. Call: 1-800-HELP-FLA (435-7352) or at FDACS.gov.
          </p>
        </div>
      </div>
    </main>
  );
}
