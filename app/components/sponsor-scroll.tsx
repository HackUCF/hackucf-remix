"use client";

import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import { Image } from "@unpic/react";

const images = [
  {
    title: "Lockheed Martin",
    thumbnail: "/lockheed-martin.svg",
  },
  {
    title: "Redseer",
    thumbnail: "/redseer.svg",
  },
  {
    title: "Amazon",
    thumbnail: "/amazon.svg",
  },
  {
    title: "Dark Wolf",
    thumbnail: "/dark-wolf.svg",
  },
  {
    title: "Naval Nuclear Labratory",
    thumbnail: "/naval-nuclear-labratory.svg",
  },
  {
    title: "Texas Instruments",
    thumbnail: "/texas-instruments.svg",
  },
  {
    title: "CTFd",
    thumbnail: "/ctfd.svg",
  },
  {
    title: "Guidepoint Security",
    thumbnail: "/guidepoint-security.svg",
  },
  {
    title: "TriCat",
    thumbnail: "/tricat.svg",
  },
  {
    title: "Other",
    thumbnail: "/other-sponsors.svg",
  },
];

const velocity = [3, -3];

function SponsorScroll() {
  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5 py-8">
        {velocity.map((v, index) => (
          <ScrollVelocity key={index} velocity={v}>
            {images.map(({ title, thumbnail }) => (
              <div
                key={title}
                className="relative h-[6rem] w-[9rem] md:h-[8rem] md:w-[12rem] xl:h-[12rem] xl:w-[18rem] overflow-hidden"
              >
                <Image
                  src={thumbnail}
                  alt={title}
                  className="absolute inset-0 m-auto max-h-full max-w-full object-contain object-center p-2"
                  layout="fullWidth"
                  loading="lazy"
                />
              </div>
            ))}
          </ScrollVelocity>
        ))}
      </div>
    </div>
  );
}

export { SponsorScroll };
