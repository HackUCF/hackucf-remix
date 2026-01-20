import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import * as React from "react";

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Base scroll speed in percentage points per second.
   * Positive = left, Negative = right
   * Recommended: 15-30 for smooth scrolling
   */
  velocity?: number;
  /**
   * Whether to animate continuously or only on scroll
   */
  movable?: boolean;
  /**
   * Clamp the velocity factor
   */
  clamp?: boolean;
  /**
   * Gap between items in the marquee (Tailwind spacing scale)
   */
  gap?: string;
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps>(
  (
    {
      children,
      velocity = 20,
      movable = true,
      clamp = false,
      gap = "gap-8",
      className,
      ...props
    },
    ref,
  ) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smoother spring config for less jarring motion
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 80,
      stiffness: 60,
      restDelta: 0.001,
    });

    // Reduced velocity factor impact for smoother feel
    const velocityFactor = useTransform(smoothVelocity, [0, 5000], [0, 2], {
      clamp,
    });

    // Wrap at 50% since we duplicate content 2x
    const x = useTransform(baseX, (v) => `${v % 50}%`);

    const directionFactor = React.useRef<number>(1);
    const scrollThreshold = React.useRef<number>(5);

    // Check for reduced motion preference
    const [prefersReducedMotion, setPrefersReducedMotion] =
      React.useState(false);

    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useAnimationFrame((_, delta) => {
      // Skip animation if user prefers reduced motion
      if (prefersReducedMotion) return;

      if (movable) {
        move(delta);
      } else {
        if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
          move(delta);
        }
      }
    });

    function move(delta: number) {
      // Smoother movement calculation
      // velocity is now in % per second, delta is in ms
      let moveBy = directionFactor.current * velocity * (delta / 1000);

      // Respond to scroll direction but with reduced impact
      const velFactor = velocityFactor.get();
      if (velFactor < 0) {
        directionFactor.current = -1;
      } else if (velFactor > 0) {
        directionFactor.current = 1;
      }

      // Add scroll influence (reduced from original)
      moveBy += directionFactor.current * moveBy * velFactor * 0.3;

      baseX.set(baseX.get() + moveBy);
    }

    // Convert children to array for duplication
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn("relative flex overflow-hidden", className)}
        {...props}
      >
        <motion.div
          className={cn("flex flex-nowrap items-center", gap)}
          style={{ x }}
        >
          {/* First set of children */}
          {childrenArray}
          {/* Duplicate for seamless loop */}
          {childrenArray}
        </motion.div>
      </div>
    );
  },
);
ScrollVelocity.displayName = "ScrollVelocity";

export { ScrollVelocity, type ScrollVelocityProps };
