import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  z: number; // Depth factor (0.35 to 1.3)
}

interface GeometricShape {
  xPercent: number; // Viewport percentage X (0 to 1)
  yPercent: number; // Viewport percentage Y (0 to 1)
  radius: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  parallaxFactor: number;
  type: 'octahedron' | 'cube' | 'diamond' | 'ring';
}

export const InteractiveReactiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect system preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Precise mobile check helper: screen width or pure touch device
    const checkIsMobile = (): boolean => {
      if (window.innerWidth < 768) return true;
      return (
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(pointer: fine)').matches
      );
    };

    let isMobile = checkIsMobile();
    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Responsive Canvas Resizing with DPR compensation
    const updateCanvasDimensions = () => {
      isMobile = checkIsMobile();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Set scale matrix to handle high-density displays cleanly
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateCanvasDimensions();

    // Mouse state with smooth spring lerp
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      glowAlpha: 0,
      radius: isMobile ? 0 : 160,
    };

    // Responsive Particle Count
    const getTargetParticleCount = () =>
      prefersReducedMotion ? 18 : isMobile ? 28 : 75;

    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const count = getTargetParticleCount();
      for (let i = 0; i < count; i++) {
        const z = 0.35 + Math.random() * 0.95;
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * (0.28 * z),
          vy: (Math.random() - 0.5) * (0.28 * z),
          size: (1 + Math.random() * 1.5) * z,
          alpha: (0.2 + Math.random() * 0.45) * z,
          z,
        });
      }
    };

    initParticles();

    // 4 Abstract 3D Geometric Elements balanced in quadrants
    const getShapeRadius = (desktopR: number, mobileR: number) =>
      isMobile ? mobileR : desktopR;

    const shapes: GeometricShape[] = [
      {
        xPercent: 0.18,
        yPercent: 0.22,
        radius: getShapeRadius(46, 26),
        rotationX: 0.2,
        rotationY: 0.4,
        rotationZ: 0,
        rotSpeedX: 0.003,
        rotSpeedY: 0.005,
        rotSpeedZ: 0.002,
        parallaxFactor: 0.035,
        type: 'octahedron',
      },
      {
        xPercent: 0.82,
        yPercent: 0.28,
        radius: getShapeRadius(42, 24),
        rotationX: 0.6,
        rotationY: 0.2,
        rotationZ: 0.3,
        rotSpeedX: 0.004,
        rotSpeedY: 0.003,
        rotSpeedZ: 0.004,
        parallaxFactor: 0.045,
        type: 'cube',
      },
      {
        xPercent: 0.18,
        yPercent: 0.74,
        radius: getShapeRadius(38, 22),
        rotationX: 0.3,
        rotationY: 0.5,
        rotationZ: 0.1,
        rotSpeedX: 0.003,
        rotSpeedY: 0.004,
        rotSpeedZ: 0.002,
        parallaxFactor: 0.03,
        type: 'diamond',
      },
      {
        xPercent: 0.82,
        yPercent: 0.78,
        radius: getShapeRadius(50, 28),
        rotationX: 0.8,
        rotationY: 0.3,
        rotationZ: 0.4,
        rotSpeedX: 0.002,
        rotSpeedY: 0.005,
        rotSpeedZ: 0.003,
        parallaxFactor: 0.05,
        type: 'ring',
      },
    ];

    // Resize & Orientation Change Handler
    const handleResize = () => {
      const prevWidth = width;
      const prevHeight = height;

      updateCanvasDimensions();

      // Update shape radii for current screen density
      shapes[0].radius = getShapeRadius(46, 26);
      shapes[1].radius = getShapeRadius(42, 24);
      shapes[2].radius = getShapeRadius(38, 22);
      shapes[3].radius = getShapeRadius(50, 28);

      // Re-map and re-distribute particle positions proportionally across new dimensions
      if (prevWidth > 0 && prevHeight > 0) {
        const scaleX = width / prevWidth;
        const scaleY = height / prevHeight;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.baseX = Math.max(0, Math.min(width, p.baseX * scaleX));
          p.baseY = Math.max(0, Math.min(height, p.baseY * scaleY));
          p.x = Math.max(0, Math.min(width, p.x * scaleX));
          p.y = Math.max(0, Math.min(height, p.y * scaleY));
        }
      }

      // Adjust particle count to match screen target
      const targetCount = getTargetParticleCount();
      if (particles.length > targetCount) {
        particles.length = targetCount;
      } else if (particles.length < targetCount) {
        const diff = targetCount - particles.length;
        for (let i = 0; i < diff; i++) {
          const z = 0.35 + Math.random() * 0.95;
          const x = Math.random() * width;
          const y = Math.random() * height;
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * (0.28 * z),
            vy: (Math.random() - 0.5) * (0.28 * z),
            size: (1 + Math.random() * 1.5) * z,
            alpha: (0.2 + Math.random() * 0.45) * z,
            z,
          });
        }
      }

      // Reset mouse coordinates to the center of the viewport
      mouse.x = width / 2;
      mouse.y = height / 2;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.radius = isMobile ? 0 : 160;

      if (isMobile) {
        mouse.active = false;
        mouse.glowAlpha = 0;
      }
    };

    // Mouse Movement Tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // 3D Point Projection Helper for Geometric Shapes
    const project3D = (
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      scale: number,
      centerX: number,
      centerY: number
    ): [number, number] => {
      // Rotation X
      let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
      let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

      // Rotation Y
      let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);

      // Rotation Z
      let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
      let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

      // Perspective projection
      const fov = 260;
      const factor = fov / (fov + z2 * scale);
      return [centerX + x3 * scale * factor, centerY + y3 * scale * factor];
    };

    // Draw Geometric Shapes with Viewport Safety Clamping
    const drawGeometricShape = (
      shape: GeometricShape,
      mouseDeltaX: number,
      mouseDeltaY: number
    ) => {
      const rawCenterX =
        shape.xPercent * width + mouseDeltaX * shape.parallaxFactor * 36;
      const rawCenterY =
        shape.yPercent * height + mouseDeltaY * shape.parallaxFactor * 36;

      // Clamping ensures shapes stay fully visible inside any mobile viewport
      const margin = shape.radius + (isMobile ? 14 : 24);
      const centerX = Math.max(margin, Math.min(width - margin, rawCenterX));
      const centerY = Math.max(margin, Math.min(height - margin, rawCenterY));

      if (!prefersReducedMotion) {
        shape.rotationX += shape.rotSpeedX;
        shape.rotationY += shape.rotSpeedY;
        shape.rotationZ += shape.rotSpeedZ;
      }

      const r = shape.radius;
      const isLight = document.documentElement.classList.contains('light');

      ctx.save();
      ctx.lineWidth = 0.85;
      ctx.strokeStyle = isLight
        ? 'rgba(37, 99, 235, 0.16)'
        : 'rgba(184, 201, 255, 0.16)';
      ctx.fillStyle = isLight
        ? 'rgba(37, 99, 235, 0.4)'
        : 'rgba(184, 201, 255, 0.45)';

      if (shape.type === 'octahedron') {
        const vertices = [
          [0, -r, 0],
          [0, r, 0],
          [-r, 0, 0],
          [r, 0, 0],
          [0, 0, -r],
          [0, 0, r],
        ];

        const edges = [
          [0, 2], [0, 3], [0, 4], [0, 5],
          [1, 2], [1, 3], [1, 4], [1, 5],
          [2, 4], [4, 3], [3, 5], [5, 2],
        ];

        const projected = vertices.map((v) =>
          project3D(
            v[0],
            v[1],
            v[2],
            shape.rotationX,
            shape.rotationY,
            shape.rotationZ,
            1,
            centerX,
            centerY
          )
        );

        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(projected[i][0], projected[i][1]);
          ctx.lineTo(projected[j][0], projected[j][1]);
          ctx.stroke();
        });

        projected.forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, 1.4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (shape.type === 'cube') {
        const s = r * 0.72;
        const vertices = [
          [-s, -s, -s],
          [s, -s, -s],
          [s, s, -s],
          [-s, s, -s],
          [-s, -s, s],
          [s, -s, s],
          [s, s, s],
          [-s, s, s],
        ];

        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
        ];

        const projected = vertices.map((v) =>
          project3D(
            v[0],
            v[1],
            v[2],
            shape.rotationX,
            shape.rotationY,
            shape.rotationZ,
            1,
            centerX,
            centerY
          )
        );

        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(projected[i][0], projected[i][1]);
          ctx.lineTo(projected[j][0], projected[j][1]);
          ctx.stroke();
        });

        projected.forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (shape.type === 'diamond') {
        const vertices = [
          [0, -r * 1.3, 0],
          [r * 0.75, 0, 0],
          [0, 0, r * 0.75],
          [-r * 0.75, 0, 0],
          [0, 0, -r * 0.75],
          [0, r * 1.3, 0],
        ];

        const edges = [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [5, 1], [5, 2], [5, 3], [5, 4],
          [1, 2], [2, 3], [3, 4], [4, 1],
        ];

        const projected = vertices.map((v) =>
          project3D(
            v[0],
            v[1],
            v[2],
            shape.rotationX,
            shape.rotationY,
            shape.rotationZ,
            1,
            centerX,
            centerY
          )
        );

        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(projected[i][0], projected[i][1]);
          ctx.lineTo(projected[j][0], projected[j][1]);
          ctx.stroke();
        });
      } else if (shape.type === 'ring') {
        const segments = 12;
        const projected: [number, number][] = [];
        for (let s = 0; s < segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          projected.push(
            project3D(
              Math.cos(angle) * r,
              Math.sin(angle) * r,
              0,
              shape.rotationX,
              shape.rotationY,
              shape.rotationZ,
              1,
              centerX,
              centerY
            )
          );
        }

        ctx.beginPath();
        projected.forEach(([px, py], idx) => {
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.stroke();

        projected.forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.restore();
    };

    // Main Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse position on desktop only
      if (!isMobile) {
        mouse.x += (mouse.targetX - mouse.x) * 0.085;
        mouse.y += (mouse.targetY - mouse.y) * 0.085;

        const targetGlow = mouse.active ? 1 : 0;
        mouse.glowAlpha += (targetGlow - mouse.glowAlpha) * 0.05;
      } else {
        mouse.active = false;
        mouse.glowAlpha = 0;
      }

      const isLight = document.documentElement.classList.contains('light');
      const particleBaseColor = isLight ? '37, 99, 235' : '184, 201, 255';

      // 1. Soft Blue Radial Spotlight following mouse (Desktop only)
      if (mouse.glowAlpha > 0.01 && !isMobile) {
        const glowRadius = 240;
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        if (isLight) {
          radialGlow.addColorStop(0, `rgba(37, 99, 235, ${0.08 * mouse.glowAlpha})`);
          radialGlow.addColorStop(0.45, `rgba(59, 130, 246, ${0.03 * mouse.glowAlpha})`);
          radialGlow.addColorStop(1, 'rgba(250, 250, 252, 0)');
        } else {
          radialGlow.addColorStop(0, `rgba(184, 201, 255, ${0.11 * mouse.glowAlpha})`);
          radialGlow.addColorStop(0.45, `rgba(112, 150, 255, ${0.04 * mouse.glowAlpha})`);
          radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = radialGlow;
        ctx.fillRect(
          mouse.x - glowRadius,
          mouse.y - glowRadius,
          glowRadius * 2,
          glowRadius * 2
        );
      }

      // Safe Parallax Shift (0 on mobile to prevent clustering!)
      const mouseDeltaX =
        !isMobile && width > 0
          ? Math.max(-0.5, Math.min(0.5, (mouse.x - width / 2) / width))
          : 0;
      const mouseDeltaY =
        !isMobile && height > 0
          ? Math.max(-0.5, Math.min(0.5, (mouse.y - height / 2) / height))
          : 0;

      // 2. Draw Floating Geometric Shapes
      shapes.forEach((shape) => {
        drawGeometricShape(shape, mouseDeltaX, mouseDeltaY);
      });

      // 3. Update & Draw Particles with Spatial Connection Lines
      const maxConnectDistance = isMobile ? 80 : 110;
      const maxConnectDistSq = maxConnectDistance * maxConnectDistance;
      const pad = 24;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Autonomous subtle floating
          p.baseX += p.vx;
          p.baseY += p.vy;

          // Natural wrap-around edges
          if (p.baseX < -pad) p.baseX = width + pad;
          if (p.baseX > width + pad) p.baseX = -pad;
          if (p.baseY < -pad) p.baseY = height + pad;
          if (p.baseY > height + pad) p.baseY = -pad;

          // Desktop Mouse Repulsion Effect
          if (mouse.active && !isMobile) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 20 * p.z;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }

          // Gentle spring return towards base anchor + subtle 3D parallax
          const parallaxShiftX = mouseDeltaX * 36 * p.z;
          const parallaxShiftY = mouseDeltaY * 36 * p.z;
          const targetX = p.baseX + parallaxShiftX;
          const targetY = p.baseY + parallaxShiftY;

          p.x += (targetX - p.x) * 0.055;
          p.y += (targetY - p.y) * 0.055;
        }

        // Draw Particle Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleBaseColor}, ${p.alpha})`;
        ctx.fill();

        // Desktop Cursor to Particle Connection Line
        if (mouse.active && !isMobile) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const cursorConnectRadius = 135;

          if (mDistSq < cursorConnectRadius * cursorConnectRadius) {
            const mDist = Math.sqrt(mDistSq);
            const lineAlpha =
              (1 - mDist / cursorConnectRadius) *
              0.22 *
              p.z *
              mouse.glowAlpha;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${particleBaseColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Inter-particle Connecting Constellation Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha =
              (1 - dist / maxConnectDistance) * 0.12 * (p.z * p2.z);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${particleBaseColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
    />
  );
};
