import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap(match => match.meta ?? []);

  const routeMeta = [
    { title: 'Calendar & Events | Hack@UCF' },
    {
      name: 'description',
      content:
        "Stay up-to-date with Hack@UCF's upcoming meetings, workshops, CTF competitions, and cybersecurity events. View our full calendar to never miss an opportunity to learn and engage with our community.",
    },
  ];

  return [...parentMeta, ...routeMeta];
};

export default function Calendar() {
  return (
    <main className="bg-background text-black min-h-screen mt-20">
      <div className="container py-16">
        <h1 className="text-5xl font-bold mb-16 text-center pb-2">Calendar</h1>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=calendar%40hackucf.org&amp;ctz=America%2FNew_York"
          className="w-full h-[800px] border-0"
          title="HackUCF Calendar"
        />
      </div>
    </main>
  );
}
