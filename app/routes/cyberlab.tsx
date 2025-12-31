import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { Image } from "@unpic/react";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);

  const routeMeta = [
    { title: "Lockheed Martin Cyber Innovation Lab | Hack@UCF" },
    {
      name: "description",
      content:
        "UCF’s 970-square-foot Lockheed Martin Cyber Innovation Lab in " +
        "Engineering I serves as a learning hub, classroom, and the practice " +
        "center for Hack@UCF.",
    },
  ];

  return [...parentMeta, ...routeMeta];
};

export default function CyberLab() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16 mt-8">
          <h1 className="text-5xl font-bold">
            Lockheed Martin Cyber Innovation Lab
          </h1>
          <Link
            to="/about-us"
            className="text-center border-2 bg-background hover:bg-brandGold text-lg hover:text-background border-brandGold text-brandGold rounded-full w-full max-w-6xl mt-16 py-1"
          >
            Back to About Us
          </Link>
        </div>

        <p className="mb-12 text-xl">
          As the need for cybersecurity experts across the nation grows,
          Hack@UCF has a space to further meet that need.
        </p>

        {/* Image block (Unpic). Replace src and dimensions with your asset. */}
        <figure className="mb-16">
          <Image
            src="/cyber-lab-page.jpg"
            alt="Lockheed Martin Cyber Innovation Lab at UCF"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
          <figcaption className="mt-2 text-sm text-foreground/70">
            The Lockheed Martin Cyber Innovation Lab in Engineering I, 186.
          </figcaption>
        </figure>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">About the Lab</h2>
          <p className="mb-4">
            The lab is in UCF’s Engineering 1 building and serves as a learning
            hub, classroom, and the practice center for Hack@UCF. In November
            2018, Lockheed Martin donated $1.5 million to UCF to help create the
            Cyber Innovation Lab. We are the only RSO on campus with access to a
            space like the Cyberlab. We hold office hours (most) weekdays during
            fall and spring so feel free to stop by. The Cyberlab is a space our
            members use to study, work on projects, hold meetings, and learn
            about cyber.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">
            How to get to the Cyberlab?
          </h2>
          <p className="mb-4">
            The best place to park is Garage C{" "}
            <Link
              to="https://maps.app.goo.gl/m6b4SRzvJkt4eNgz7"
              className="text-brandGold hover:underline"
            >
              12998 Gemini Blvd E, Orlando, FL 32816
            </Link>{" "}
            (parking pass required). You can then enter though the main ENG 2
            atrium or the ENG 1 entrance by Business Administration.{" "}
            <Link
              to="https://maps.app.goo.gl/K6Ao1osVTRnUqK5A8"
              className="text-brandGold hover:underline"
            >
              Google Maps link to approximately the entrance.
            </Link>{" "}
          </p>
        </section>
      </div>
    </main>
  );
}
