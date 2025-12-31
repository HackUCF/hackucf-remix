import { cn } from "@/lib/utils";
import * as React from "react";

// =============================================================================
// Types
// =============================================================================

interface Sponsor {
  name: string;
  logo?: string;
  url?: string;
}

type TierLevel = "platinum" | "gold" | "silver" | "bronze" | "alumni";

interface TierConfig {
  id: TierLevel;
  label: string;
  sponsors: Sponsor[];
  /** Fixed container size for uniform logo sizing: "w-[Xpx] h-[Ypx]" */
  containerSize: string;
  labelColor: string;
  opacity: string;
}

// =============================================================================
// Sponsor Data by Tier
// =============================================================================

const SPONSORS_BY_TIER: TierConfig[] = [
  {
    id: "platinum",
    label: "Platinum Partners",
    sponsors: [
      {
        name: "Lockheed Martin",
        logo: "/lockheed-martin.svg",
        url: "https://www.lockheedmartin.com/en-us/careers.html",
      },
      {
        name: "Crest Advisory Group",
      },
    ],
    containerSize: "w-40 h-16 md:w-52 md:h-20 xl:w-64 xl:h-24",
    labelColor: "text-brandGold",
    opacity: "opacity-90 hover:opacity-100",
  },
  {
    id: "gold",
    label: "Gold Partners",
    sponsors: [
      {
        name: "Amazon",
        logo: "/amazon.svg",
        url: "https://www.amazon.jobs",
      },
      {
        name: "ThreatLocker",
        logo: "/threatlocker.svg",
        url: "https://www.threatlocker.com",
      },
    ],
    containerSize: "w-32 h-12 md:w-40 md:h-14 xl:w-48 xl:h-16",
    labelColor: "text-brandGold/80",
    opacity: "opacity-80 hover:opacity-100",
  },
  {
    id: "silver",
    label: "Silver Partners",
    sponsors: [
      {
        name: "Dark Wolf Solutions",
        logo: "/dark-wolf.svg",
        url: "https://www.darkwolfsolutions.com",
      },
      {
        name: "Naval Nuclear Laboratory",
        logo: "/naval-nuclear-labratory.svg",
        url: "https://navalnuclearlab.energy.gov",
      },
      {
        name: "Research Innovations",
        logo: "/research-innovations.svg",
        url: "https://www.researchinnovations.com",
      },
      {
        name: "Texas Instruments",
        logo: "/texas-instruments.svg",
        url: "https://www.ti.com",
      },
      {
        name: "CTFd",
        logo: "/ctfd.svg",
        url: "https://ctfd.io",
      },
    ],
    containerSize: "w-28 h-10 md:w-36 md:h-12 xl:w-44 xl:h-14",
    labelColor: "text-white/60",
    opacity: "opacity-70 hover:opacity-100",
  },
  {
    id: "bronze",
    label: "Bronze Partners",
    sponsors: [
      {
        name: "Guidepoint Security",
        logo: "/guidepoint-security.svg",
        url: "https://www.guidepointsecurity.com",
      },
    ],
    containerSize: "w-28 h-10 md:w-36 md:h-12 xl:w-44 xl:h-14",
    labelColor: "text-amber-500/70",
    opacity: "opacity-70 hover:opacity-100",
  },
  {
    id: "alumni",
    label: "Alumni Supporters",
    sponsors: [
      {
        name: "TriCat",
        logo: "/tricat.svg",
      },
      {
        name: "Other Sponsors",
        logo: "/other-sponsors.svg",
      },
    ],
    containerSize: "w-24 h-8 md:w-32 md:h-10 xl:w-40 xl:h-12",
    labelColor: "text-white/40",
    opacity: "opacity-60 hover:opacity-100",
  },
];

// =============================================================================
// Sub-Components
// =============================================================================

interface SponsorLogoProps {
  sponsor: Sponsor;
  containerSize: string;
  opacity: string;
}

const SponsorLogo = React.memo(function SponsorLogo({
  sponsor,
  containerSize,
  opacity,
}: SponsorLogoProps) {
  // Fixed-size container with centered content
  const containerClasses = cn(
    "flex items-center justify-center",
    containerSize,
  );

  const content = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className={cn(
        "max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300",
        "grayscale hover:grayscale-0",
        opacity,
      )}
      loading="lazy"
      draggable={false}
    />
  ) : (
    <span
      className={cn(
        "font-bold text-white text-center leading-tight transition-all duration-300",
        "text-sm md:text-base xl:text-lg",
        opacity,
        "hover:text-brandGold",
      )}
    >
      {sponsor.name}
    </span>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          containerClasses,
          "transition-transform duration-300 hover:-translate-y-1",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brandGold focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded",
        )}
        aria-label={`Visit ${sponsor.name} (opens in new tab)`}
      >
        {content}
      </a>
    );
  }

  return <div className={containerClasses}>{content}</div>;
});

interface TierRowProps {
  tier: TierConfig;
}

function TierRow({ tier }: TierRowProps) {
  return (
    <div className="space-y-4">
      {/* Tier Label */}
      <div className="text-center">
        <span
          className={cn(
            "inline-block text-[0.65rem] md:text-xs font-semibold tracking-[0.2em] uppercase",
            "pb-2 border-b-2 border-current",
            tier.labelColor,
          )}
        >
          {tier.label}
        </span>
      </div>

      {/* Logo Grid - Centered flex container */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center",
          "gap-6 md:gap-8 xl:gap-12",
          "px-4 py-4 md:py-6",
        )}
      >
        {tier.sponsors.map((sponsor) => (
          <SponsorLogo
            key={sponsor.name}
            sponsor={sponsor}
            containerSize={tier.containerSize}
            opacity={tier.opacity}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

function SponsorTiers() {
  return (
    <section
      className="w-full max-w-6xl mx-auto py-8 md:py-12 space-y-8 md:space-y-12"
      aria-label="Our Sponsors"
    >
      {SPONSORS_BY_TIER.map((tier) => (
        <TierRow key={tier.id} tier={tier} />
      ))}
    </section>
  );
}

export { SponsorTiers };
