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
        "Engineering I serves as a hub, classroom, and Hack@UCF practice " +
        "center, supported by a $1.5M gift and long-term mentorship.",
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
          As the need for cybersecurity experts across the nation grows, UCF has
          created a space where students interested in the field can develop
          their skills.
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
            The Lockheed Martin Cyber Innovation Lab in Engineering I.
          </figcaption>
        </figure>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">About the Lab</h2>
          <p className="mb-4">
            The Lockheed Martin Cyber Innovation Lab, located in the Engineering
            I building, opened in February to foster the next generation of
            cybersecurity.
          </p>
          <p>Spring 2019 | By Nicole Dudenhoefer ’17</p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">
            Purpose and Student Impact
          </h2>
          <p className="mb-4">
            The 970-square-foot lab will serve as a learning hub, classroom and
            the practice center for Hack@UCF, the university’s cyberdefense
            club. The student organization has more than 350 members and has
            placed first in 41 competitions since 2013.
          </p>
          <p>
            “Having a centralized space will streamline the way we organize our
            meetings and practices,” says Hack@UCF president David Maria, a
            senior studying computer engineering. “With this lab, we can
            practice for competitions, host workshops and speakers, provide
            cybersecurity tools and resources, give our student members a sense
            of community and help get them ready for future careers. It’s not
            just a practice space. It’s a home for us.”
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-semibold">
            Support from Lockheed Martin
          </h2>
          <p className="mb-4">
            Last year, Lockheed Martin donated $1.5 million to UCF to help
            create the facility and fund software and technology to support the
            lab. The defense company will also provide training and mentorship
            to engineering students for the next 20 years.
          </p>
          <p>
            UCF provides more graduates to aerospace and defense companies than
            any other university in the nation.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-3xl font-semibold">National Recognition</h2>
          <p>
            In 2016, the university was named a National Center of Academic
            Excellence in Cyberdefense Education by the National Security Agency
            and the U.S. Department of Homeland Security.
          </p>
        </section>
      </div>
    </main>
  );
}
