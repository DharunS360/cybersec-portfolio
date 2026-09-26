import { useEffect, useRef, useState } from "react";
import { skillGraph } from "../data/skillGraph";

export default function SkillGraph({ embedded = false }) {
  const canvasRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const animRef = useRef(null);

  const dragRef = useRef({ node: null, offsetX: 0, offsetY: 0 });
  const viewRef = useRef({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const FRAME_INTERVAL = isMobile ? 80 : 33;
    let lastFrame = 0;
    let width = 0;
    let height = 500;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", handleResize);

    const centerX = width / 2;
    const centerY = height / 2;

    nodesRef.current = skillGraph.nodes.map((n) => {
      let x, y;
      if (n.id === "me") {
        x = centerX;
        y = centerY;
      } else if (n.type === "category") {
        const cats = skillGraph.nodes.filter((p) => p.type === "category");
        const idx = cats.findIndex((p) => p.id === n.id);
        const angle = (idx * 2 * Math.PI) / cats.length - Math.PI / 4;
        x = centerX + Math.cos(angle) * 150;
        y = centerY + Math.sin(angle) * 150;
      } else {
        const cats = skillGraph.nodes.filter((p) => p.type === "category");
        const parentIdx = cats.findIndex((p) => p.id === n.parent);
        const parentAngle = (parentIdx * 2 * Math.PI) / cats.length - Math.PI / 4;
        const px = centerX + Math.cos(parentAngle) * 150;
        const py = centerY + Math.sin(parentAngle) * 150;

        const siblings = skillGraph.nodes.filter(
          (s) => s.parent === n.parent && s.type === "tool"
        );
        const sIdx = siblings.findIndex((s) => s.id === n.id);
        const count = siblings.length;
        const spread = Math.PI * 0.85;
        const toolAngle =
          parentAngle - spread / 2 + (sIdx / Math.max(1, count - 1)) * spread;
        const dist = 85;
        x = px + Math.cos(toolAngle) * dist;
        y = py + Math.sin(toolAngle) * dist;
      }
      return { ...n, x, y, vx: 0, vy: 0, fixed: n.id === "me" };
    });

    edgesRef.current = nodesRef.current
      .filter((n) => n.parent)
      .map((n) => ({
        from: nodesRef.current.find((p) => p.id === n.parent),
        to: n,
      }));

    const simulate = () => {
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      if (!nodes || !edges) return;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = (a.size + b.size) * 4.5;
          if (dist < minDist) {
            const force = (minDist - dist) / minDist;
            const fx = (dx / dist) * force * 2;
            const fy = (dy / dist) * force * 2;
            if (!a.fixed) {
              a.vx -= fx;
              a.vy -= fy;
            }
            if (!b.fixed) {
              b.vx += fx;
              b.vy += fy;
            }
          }
        }
      }

      for (const edge of edges) {
        if (!edge || !edge.from || !edge.to) continue;
        const dx = edge.to.x - edge.from.x;
        const dy = edge.to.y - edge.from.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = edge.from.type === "center" ? 160 : 95;
        const diff = dist - targetDist;
        const force = diff * 0.008;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        if (!edge.from.fixed) {
          edge.from.vx += fx;
          edge.from.vy += fy;
        }
        if (!edge.to.fixed) {
          edge.to.vx -= fx;
          edge.to.vy -= fy;
        }
      }

      for (const n of nodes) {
        if (!n || n.fixed) continue;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        const padding = 40;
        n.x = Math.max(padding, Math.min(width - padding, n.x));
        n.y = Math.max(padding, Math.min(height - padding, n.y));
      }
    };

    const draw = (time) => {
      animRef.current = requestAnimationFrame(draw);
      if (time - lastFrame < FRAME_INTERVAL) return;
      lastFrame = time;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(viewRef.current.x, viewRef.current.y);
      ctx.scale(viewRef.current.scale, viewRef.current.scale);

      for (const edge of edgesRef.current) {
        if (!edge) continue;
        const isHighlighted =
          selectedNode &&
          (selectedNode.id === edge.from.id || selectedNode.id === edge.to.id);
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.strokeStyle = isHighlighted
          ? edge.to.color + "cc"
          : edge.to.color + "35";
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();
      }

      for (const n of nodesRef.current) {
        if (!n) continue;
        const isSelected = selectedNode && selectedNode.id === n.id;
        const isHovered = hoveredNode && hoveredNode.id === n.id;
        const isConnected =
          selectedNode &&
          (n.parent === selectedNode.id ||
            n.id === selectedNode.parent ||
            n.id === "me");

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isSelected ? 20 : isHovered ? 15 : 8;

        ctx.fillStyle =
          isSelected || isHovered
            ? n.color
            : isConnected
            ? n.color + "cc"
            : n.color + "80";
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isSelected ? 2 : 1.5;
        ctx.stroke();

        if (n.type !== "tool" || isSelected || isHovered) {
          ctx.fillStyle = "#ffffff";
          ctx.font =
            (n.type === "center"
              ? "bold 15px"
              : n.type === "category"
              ? "bold 11px"
              : "10px") + " 'JetBrains Mono', monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor = "rgba(0,0,0,0.9)";
          ctx.shadowBlur = 4;
          ctx.fillText(n.label, n.x, n.y - n.size - 10);
          ctx.shadowBlur = 0;
        }
      }

      ctx.restore();
    };

    animRef.current = requestAnimationFrame(draw);

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left - viewRef.current.x) / viewRef.current.scale;
      const my = (e.clientY - rect.top - viewRef.current.y) / viewRef.current.scale;
      return { mx, my };
    };

    const findNodeAt = (mx, my) => {
      for (let i = nodesRef.current.length - 1; i >= 0; i--) {
        const n = nodesRef.current[i];
        if (!n) continue;
        const dx = mx - n.x;
        const dy = my - n.y;
        if (dx * dx + dy * dy <= (n.size + 6) * (n.size + 6)) return n;
      }
      return null;
    };

    const onMouseDown = (e) => {
      const { mx, my } = getMousePos(e);
      const node = findNodeAt(mx, my);
      if (node) {
        dragRef.current.node = node;
        dragRef.current.offsetX = node.x - mx;
        dragRef.current.offsetY = node.y - my;
      }
    };

    const onMouseMove = (e) => {
      const { mx, my } = getMousePos(e);
      if (dragRef.current.node) {
        const n = dragRef.current.node;
        n.x = mx + dragRef.current.offsetX;
        n.y = my + dragRef.current.offsetY;
        n.vx = 0;
        n.vy = 0;
      } else {
        const node = findNodeAt(mx, my);
        setHoveredNode(node);
        canvas.style.cursor = node ? "grab" : "default";
      }
    };

    const onMouseUp = () => {
      dragRef.current.node = null;
    };

    const onClick = (e) => {
      const { mx, my } = getMousePos(e);
      setSelectedNode(findNodeAt(mx, my) || null);
    };

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      viewRef.current.scale = Math.max(0.5, Math.min(1.8, viewRef.current.scale + delta));
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  const content = (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass rounded-xl overflow-hidden border border-accent-blue/20 relative">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ background: "rgba(0,0,0,0.3)" }}
        />
        <div className="absolute top-3 left-3 text-[10px] font-mono text-accent-blue">
          ◉ BLUE TEAM MATRIX v3.0
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-500">
          NODES: {skillGraph.nodes.length}
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-gray-500">
          DRAG · CLICK · SCROLL
        </div>
      </div>

      <div className="glass rounded-xl p-5 border border-accent-blue/20 flex flex-col">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-accent-blue/10">
          <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          <span className="text-xs font-mono text-accent-blue tracking-widest">
            NODE INFO
          </span>
        </div>

        {selectedNode ? (
          <div>
            <div className="text-2xl font-bold text-white mb-1">
              {selectedNode.label}
            </div>
            <div
              className="text-xs font-mono mb-4"
              style={{ color: selectedNode.color }}
            >
              {selectedNode.type.toUpperCase()}
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                <span>PROFICIENCY</span>
                <span style={{ color: selectedNode.color }}>
                  {selectedNode.level}%
                </span>
              </div>
              <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: selectedNode.level + "%",
                    background: selectedNode.color,
                    boxShadow: "0 0 10px " + selectedNode.color,
                  }}
                />
              </div>
            </div>

            <div className="text-xs font-mono text-gray-400 leading-relaxed">
              <div>
                <span className="text-gray-600">Type:</span> {selectedNode.type}
              </div>
              {selectedNode.parent && (
                <div>
                  <span className="text-gray-600">Category:</span>{" "}
                  {selectedNode.parent}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-4xl text-accent-blue mb-3">◉</div>
            <div className="text-xs font-mono text-gray-500">
              Click any node to view details
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-accent-blue/10 text-[10px] font-mono text-gray-500">
          Total nodes:{" "}
          <span className="text-accent-blue">{skillGraph.nodes.length}</span>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return <div>{content}</div>;
  }

  return (
    <section id="skills-graph" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="text-accent-cyan">●</span> BLUE TEAM SKILLS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Defense <span className="text-accent-blue">Arsenal</span>
        </h2>
        <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
      </div>
      {content}
    </section>
  );
}