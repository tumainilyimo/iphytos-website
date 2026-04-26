import { useEffect, useRef, memo } from "react";

interface Vec2 {
  x: number;
  y: number;
}

interface ReceptorAtom extends Vec2 {
  radius: number;
  type: "surface" | "pocket" | "helix";
  phase: number;
  color: string;
}

interface LigandAtom extends Vec2 {
  radius: number;
  color: string;
  element: string;
  phase: number;
}

interface LigandBond {
  from: number;
  to: number;
  order: number;
}

interface Ligand {
  atoms: LigandAtom[];
  bonds: LigandBond[];
  cx: number;
  cy: number;
  targetX: number;
  targetY: number;
  docked: boolean;
  dockedTime: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  trail: Vec2[];
}

interface HelixPoint extends Vec2 {
  z: number;
  phase: number;
}

// Color palette matching iPhytos brand
const COLORS = {
  receptorFill: "rgba(45, 95, 71, 0.08)",
  receptorStroke: "rgba(45, 95, 71, 0.22)",
  receptorNode: "rgba(45, 95, 71, 0.35)",
  pocketGlow: "rgba(60, 141, 173, 0.20)",
  pocketCore: "rgba(60, 141, 173, 0.35)",
  helixA: "rgba(45, 95, 71, 0.30)",
  helixB: "rgba(60, 141, 173, 0.25)",
  bond: "rgba(45, 95, 71, 0.4)",
  bondDocked: "rgba(60, 141, 173, 0.55)",
  particle: "rgba(60, 141, 173, 0.08)",
  trail: "rgba(60, 141, 173, 0.12)",
};

const ELEMENT_COLORS: Record<string, string> = {
  C: "rgba(45, 95, 71, 0.75)",
  N: "rgba(60, 141, 173, 0.85)",
  O: "rgba(200, 60, 60, 0.75)",
  S: "rgba(249, 168, 38, 0.80)",
  H: "rgba(140, 140, 140, 0.6)",
};

function generateReceptor(w: number, h: number) {
  const cx = w * 0.55;
  const cy = h * 0.45;
  const baseRadius = Math.min(w, h) * 0.32;
  const pocketAngle = Math.PI * 0.8;
  const pocketWidth = 0.9;
  const pocketDepth = baseRadius * 0.5;

  const atoms: ReceptorAtom[] = [];
  const surfacePoints: Vec2[] = [];

  // Generate receptor surface boundary
  const steps = 80;
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const distFromPocket = Math.abs(
      ((angle - pocketAngle + Math.PI) % (Math.PI * 2)) - Math.PI
    );
    const pocketFactor = Math.max(0, 1 - distFromPocket / pocketWidth);
    const smoothPocket = pocketFactor * pocketFactor * (3 - 2 * pocketFactor);
    const r = baseRadius - smoothPocket * pocketDepth;

    const wobble = Math.sin(angle * 5) * baseRadius * 0.015 + Math.sin(angle * 3) * baseRadius * 0.01;
    const finalR = r + wobble;

    const x = cx + Math.cos(angle) * finalR;
    const y = cy + Math.sin(angle) * finalR;
    surfacePoints.push({ x, y });

    if (i % 3 === 0) {
      const nodeR = 3 + Math.random() * 5;
      const isPocket = pocketFactor > 0.2;
      atoms.push({
        x,
        y,
        radius: nodeR,
        type: isPocket ? "pocket" : "surface",
        phase: Math.random() * Math.PI * 2,
        color: isPocket
          ? `rgba(60, 141, 173, ${0.2 + pocketFactor * 0.3})`
          : `rgba(45, ${70 + Math.floor(Math.random() * 30)}, 71, ${0.15 + Math.random() * 0.2})`,
      });
    }
  }

  // Add inner structure nodes
  for (let i = 0; i < 60; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * baseRadius * 0.75;
    const distFromPocket = Math.abs(
      ((angle - pocketAngle + Math.PI) % (Math.PI * 2)) - Math.PI
    );
    const pocketFactor = Math.max(0, 1 - distFromPocket / pocketWidth);
    const maxDist = baseRadius - pocketFactor * pocketFactor * (3 - 2 * pocketFactor) * pocketDepth;

    if (dist < maxDist * 0.85) {
      atoms.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        radius: 1.5 + Math.random() * 3,
        type: "surface",
        phase: Math.random() * Math.PI * 2,
        color: `rgba(45, 95, 71, ${0.03 + Math.random() * 0.05})`,
      });
    }
  }

  // Pocket center
  const pocketCenterX = cx + Math.cos(pocketAngle) * (baseRadius - pocketDepth * 0.6);
  const pocketCenterY = cy + Math.sin(pocketAngle) * (baseRadius - pocketDepth * 0.6);

  return {
    atoms,
    surfacePoints,
    center: { x: cx, y: cy },
    pocketCenter: { x: pocketCenterX, y: pocketCenterY },
    baseRadius,
  };
}

function generateHelices(cx: number, cy: number, radius: number): HelixPoint[][] {
  const helices: HelixPoint[][] = [];

  const helixConfigs = [
    { startAngle: 0.2, length: 2.2, dist: radius * 0.55, amplitude: 12 },
    { startAngle: 1.8, length: 1.8, dist: radius * 0.65, amplitude: 10 },
    { startAngle: 3.5, length: 2.0, dist: radius * 0.50, amplitude: 14 },
    { startAngle: 4.8, length: 1.5, dist: radius * 0.70, amplitude: 9 },
  ];

  for (const config of helixConfigs) {
    const points: HelixPoint[] = [];
    const steps = 40;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const angle = config.startAngle + t * config.length;
      const baseX = cx + Math.cos(angle) * config.dist;
      const baseY = cy + Math.sin(angle) * config.dist;
      const z = Math.sin(t * Math.PI * 6) * config.amplitude;

      points.push({
        x: baseX + z * Math.cos(angle + Math.PI / 2) * 0.3,
        y: baseY + z * Math.sin(angle + Math.PI / 2) * 0.3,
        z,
        phase: t * Math.PI * 6,
      });
    }
    helices.push(points);
  }

  return helices;
}

function createDrugLigand(startX: number, startY: number, targetX: number, targetY: number): Ligand {
  const templates = [
    // Benzene-like ring with side chains
    {
      atoms: [
        { x: 0, y: -15, r: 4.5, el: "C" },
        { x: 13, y: -7.5, r: 4.5, el: "C" },
        { x: 13, y: 7.5, r: 4.5, el: "C" },
        { x: 0, y: 15, r: 4.5, el: "N" },
        { x: -13, y: 7.5, r: 4.5, el: "C" },
        { x: -13, y: -7.5, r: 4.5, el: "C" },
        { x: 0, y: -28, r: 3.5, el: "O" },
        { x: 26, y: -15, r: 3.5, el: "S" },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 1, to: 7, order: 1 },
      ],
    },
    // Indole-like fused rings (plant alkaloid)
    {
      atoms: [
        { x: -12, y: -10, r: 4, el: "C" },
        { x: 0, y: -16, r: 4, el: "C" },
        { x: 12, y: -10, r: 4, el: "N" },
        { x: 12, y: 4, r: 4, el: "C" },
        { x: 0, y: 10, r: 4, el: "C" },
        { x: -12, y: 4, r: 4, el: "C" },
        { x: 20, y: -18, r: 4, el: "C" },
        { x: 28, y: -8, r: 4, el: "C" },
        { x: 24, y: 6, r: 4, el: "C" },
        { x: -20, y: -18, r: 3.5, el: "O" },
        { x: 0, y: 24, r: 3.5, el: "O" },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 2 },
        { from: 4, to: 5, order: 1 },
        { from: 5, to: 0, order: 1 },
        { from: 2, to: 6, order: 1 },
        { from: 6, to: 7, order: 2 },
        { from: 7, to: 8, order: 1 },
        { from: 8, to: 3, order: 1 },
        { from: 0, to: 9, order: 1 },
        { from: 4, to: 10, order: 1 },
      ],
    },
    // Steroid-like multi-ring
    {
      atoms: [
        { x: -18, y: -8, r: 4, el: "C" },
        { x: -8, y: -16, r: 4, el: "C" },
        { x: 4, y: -12, r: 4, el: "C" },
        { x: 4, y: 0, r: 4, el: "C" },
        { x: -8, y: 4, r: 4, el: "C" },
        { x: 16, y: -16, r: 4, el: "C" },
        { x: 24, y: -8, r: 4, el: "N" },
        { x: 18, y: 2, r: 4, el: "C" },
        { x: -18, y: 8, r: 3.5, el: "O" },
        { x: 32, y: -12, r: 3.5, el: "S" },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 2 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 0, order: 2 },
        { from: 2, to: 5, order: 1 },
        { from: 5, to: 6, order: 2 },
        { from: 6, to: 7, order: 1 },
        { from: 7, to: 3, order: 1 },
        { from: 0, to: 8, order: 1 },
        { from: 6, to: 9, order: 1 },
      ],
    },
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];

  const atoms: LigandAtom[] = template.atoms.map((a) => ({
    x: a.x,
    y: a.y,
    radius: a.r,
    color: ELEMENT_COLORS[a.el] || ELEMENT_COLORS.C,
    element: a.el,
    phase: Math.random() * Math.PI * 2,
  }));

  return {
    atoms,
    bonds: template.bonds,
    cx: startX,
    cy: startY,
    targetX,
    targetY,
    docked: false,
    dockedTime: 0,
    opacity: 0,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.006,
    scale: 1.0 + Math.random() * 0.4,
    trail: [],
  };
}

function spawnLigand(w: number, h: number, pocket: Vec2): Ligand {
  const side = Math.floor(Math.random() * 4);
  let sx: number, sy: number;
  const margin = 60;

  switch (side) {
    case 0: sx = Math.random() * w; sy = -margin; break;
    case 1: sx = w + margin; sy = Math.random() * h; break;
    case 2: sx = Math.random() * w; sy = h + margin; break;
    default: sx = -margin; sy = Math.random() * h; break;
  }

  const offset = 20;
  return createDrugLigand(
    sx, sy,
    pocket.x + (Math.random() - 0.5) * offset,
    pocket.y + (Math.random() - 0.5) * offset
  );
}

const ReceptorDocking = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    let receptor: ReturnType<typeof generateReceptor>;
    let helices: HelixPoint[][];
    let ligands: Ligand[] = [];
    let time = 0;

    const particles: Array<Vec2 & { vx: number; vy: number; r: number; alpha: number; phase: number }> = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      receptor = generateReceptor(w, h);
      helices = generateHelices(receptor.center.x, receptor.center.y, receptor.baseRadius);
      ligands = [];

      particles.length = 0;
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: 1 + Math.random() * 2.5,
          alpha: 0.03 + Math.random() * 0.07,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const drawReceptor = (t: number) => {
      const { surfacePoints, center, pocketCenter, baseRadius, atoms } = receptor;

      // Outer ambient glow
      const outerGlow = ctx.createRadialGradient(
        center.x, center.y, baseRadius * 0.3,
        center.x, center.y, baseRadius * 1.4
      );
      outerGlow.addColorStop(0, "rgba(45, 95, 71, 0.04)");
      outerGlow.addColorStop(0.6, "rgba(45, 95, 71, 0.02)");
      outerGlow.addColorStop(1, "rgba(45, 95, 71, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(center.x, center.y, baseRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Surface fill
      if (surfacePoints.length > 2) {
        ctx.beginPath();
        ctx.moveTo(surfacePoints[0].x, surfacePoints[0].y);
        for (let i = 1; i < surfacePoints.length; i++) {
          const prev = surfacePoints[i - 1];
          const curr = surfacePoints[i];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
        }
        ctx.closePath();

        const surfGrad = ctx.createRadialGradient(
          center.x, center.y, 0,
          center.x, center.y, baseRadius
        );
        surfGrad.addColorStop(0, "rgba(45, 95, 71, 0.06)");
        surfGrad.addColorStop(0.7, "rgba(45, 95, 71, 0.10)");
        surfGrad.addColorStop(1, "rgba(45, 95, 71, 0.14)");
        ctx.fillStyle = surfGrad;
        ctx.fill();

        ctx.strokeStyle = COLORS.receptorStroke;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Pocket glow with pulsing
      const pulseA = 0.18 + Math.sin(t * 0.0008) * 0.08;
      const pulseB = 0.30 + Math.sin(t * 0.0008) * 0.10;
      const pGlow = ctx.createRadialGradient(
        pocketCenter.x, pocketCenter.y, 2,
        pocketCenter.x, pocketCenter.y, baseRadius * 0.38
      );
      pGlow.addColorStop(0, `rgba(60, 141, 173, ${pulseB})`);
      pGlow.addColorStop(0.4, `rgba(60, 141, 173, ${pulseA})`);
      pGlow.addColorStop(1, "rgba(60, 141, 173, 0)");
      ctx.fillStyle = pGlow;
      ctx.beginPath();
      ctx.arc(pocketCenter.x, pocketCenter.y, baseRadius * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Draw secondary pocket ring
      ctx.beginPath();
      ctx.arc(pocketCenter.x, pocketCenter.y, baseRadius * 0.22, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(60, 141, 173, ${0.12 + Math.sin(t * 0.001) * 0.06})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw atoms with breathing
      for (const atom of atoms) {
        const breathe = 1 + Math.sin(t * 0.0015 + atom.phase) * 0.18;
        const r = atom.radius * breathe;

        if (atom.type === "pocket") {
          ctx.shadowColor = "rgba(60, 141, 173, 0.35)";
          ctx.shadowBlur = 10;
        }

        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      // Connection web between nearby surface atoms
      const surfaceAtoms = atoms.filter((a) => a.type === "surface" || a.type === "pocket");
      ctx.strokeStyle = "rgba(45, 95, 71, 0.06)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < surfaceAtoms.length; i++) {
        for (let j = i + 1; j < surfaceAtoms.length; j++) {
          const dx = surfaceAtoms[i].x - surfaceAtoms[j].x;
          const dy = surfaceAtoms[i].y - surfaceAtoms[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < baseRadius * 0.25) {
            ctx.beginPath();
            ctx.moveTo(surfaceAtoms[i].x, surfaceAtoms[i].y);
            ctx.lineTo(surfaceAtoms[j].x, surfaceAtoms[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawHelices = (t: number) => {
      const colors = [COLORS.helixA, COLORS.helixB, COLORS.helixA, COLORS.helixB];

      for (let hi = 0; hi < helices.length; hi++) {
        const helix = helices[hi];
        const color = colors[hi % colors.length];

        // Draw ribbon
        ctx.beginPath();
        for (let i = 0; i < helix.length; i++) {
          const p = helix[i];
          const wave = Math.sin(t * 0.001 + p.phase) * 3;
          const px = p.x + wave * 0.3;
          const py = p.y + wave * 0.3;

          if (i === 0) ctx.moveTo(px, py);
          else {
            const prev = helix[i - 1];
            const prevWave = Math.sin(t * 0.001 + prev.phase) * 3;
            ctx.quadraticCurveTo(
              prev.x + prevWave * 0.3,
              prev.y + prevWave * 0.3,
              (px + prev.x + prevWave * 0.3) / 2,
              (py + prev.y + prevWave * 0.3) / 2
            );
          }
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw helix nodes at peaks
        for (let i = 0; i < helix.length; i += 4) {
          const p = helix[i];
          const wave = Math.sin(t * 0.001 + p.phase) * 3;
          const size = 2 + (p.z + 15) / 30 * 3;
          ctx.beginPath();
          ctx.arc(p.x + wave * 0.3, p.y + wave * 0.3, size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    };

    const drawLigand = (lig: Ligand, t: number) => {
      // Draw trail
      if (lig.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(lig.trail[0].x, lig.trail[0].y);
        for (let i = 1; i < lig.trail.length; i++) {
          ctx.lineTo(lig.trail[i].x, lig.trail[i].y);
        }
        ctx.strokeStyle = COLORS.trail;
        ctx.lineWidth = 1;
        ctx.globalAlpha = lig.opacity * 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.save();
      ctx.translate(lig.cx, lig.cy);
      ctx.rotate(lig.rotation);
      ctx.scale(lig.scale, lig.scale);
      ctx.globalAlpha = lig.opacity;

      // Draw bonds
      for (const bond of lig.bonds) {
        const a1 = lig.atoms[bond.from];
        const a2 = lig.atoms[bond.to];
        const bondColor = lig.docked ? COLORS.bondDocked : COLORS.bond;

        if (bond.order === 2) {
          const dx = a2.x - a1.x;
          const dy = a2.y - a1.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = -dy / len * 2;
          const ny = dx / len * 2;

          ctx.beginPath();
          ctx.moveTo(a1.x + nx, a1.y + ny);
          ctx.lineTo(a2.x + nx, a2.y + ny);
          ctx.strokeStyle = bondColor;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(a1.x - nx, a1.y - ny);
          ctx.lineTo(a2.x - nx, a2.y - ny);
          ctx.strokeStyle = bondColor;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.strokeStyle = bondColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Draw atoms
      for (const atom of lig.atoms) {
        const breathe = 1 + Math.sin(t * 0.003 + atom.phase) * 0.12;
        const r = atom.radius * breathe;

        // Atom glow when docked
        if (lig.docked) {
          ctx.shadowColor = "rgba(60, 141, 173, 0.5)";
          ctx.shadowBlur = 10;
        }

        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r, 0, Math.PI * 2);
        ctx.fillStyle = atom.color;
        ctx.fill();

        // Highlight ring
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fill();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    };

    const updateLigands = (t: number) => {
      // Spawn ligands
      if (ligands.length < 5 && Math.random() < 0.012) {
        ligands.push(spawnLigand(w, h, receptor.pocketCenter));
      }

      for (let i = ligands.length - 1; i >= 0; i--) {
        const lig = ligands[i];

        // Fade in
        if (lig.opacity < 1 && !lig.docked) {
          lig.opacity = Math.min(1, lig.opacity + 0.012);
        }

        lig.rotation += lig.rotationSpeed;

        if (!lig.docked) {
          const dx = lig.targetX - lig.cx;
          const dy = lig.targetY - lig.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Trail
          if (lig.trail.length > 60) lig.trail.shift();
          lig.trail.push({ x: lig.cx, y: lig.cy });

          if (dist > 8) {
            // Approach speed increases as ligand gets closer (attraction)
            const attraction = dist < 100 ? 0.6 + (100 - dist) / 100 * 0.8 : 0.5;
            lig.cx += (dx / dist) * attraction;
            lig.cy += (dy / dist) * attraction;

            // Brownian wobble
            lig.cx += Math.sin(t * 0.002 + i * 2.1) * 0.5;
            lig.cy += Math.cos(t * 0.0018 + i * 1.7) * 0.5;

            // Slow rotation as approaching
            if (dist < 80) {
              lig.rotationSpeed *= 0.998;
            }
          } else {
            lig.docked = true;
            lig.dockedTime = t;
            lig.rotationSpeed = 0;
            lig.trail = [];
          }
        } else {
          const dt = t - lig.dockedTime;
          // Gentle breathing motion when docked
          lig.cx = lig.targetX + Math.sin(dt * 0.0008) * 1.5;
          lig.cy = lig.targetY + Math.cos(dt * 0.001) * 1.5;

          // Undock and fade out
          if (dt > 6000 + Math.random() * 5000) {
            lig.opacity -= 0.006;
            if (lig.opacity <= 0) {
              ligands.splice(i, 1);
            }
          }
        }
      }
    };

    const drawParticles = (t: number) => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = p.alpha + Math.sin(t * 0.0008 + p.phase) * 0.02;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(60, 141, 173, ${Math.max(0.01, alpha)})`;
        ctx.fill();
      }

      // Connect nearby particles
      ctx.strokeStyle = "rgba(60, 141, 173, 0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < 15000) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      time += 16;
      ctx.clearRect(0, 0, w, h);

      drawParticles(time);
      drawReceptor(time);
      drawHelices(time);
      updateLigands(time);

      for (const lig of ligands) {
        drawLigand(lig, time);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
});

ReceptorDocking.displayName = "ReceptorDocking";

export default ReceptorDocking;
