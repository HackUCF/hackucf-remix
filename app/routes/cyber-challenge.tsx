import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);

  const routeMeta = [
    { title: "UCF Cyber Challenge | Hack@UCF" },
    {
      name: "description",
      content:
        "Join the UCF Cyber Challenge on January 30th. A cybersecurity competition for UCF and Seminole State students. Teams of 2, bring your charged laptops!",
    },
  ];

  return [...parentMeta, ...routeMeta];
};

export default function CyberChallenge() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16 mt-8">
          <h1 className="text-5xl font-bold">UCF Cyber Challenge</h1>
          <p className="text-2xl mt-4 text-brandGold">Friday, January 30th</p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Eligibility</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Open to UCF and Seminole State students only</li>
            <li>Teams of 2</li>
            <li>Bring your own charged laptops</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brandGold">
                  <th className="py-3 pr-8 text-brandGold">Time</th>
                  <th className="py-3 text-brandGold">Event</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-foreground/20">
                  <td className="py-3 pr-8">8:00 AM</td>
                  <td className="py-3">Check-in & Registration</td>
                </tr>
                <tr className="border-b border-foreground/20">
                  <td className="py-3 pr-8">9:00 AM</td>
                  <td className="py-3">Competition Begins</td>
                </tr>
                <tr className="border-b border-foreground/20">
                  <td className="py-3 pr-8">12:00 PM</td>
                  <td className="py-3">Lunch Break</td>
                </tr>
                <tr className="border-b border-foreground/20">
                  <td className="py-3 pr-8">1:00 PM</td>
                  <td className="py-3">Competition Resumes</td>
                </tr>
                <tr>
                  <td className="py-3 pr-8">3:00 PM</td>
                  <td className="py-3">Competition Ends & Awards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">Location</h2>
          <p className="text-lg">
            <span className="text-brandGold">UCF Creative Village</span>
            <br />
            500 W. Livingston St
            <br />
            Orlando, FL 32801
          </p>
        </section>

        <div className="flex justify-center">
          <a
            href="https://forms.gle/6DeK8XTGLhQfVXzA9"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 bg-background hover:bg-brandGold text-lg hover:text-background border-brandGold text-brandGold rounded-full px-12 py-3 transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </main>
  );
}
