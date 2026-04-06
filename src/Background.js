import { useEffect, useRef } from "react";

const PARTICLES = [
  { emoji: "🍃", size: 18 },
  { emoji: "🌿", size: 22 },
  { emoji: "🍀", size: 16 },
  { emoji: "🌱", size: 14 },
  { emoji: "🍃", size: 20 },
  { emoji: "🌿", size: 18 },
  { emoji: "🍀", size: 24 },
  { emoji: "🍃", size: 15 },
  { emoji: "🌱", size: 19 },
  { emoji: "🍃", size: 22 },
  { emoji: "🌿", size: 16 },
  { emoji: "🍀", size: 20 },
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function Background() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create particles
    const particles = PARTICLES.map((p) => ({
      emoji: p.emoji,
      size: p.size,
      x: randomBetween(0, width),
      y: randomBetween(-height, height),
      speedY: randomBetween(0.3, 0.9),
      speedX: randomBetween(-0.3, 0.3),
      rotation: randomBetween(0, 360),
      rotationSpeed: randomBetween(-0.4, 0.4),
      opacity: randomBetween(0.25, 0.55),
      wobble: randomBetween(0, Math.PI * 2),
      wobbleSpeed: randomBetween(0.005, 0.02),
    }));

    // Small glowing dots
    const dots = Array.from({ length: 35 }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      radius: randomBetween(1, 3),
      opacity: randomBetween(0.1, 0.4),
      pulse: randomBetween(0, Math.PI * 2),
      pulseSpeed: randomBetween(0.01, 0.03),
    }));

    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw glowing dots
      dots.forEach((dot) => {
        dot.pulse += dot.pulseSpeed;
        const currentOpacity =
          dot.opacity * (0.6 + 0.4 * Math.sin(dot.pulse));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46, 125, 50, ${currentOpacity})`;
        ctx.fill();

        // Soft glow
        const grd = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.radius * 6
        );
        grd.addColorStop(0, `rgba(76, 175, 80, ${currentOpacity * 0.4})`);
        grd.addColorStop(1, `rgba(76, 175, 80, 0)`);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      // Draw leaf particles
      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Reset when off screen
        if (p.y > height + 40) {
          p.y = -40;
          p.x = randomBetween(0, width);
        }
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}