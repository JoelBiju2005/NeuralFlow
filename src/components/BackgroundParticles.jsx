import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, lastMove: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const count = 200;
      particles = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let r, baseOpacity, depth;
        
        if (rand > 0.95) {
          // Rare larger glows
          r = 4;
          baseOpacity = 0.3;
          depth = 'foreground';
        } else if (rand > 0.6) {
          // Medium dots
          r = 2;
          baseOpacity = Math.random() * 0.2 + 0.15;
          depth = 'mid';
        } else {
          // Small dots
          r = 1;
          baseOpacity = Math.random() * 0.2 + 0.1;
          depth = 'bg';
        }

        // Color mix: 60% forsythia (rgba(255,200,1,0.2)), 30% mint (rgba(209,232,226,0.15)), 10% saffron (rgba(255,153,50,0.2))
        const colorRand = Math.random();
        let color, opacity;
        if (colorRand > 0.4) {
          color = 'forsythia';
          opacity = 0.2;
        } else if (colorRand > 0.1) {
          color = 'mint';
          opacity = 0.15;
        } else {
          color = 'saffron';
          opacity = 0.2;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: r,
          baseOpacity: baseOpacity,
          opacity: opacity,
          colorType: color,
          depth,
          offsetX: 0,
          offsetY: 0,
        });
      }
    };

    const drawParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const timeSinceMouseMoved = now - mouseRef.current.lastMove;
      const isMouseActive = mouseRef.current.x > -500 && timeSinceMouseMoved < 1500;

      // Draw connections (constellation network lines)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const x1 = pi.x + pi.offsetX;
          const y1 = pi.y + pi.offsetY;
          const x2 = pj.x + pj.offsetX;
          const y2 = pj.y + pj.offsetY;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            // Connection lines at rgba(255,200,1,0.08) - nearly invisible
            const opacity = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 200, 1, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Distance to cursor
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (isMouseActive && dist < 120 && dist > 0.1) {
          const force = (120 - dist) / 120; // 1 at cursor, 0 at edge
          const maxDisplacement = 30; // Max displacement 30px
          
          // Parallax depth: background moves at 0.3x cursor speed, mid at 0.6x, foreground at 1x
          const depthMultiplier = p.depth === 'bg' ? 0.3 : p.depth === 'mid' ? 0.6 : 1.0;

          targetOffsetX = (dx / dist) * force * maxDisplacement * depthMultiplier;
          targetOffsetY = (dy / dist) * force * maxDisplacement * depthMultiplier;
        }

        // Return to original coordinates when mouse leaves (ease back over 800ms)
        const lerpFactor = isMouseActive ? 0.1 : 0.05;
        p.offsetX += (targetOffsetX - p.offsetX) * lerpFactor;
        p.offsetY += (targetOffsetY - p.offsetY) * lerpFactor;

        // Apply slow constant viewport movement
        p.x += p.vx;
        p.y += p.vy;

        // Viewport boundaries wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const renderX = p.x + p.offsetX;
        const renderY = p.y + p.offsetY;

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        
        let rVal, gVal, bVal;
        if (p.colorType === 'forsythia') { rVal = 255; gVal = 200; bVal = 1; }
        else if (p.colorType === 'mint') { rVal = 209; gVal = 232; bVal = 226; }
        else { rVal = 255; gVal = 153; bVal = 50; }

        ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    const handleResize = () => {
      resize();
      createParticles();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastMove = Date.now();
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
