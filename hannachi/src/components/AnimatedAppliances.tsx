"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, RotateCw, Wind, Flame, Snowflake, Play, CheckCircle, Wrench, ArrowRight, HelpCircle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   1. CARTOON ANIMATED WASHING MACHINE (Waschmaschine)
   ═══════════════════════════════════════════════════════════ */
export function AnimatedWasher({
  interactive = true,
  size = "md",
  className = "",
}: {
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [isSpinningFast, setIsSpinningFast] = useState(false);
  const [bubbles, setBubbles] = useState([
    { id: 1, x: 20, y: 40, size: 10, delay: 0 },
    { id: 2, x: 70, y: 30, size: 14, delay: 0.8 },
    { id: 3, x: 35, y: 15, size: 8, delay: 1.4 },
    { id: 4, x: 80, y: 55, size: 12, delay: 2.1 },
  ]);

  const scale = size === "sm" ? 0.65 : size === "lg" ? 1.25 : 1;
  const spinSpeed = isSpinningFast ? 0.6 : 3.5;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
    >
      {/* Floating cartoon bubbles */}
      <div className="pointer-events-none absolute -top-12 inset-x-0 h-24 overflow-visible">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: 20, opacity: 0, scale: 0.5 }}
            animate={{
              y: [-10, -50],
              x: [0, (b.id % 2 === 0 ? 12 : -12)],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeOut",
            }}
            style={{ left: `${b.x}%`, width: b.size, height: b.size }}
            className="absolute rounded-full border border-sky-300/80 bg-gradient-to-tr from-sky-400/40 to-white/80 shadow-[0_0_8px_rgba(56,189,248,0.5)] backdrop-blur-[1px]"
          >
            <span className="absolute top-1 left-1 h-1 w-1 rounded-full bg-white opacity-90" />
          </motion.div>
        ))}
      </div>

      {/* Main Machine Body with Shake/Vibration Animation */}
      <motion.div
        animate={
          isSpinningFast
            ? {
                x: [-2, 2, -1.5, 1.5, -0.5, 0.5, 0],
                y: [0, -1.5, 0, -1, 0],
              }
            : {
                y: [0, -2, 0],
              }
        }
        transition={{
          duration: isSpinningFast ? 0.15 : 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => interactive && setIsSpinningFast(!isSpinningFast)}
        className={`group relative cursor-pointer ${interactive ? "hover:scale-[1.02]" : ""} transition-transform duration-300`}
      >
        <svg
          width="240"
          height="280"
          viewBox="0 0 240 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="wm_body" x1="0" y1="0" x2="240" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.6" stopColor="#F1F5F9" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="wm_rim" x1="50" y1="90" x2="190" y2="230" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94A3B8" />
              <stop offset="0.5" stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#64748B" />
            </linearGradient>
            <linearGradient id="wm_drum_bg" x1="70" y1="110" x2="170" y2="210" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="0.7" stopColor="#1E293B" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="wm_water" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="1" stopColor="#0284C7" stopOpacity="0.95" />
            </linearGradient>
            <clipPath id="drum_clip">
              <circle cx="120" cy="165" r="54" />
            </clipPath>
          </defs>

          {/* Machine Outer Box */}
          <rect x="15" y="15" width="210" height="250" rx="28" fill="url(#wm_body)" stroke="#CBD5E1" strokeWidth="3" />
          {/* Subtle glossy top highlight */}
          <path d="M25 35 Q120 20 215 35" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" />

          {/* Machine Top Panel (Control Area) */}
          <rect x="25" y="25" width="190" height="55" rx="14" fill="#0F172A" />

          {/* Detergent Drawer */}
          <g>
            <rect x="35" y="35" width="46" height="34" rx="7" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <rect x="42" y="47" width="32" height="6" rx="3" fill="#0EA5E9" />
            <circle cx="70" cy="40" r="2" fill="#38BDF8" />
          </g>

          {/* Center Selector Knob */}
          <g transform="translate(108, 52)">
            <circle cx="0" cy="0" r="16" fill="#334155" stroke="#64748B" strokeWidth="2" />
            <circle cx="0" cy="0" r="11" fill="#1E293B" />
            {/* Indicator notch */}
            <motion.line
              x1="0"
              y1="-4"
              x2="0"
              y2="-10"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ rotate: [0, 45, 90, 180, 270, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </g>

          {/* Digital LED Display */}
          <g>
            <rect x="142" y="35" width="62" height="34" rx="7" fill="#020617" stroke="#0284C7" strokeWidth="1.5" />
            {/* LED text / timer */}
            <text x="173" y="52" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              {isSpinningFast ? "1400" : "42:00"}
            </text>
            <text x="173" y="63" fill="#0EA5E9" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              {isSpinningFast ? "SPIN" : "WASCH"}
            </text>
            {/* Blinking green status LED */}
            <circle cx="197" cy="41" r="2.5" fill="#22C55E">
              <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Divider line */}
          <line x1="20" y1="88" x2="220" y2="88" stroke="#E2E8F0" strokeWidth="2" />

          {/* Outer Chrome Door Bezel */}
          <circle cx="120" cy="165" r="70" fill="url(#wm_rim)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))" />
          <circle cx="120" cy="165" r="62" fill="#334155" />
          <circle cx="120" cy="165" r="58" fill="url(#wm_drum_bg)" />

          {/* Drum & Rotating Contents (clipped) */}
          <g clipPath="url(#drum_clip)">
            {/* Swirling Water */}
            <motion.path
              d="M50 170 Q85 155 120 170 T190 170 L190 230 L50 230 Z"
              fill="url(#wm_water)"
              animate={{
                d: [
                  "M50 170 Q85 155 120 170 T190 170 L190 230 L50 230 Z",
                  "M50 165 Q85 180 120 165 T190 165 L190 230 L50 230 Z",
                  "M50 170 Q85 155 120 170 T190 170 L190 230 L50 230 Z",
                ],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rotating Drum Hub with Clothes & Baffles */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{
                duration: spinSpeed,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ originX: "120px", originY: "165px" }}
            >
              {/* Drum perforations */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const cx = 120 + Math.cos(rad) * 38;
                const cy = 165 + Math.sin(rad) * 38;
                return <circle key={i} cx={cx} cy={cy} r="3" fill="#64748B" opacity="0.6" />;
              })}

              {/* Drum Baffles / Fins */}
              <rect x="117" y="115" width="6" height="22" rx="3" fill="#94A3B8" />
              <rect x="117" y="175" width="6" height="22" rx="3" fill="#94A3B8" />
              <rect x="75" y="162" width="22" height="6" rx="3" fill="#94A3B8" />
              <rect x="143" y="162" width="22" height="6" rx="3" fill="#94A3B8" />

              {/* Cartoon Tumbling Clothes */}
              {/* Cute Red T-Shirt */}
              <g transform="translate(100, 142) rotate(25)">
                <path
                  d="M10 5 L18 0 L26 5 L22 10 L20 8 L20 22 L8 22 L8 8 L6 10 Z"
                  fill="#EF4444"
                  stroke="#B91C1C"
                  strokeWidth="1"
                />
              </g>

              {/* Cute Blue Sock */}
              <g transform="translate(125, 160) rotate(-40)">
                <path d="M4 0 L12 0 L12 12 L18 16 L14 20 L6 14 L6 0 Z" fill="#3B82F6" />
                <line x1="5" y1="4" x2="11" y2="4" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>

              {/* Cute Yellow Towel */}
              <g transform="translate(105, 175) rotate(70)">
                <rect x="0" y="0" width="18" height="10" rx="3" fill="#FBBF24" />
              </g>
            </motion.g>

            {/* Soap Suds / Froth in drum */}
            <circle cx="95" cy="165" r="7" fill="white" opacity="0.8" />
            <circle cx="108" cy="170" r="9" fill="white" opacity="0.85" />
            <circle cx="135" cy="168" r="8" fill="white" opacity="0.8" />
            <circle cx="148" cy="163" r="6" fill="white" opacity="0.75" />
          </g>

          {/* Glass Door Sheen / Reflection */}
          <path
            d="M80 125 A 54 54 0 0 1 160 125 Q 120 150 80 125 Z"
            fill="white"
            fillOpacity="0.25"
            className="pointer-events-none"
          />

          {/* Door Handle */}
          <rect x="178" y="152" width="8" height="26" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Bottom Kickplate & Filter flap */}
          <rect x="25" y="240" width="190" height="15" rx="4" fill="#E2E8F0" />
          <circle cx="190" cy="247.5" r="4.5" fill="#94A3B8" />

          {/* Machine Feet */}
          <rect x="35" y="265" width="24" height="6" rx="2" fill="#334155" />
          <rect x="181" y="265" width="24" height="6" rx="2" fill="#334155" />
        </svg>

        {/* Playful Floating Tool/Wrench Badge */}
        <motion.div
          animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent to-sky-400 text-white shadow-lg shadow-accent/40 ring-2 ring-white"
        >
          <Zap size={18} className="fill-current" />
        </motion.div>
      </motion.div>

      {/* Interactive Click Tip */}
      {interactive && (
        <button
          onClick={() => setIsSpinningFast(!isSpinningFast)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-white/90 px-3.5 py-1 text-[11px] font-bold text-accent shadow-sm backdrop-blur transition-all hover:bg-accent hover:text-white"
        >
          <RotateCw size={12} className={isSpinningFast ? "animate-spin" : ""} />
          {isSpinningFast ? "Turbo-Schleudern aktiv! (Klick zum Stoppen)" : "Klick mich: Schleudergang testen"}
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. CARTOON ANIMATED DISHWASHER (Geschirrspüler)
   ═══════════════════════════════════════════════════════════ */
export function AnimatedDishwasher({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [isActive, setIsActive] = useState(true);
  const scale = size === "sm" ? 0.65 : size === "lg" ? 1.25 : 1;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="group relative cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <svg
          width="240"
          height="280"
          viewBox="0 0 240 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Main Body */}
          <rect x="15" y="15" width="210" height="250" rx="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />

          {/* Top Control Bar */}
          <rect x="25" y="25" width="190" height="42" rx="10" fill="#0F172A" />
          {/* Status LEDs */}
          <circle cx="45" cy="46" r="3" fill="#22C55E" />
          <circle cx="57" cy="46" r="3" fill="#38BDF8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Digital Timer */}
          <rect x="80" y="34" width="55" height="24" rx="5" fill="#020617" stroke="#0284C7" strokeWidth="1" />
          <text x="107" y="50" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            0:45
          </text>
          {/* Program buttons */}
          <circle cx="160" cy="46" r="5" fill="#334155" />
          <circle cx="178" cy="46" r="5" fill="#334155" />
          <circle cx="196" cy="46" r="5" fill="#0EA5E9" />

          {/* Handle */}
          <rect x="50" y="75" width="140" height="10" rx="5" fill="#94A3B8" />

          {/* Glass / See-Through Washing Chamber */}
          <rect x="30" y="94" width="180" height="150" rx="14" fill="#0F172A" stroke="#334155" strokeWidth="2" />

          {/* Water spray jets */}
          {isActive && (
            <g>
              {/* Rotating spray arm */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                style={{ originX: "120px", originY: "170px" }}
              >
                <rect x="75" y="167" width="90" height="6" rx="3" fill="#0284C7" />
                <circle cx="120" cy="170" r="6" fill="#38BDF8" />
                {/* Water droplet bursts */}
                <circle cx="85" cy="162" r="2.5" fill="#38BDF8" />
                <circle cx="155" cy="178" r="2.5" fill="#38BDF8" />
              </motion.g>

              {/* Water Splash particles */}
              {[
                { cx: 70, cy: 130, r: 3, dur: "0.8s" },
                { cx: 160, cy: 125, r: 3.5, dur: "1s" },
                { cx: 110, cy: 110, r: 2.5, dur: "0.7s" },
                { cx: 140, cy: 140, r: 4, dur: "1.2s" },
                { cx: 90, cy: 195, r: 3, dur: "0.9s" },
              ].map((p, i) => (
                <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#7DD3FC" opacity="0.8">
                  <animate attributeName="cy" values={`${p.cy};${p.cy - 12};${p.cy}`} dur={p.dur} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0.9;0.2" dur={p.dur} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}

          {/* Top Rack & Clean Dishes */}
          <line x1="40" y1="125" x2="200" y2="125" stroke="#64748B" strokeWidth="2" />
          {/* Shiny Glasses & Cups */}
          <rect x="55" y="105" width="16" height="20" rx="3" fill="#BAE6FD" opacity="0.8" />
          <rect x="80" y="108" width="16" height="17" rx="3" fill="#BAE6FD" opacity="0.8" />
          <rect x="145" y="105" width="16" height="20" rx="3" fill="#BAE6FD" opacity="0.8" />
          <rect x="170" y="108" width="16" height="17" rx="3" fill="#BAE6FD" opacity="0.8" />

          {/* Bottom Rack & Plates */}
          <line x1="40" y1="210" x2="200" y2="210" stroke="#64748B" strokeWidth="2" />
          {/* Ceramic Plates */}
          {[60, 80, 100, 140, 160].map((x, i) => (
            <ellipse key={i} cx={x} cy="195" rx="7" ry="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          ))}

          {/* Sparkles on clean dishes */}
          <motion.g
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            transform="translate(68, 102)"
          >
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#FDE047" />
          </motion.g>
          <motion.g
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, delay: 1, repeat: Infinity, repeatDelay: 0.8 }}
            transform="translate(155, 185)"
          >
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#38BDF8" />
          </motion.g>

          {/* Machine Feet */}
          <rect x="35" y="265" width="24" height="6" rx="2" fill="#334155" />
          <rect x="181" y="265" width="24" height="6" rx="2" fill="#334155" />
        </svg>

        {/* Badge */}
        <div className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md">
          <Sparkles size={16} />
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. CARTOON ANIMATED REFRIGERATOR (Kühlschrank)
   ═══════════════════════════════════════════════════════════ */
export function AnimatedFridge({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const scale = size === "sm" ? 0.65 : size === "lg" ? 1.25 : 1;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="group relative cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          width="240"
          height="280"
          viewBox="0 0 240 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Main Fridge Cabinet */}
          <rect x="30" y="10" width="180" height="258" rx="22" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="3" />

          {/* When Open: Interior with Glowing Shelves */}
          {isOpen ? (
            <g>
              {/* Cold glowing interior */}
              <rect x="38" y="18" width="164" height="150" rx="14" fill="#0284C7" />
              <rect x="42" y="22" width="156" height="142" rx="10" fill="#E0F2FE" />

              {/* Interior light bulb */}
              <circle cx="120" cy="30" r="6" fill="#FDE047" filter="drop-shadow(0 0 6px #FDE047)" />

              {/* Shelves */}
              <line x1="45" y1="75" x2="195" y2="75" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
              <line x1="45" y1="120" x2="195" y2="120" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />

              {/* Milk bottle & orange juice */}
              <rect x="55" y="42" width="18" height="32" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
              <rect x="58" y="38" width="12" height="5" rx="1" fill="#3B82F6" />
              <rect x="80" y="46" width="18" height="28" rx="4" fill="#F97316" />

              {/* Fresh vegetables / apples */}
              <circle cx="65" cy="108" r="9" fill="#EF4444" />
              <circle cx="85" cy="110" r="8" fill="#22C55E" />
              <rect x="135" y="98" width="45" height="20" rx="5" fill="#FDE047" opacity="0.9" />

              {/* Cold mist / vapor animation */}
              <motion.path
                d="M80 60 Q120 40 160 60"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
                animate={{ y: [0, 20, 40], opacity: [0, 0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </g>
          ) : (
            /* When Closed: Sleek Front Doors */
            <g>
              {/* Upper Refrigerator Door */}
              <rect x="36" y="16" width="168" height="155" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
              {/* Upper Long Handle */}
              <rect x="48" y="65" width="7" height="60" rx="3.5" fill="#0EA5E9" />

              {/* Digital Temperature Display on Door */}
              <rect x="130" y="32" width="56" height="28" rx="6" fill="#0F172A" />
              <text x="158" y="46" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                +4°C
              </text>
              <text x="158" y="55" fill="#22C55E" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                ECO ACTIVE
              </text>
            </g>
          )}

          {/* Lower Freezer Door */}
          <rect x="36" y="178" width="168" height="84" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Freezer Handle */}
          <rect x="48" y="198" width="7" height="42" rx="3.5" fill="#0EA5E9" />
          {/* Snowflake icon badge on freezer */}
          <circle cx="160" cy="218" r="14" fill="#F0F9FF" />
          <g transform="translate(154, 212)">
            <path d="M6 0v12M0 6h12M2 2l8 8M2 10l8-8" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Feet */}
          <rect x="50" y="268" width="22" height="6" rx="2" fill="#334155" />
          <rect x="168" y="268" width="22" height="6" rx="2" fill="#334155" />
        </svg>

        {/* Badge */}
        <div className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-md">
          <Snowflake size={16} />
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. CARTOON ANIMATED OVEN (Backofen)
   ═══════════════════════════════════════════════════════════ */
export function AnimatedOven({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [isHeating, setIsHeating] = useState(true);
  const scale = size === "sm" ? 0.65 : size === "lg" ? 1.25 : 1;

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="group relative cursor-pointer"
        onClick={() => setIsHeating(!isHeating)}
      >
        <svg
          width="240"
          height="280"
          viewBox="0 0 240 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Main Body */}
          <rect x="15" y="15" width="210" height="250" rx="24" fill="#1E293B" stroke="#475569" strokeWidth="3" />

          {/* Top Control Panel */}
          <rect x="25" y="25" width="190" height="50" rx="10" fill="#0F172A" />
          {/* Knobs */}
          <circle cx="50" cy="50" r="14" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="190" cy="50" r="14" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
          {/* Digital Clock */}
          <rect x="85" y="36" width="70" height="28" rx="6" fill="#020617" stroke="#EA580C" strokeWidth="1" />
          <text x="120" y="54" fill="#FB923C" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            200°C
          </text>

          {/* Handle */}
          <rect x="40" y="86" width="160" height="12" rx="6" fill="#94A3B8" />

          {/* Large Oven Window */}
          <rect
            x="32"
            y="108"
            width="176"
            height="136"
            rx="14"
            fill={isHeating ? "#451A03" : "#0F172A"}
            stroke="#475569"
            strokeWidth="2.5"
          />

          {/* Glowing Top Heating Element */}
          {isHeating && (
            <motion.path
              d="M50 125 Q70 120 90 125 T130 125 T170 125 T190 125"
              fill="none"
              stroke="#EA580C"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Convection Fan in Background */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ originX: "120px", originY: "170px" }}
          >
            <circle cx="120" cy="170" r="6" fill="#78350F" />
            <path d="M120 152 Q126 160 120 165" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
            <path d="M120 188 Q114 180 120 175" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
            <path d="M102 170 Q110 176 115 170" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
            <path d="M138 170 Q130 164 125 170" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* Baking Tray & Fresh Cake / Bread */}
          <line x1="45" y1="195" x2="195" y2="195" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
          <rect x="75" y="180" width="90" height="15" rx="5" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          <path d="M85 180 Q120 165 155 180 Z" fill="#F59E0B" />

          {/* Rising Steam Swirls */}
          {isHeating && (
            <motion.path
              d="M105 160 Q110 145 105 135 T115 115"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ y: [0, -10, -20], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          {/* Window Glass Reflection Sheen */}
          <path
            d="M45 118 L140 118 L80 230 L45 230 Z"
            fill="white"
            fillOpacity="0.08"
            className="pointer-events-none"
          />

          {/* Feet */}
          <rect x="35" y="265" width="24" height="6" rx="2" fill="#0F172A" />
          <rect x="181" y="265" width="24" height="6" rx="2" fill="#0F172A" />
        </svg>

        {/* Badge */}
        <div className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
          <Flame size={16} />
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. INTERACTIVE APPLIANCE HUB (Geräte-Labor / Simulator)
   ═══════════════════════════════════════════════════════════ */
export function InteractiveApplianceShowcase() {
  const [activeTab, setActiveTab] = useState<"washer" | "dishwasher" | "fridge" | "oven" | "other">("washer");
  const [customDeviceText, setCustomDeviceText] = useState("");

  const tabs = [
    { id: "washer", label: "Waschmaschine", desc: "Trommel dreht nicht, pumpt nicht ab oder macht laute Geräusche?", icon: RotateCw },
    { id: "dishwasher", label: "Geschirrspüler", desc: "Geschirr wird nicht sauber, Wasser läuft aus oder Fehlercode blinkt?", icon: Sparkles },
    { id: "fridge", label: "Kühlschrank", desc: "Kühlt nicht mehr richtig, vereist ständig oder Kompressor brummt?", icon: Snowflake },
    { id: "oven", label: "Backofen", desc: "Wird nicht heiß, Ober-/Unterhitze defekt oder Scheibe beschädigt?", icon: Flame },
    { id: "other", label: "Anderes Gerät", desc: "Wäschetrockner, Induktion, Dunsthaube, Kaffeeautomat, Platine oder sonstiges Gerät?", icon: Wrench },
  ] as const;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-white via-surface to-sky-50/50 p-6 shadow-card sm:p-10">
      {/* Decorative background circle */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-primary/8 pb-6">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-200 ${
                isSelected
                  ? "bg-accent text-white shadow-md shadow-accent/25 scale-[1.02]"
                  : "bg-surface text-ink-muted hover:bg-white hover:text-primary hover:shadow-sm"
              }`}
            >
              <Icon size={16} className={isSelected && t.id !== "other" ? "animate-spin" : ""} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Main Display: Interactive Stage */}
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
        {/* Left: Big Animated Appliance or Workshop Workbench */}
        <div className="flex items-center justify-center lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center w-full"
            >
              {activeTab === "washer" && <AnimatedWasher size="lg" />}
              {activeTab === "dishwasher" && <AnimatedDishwasher size="lg" />}
              {activeTab === "fridge" && <AnimatedFridge size="lg" />}
              {activeTab === "oven" && <AnimatedOven size="lg" />}
              {activeTab === "other" && (
                <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-900 border border-white/10 text-white shadow-2xl overflow-hidden w-full max-w-sm">
                  <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-accent/25 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-blue-600/25 blur-2xl" />
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-accent to-sky-400 text-white shadow-xl shadow-accent/35 mb-4">
                    <Wrench size={36} />
                  </div>
                  <h4 className="relative z-10 text-lg font-extrabold text-white text-center">
                    Nahezu alle Fabrikate &amp; Gerätetypen
                  </h4>
                  <p className="relative z-10 text-xs text-white/70 text-center mt-1.5 leading-relaxed">
                    Wäschetrockner · Induktion · Dunsthauben · Kaffeeautomaten · Elektronikplatinen
                  </p>
                  <div className="relative z-10 mt-5 flex flex-wrap gap-1.5 justify-center">
                    {["Wäschetrockner", "Induktionsfeld", "Kaffeeautomat", "Dunstabzug", "Mikrowelle", "Platinen"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-accent-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Diagnostic Card & Explanation */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {activeTab === "other" ? "Freie Geräte-Eingabe" : "Live-Interaktives Gerät"}
          </div>

          <h3 className="mt-4 text-2xl font-extrabold text-primary sm:text-3xl">
            {activeTab === "washer" && "Waschmaschinen-Service"}
            {activeTab === "dishwasher" && "Geschirrspüler-Reparatur"}
            {activeTab === "fridge" && "Kühlschrank & Gefriergeräte"}
            {activeTab === "oven" && "Backofen & Herde"}
            {activeTab === "other" && "Anderes Haushaltsgerät reparieren"}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            {tabs.find((t) => t.id === activeTab)?.desc}
          </p>

          {/* If "other", show the interactive typing box */}
          {activeTab === "other" ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
                <label htmlFor="interactive-custom-device" className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">
                  Welches Gerät möchten Sie reparieren lassen?
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    id="interactive-custom-device"
                    type="text"
                    value={customDeviceText}
                    onChange={(e) => setCustomDeviceText(e.target.value)}
                    placeholder="z. B. Wäschetrockner, Jura Kaffeeautomat, Induktionsfeld..."
                    className="flex-1 rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
                  />
                  <Link
                    href={`/kontakt?geraet=${encodeURIComponent(customDeviceText.trim() || "Anderes Gerät")}#anfrage`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-accent-dark transition-all shrink-0"
                  >
                    Gerät anfragen <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/8 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-faint mb-2">
                  Was wir ebenfalls häufig vor Ort oder in der Werkstatt reparieren:
                </p>
                <ul className="space-y-1.5 text-xs font-semibold text-primary">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-accent" /> Wärmepumpen- &amp; Kondenstrockner (heizt nicht, stoppt)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-accent" /> Induktions- &amp; Cerankochfelder (Kochzone bleibt kalt, Fehlercode)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-accent" /> Kaffeevollautomaten (Brühgruppe klemmt, verliert Wasser, Mahlwerk)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-accent" /> Steuerungsplatinen auf Bauteilebene statt teurem Komplettaustausch
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            /* Common issues checklist for the standard 4 */
            <div className="mt-6 rounded-2xl border border-primary/8 bg-white/80 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-faint">
                Häufige Fehler, die wir vor Ort beheben:
              </p>
              <ul className="mt-3 space-y-2 text-sm font-semibold text-primary">
                {activeTab === "washer" && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Schleudert nicht oder wackelt stark
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Wasser läuft nicht ab / pumpt nicht ab
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Tür verriegelt nicht oder öffnet nicht
                    </li>
                  </>
                )}
                {activeTab === "dishwasher" && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Spült nicht sauber / Sprüharme blockiert
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Heizt nicht / Geschirr bleibt nass
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Wasserstopp / Aquastop ausgelöst
                    </li>
                  </>
                )}
                {activeTab === "fridge" && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Innenraum warm, Kompressor läuft dauernd
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Starke Vereisung an der Rückwand
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Ungewöhnliche Brumm- oder Klickgeräusche
                    </li>
                  </>
                )}
                {activeTab === "oven" && (
                  <>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Unterhitze oder Oberhitze bleibt kalt
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Umluftlüfter dreht sich nicht oder quietscht
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-accent" /> Sicherung springt beim Einschalten raus
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* Quick CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={
                activeTab === "other"
                  ? `/kontakt?geraet=${encodeURIComponent(customDeviceText.trim() || "Anderes Gerät")}#anfrage`
                  : "/kontakt#anfrage"
              }
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/25 transition-all hover:bg-accent-dark hover:-translate-y-0.5"
            >
              {activeTab === "other" && customDeviceText.trim()
                ? `„${customDeviceText.trim()}“ anfragen`
                : "Dieses Gerät reparieren lassen"}
            </Link>
            <a
              href="tel:+491703493494"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-5 py-3.5 text-sm font-bold text-primary transition-all hover:border-accent hover:text-accent"
            >
              Herrn Hannachi anrufen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. APPLIANCE GRAPHIC HELPER (For cards & service pages)
   ═══════════════════════════════════════════════════════════ */
export function ApplianceGraphic({
  slug,
  size = "md",
  className = "",
}: {
  slug: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  switch (slug) {
    case "waschmaschinen":
      return <AnimatedWasher size={size} className={className} />;
    case "geschirrspueler":
      return <AnimatedDishwasher size={size} className={className} />;
    case "kuehlschraenke":
      return <AnimatedFridge size={size} className={className} />;
    case "backoefen":
      return <AnimatedOven size={size} className={className} />;
    default:
      return <AnimatedWasher size={size} className={className} />;
  }
}

/* ═══════════════════════════════════════════════════════════
   7. FLOATING HERO WASHER MASCOT
   ═══════════════════════════════════════════════════════════ */
export function FloatingHeroMascot() {
  const [wobble, setWobble] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="relative z-20 flex flex-col items-center"
    >
      {/* Speech bubble */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mb-2 relative rounded-2xl border border-accent/30 bg-white/95 px-4 py-2 text-xs font-extrabold text-primary shadow-xl backdrop-blur-sm"
      >
        <span className="flex items-center gap-1.5 text-accent">
          <Sparkles size={14} />
          Ihr Gerät streikt?
        </span>
        <span className="block text-[11px] font-medium text-ink-muted">
          Herr Hannachi repariert es!
        </span>
        {/* Little triangle pointing down to washer */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-b border-r border-accent/30 bg-white" />
      </motion.div>

      {/* Mini Animated Washer */}
      <div
        onMouseEnter={() => setWobble(true)}
        onMouseLeave={() => setWobble(false)}
        className="cursor-pointer"
      >
        <AnimatedWasher size="sm" interactive />
      </div>
    </motion.div>
  );
}

