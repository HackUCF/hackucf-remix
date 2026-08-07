import { useEffect, useRef } from "react";

interface HackerBackgroundProps {
  color?: string;
  fontSize?: number;
  className?: string;
  speed?: number;
}

const HackerBackground: React.FC<HackerBackgroundProps> = ({
  color = "#D2990B",
  fontSize = 14,
  className = "",
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: NodeJS.Timeout;
    let isResizing = false;

    const resizeCanvas = () => {
      const newWidth = window.innerWidth;
      // Add buffer on mobile to prevent address bar resize issues
      const isMobile = window.innerWidth <= 768;
      const newHeight = window.innerHeight + (isMobile ? 200 : 0);

      // Only resize if dimensions actually changed to prevent unnecessary clearing
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth;
        canvas.height = newHeight;
      }
    };

    resizeCanvas();

    let animationFrameId: number;

    // Recalculate columns and drops after resizing
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = new Array(columns).fill(1);

    const chars =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()";

    let lastTime = 0;
    const interval = 33; // ~30 fps

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (currentTime - lastTime < interval) return;
      lastTime = currentTime;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed; // Use the speed prop to control fall rate
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    // On mobile, only resize for width changes to avoid address bar issues
    const debouncedResize = () => {
      const isMobile = window.innerWidth <= 768;
      const currentWidth = canvas.width;
      const newWidth = window.innerWidth;

      // On mobile, only resize if width changes (ignore height changes from address bar)
      if (isMobile && Math.abs(newWidth - currentWidth) < 10) {
        return; // Ignore minor width changes and all height changes on mobile
      }

      clearTimeout(resizeTimeout);
      isResizing = true;

      resizeTimeout = setTimeout(() => {
        const oldColumns = columns;
        const oldDrops = [...drops];

        resizeCanvas();
        columns = Math.floor(canvas.width / fontSize);

        // Preserve existing drop positions when possible
        if (columns !== oldColumns) {
          const newDrops = new Array(columns);
          for (let i = 0; i < columns; i++) {
            if (i < oldDrops.length) {
              newDrops[i] = oldDrops[i];
            } else {
              newDrops[i] = Math.random() * (canvas.height / fontSize);
            }
          }
          drops = newDrops;
        }

        isResizing = false;
      }, 150); // 150ms debounce
    };

    // Use passive listener for better scroll performance on mobile
    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, fontSize, speed]);

  // Set default width and height to prevent hydration mismatch
  const defaultWidth = 800;
  const defaultHeight = 600;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      width={defaultWidth}
      height={defaultHeight}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        willChange: "auto",
        backfaceVisibility: "hidden",
      }}
    />
  );
};

export default HackerBackground;
