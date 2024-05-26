import React, { useRef, useEffect } from "react";

const points = [
  { x: 150, y: 100 },
  { x: 250, y: 80 },
  { x: 350, y: 100 },
  { x: 450, y: 120 },
  { x: 550, y: 100 },
  { x: 650, y: 80 },
  { x: 750, y: 100 },
  { x: 750, y: 200 },
  { x: 650, y: 220 },
  { x: 550, y: 240 },
  { x: 450, y: 260 },
  { x: 350, y: 240 },
  { x: 250, y: 220 },
  { x: 150, y: 200 },
];

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawOutline = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const isInside = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    return ctx.isPointInPath(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawOutline(ctx);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isInside(ctx, mouseX, mouseY)) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        drawOutline(ctx);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Canvas;
