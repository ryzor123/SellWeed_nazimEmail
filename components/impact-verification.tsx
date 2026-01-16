"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, CheckCircle2, MapPin, Activity } from "lucide-react"

// Animated counter hook
function useAnimatedCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart)

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// Cox's Bazar coastline map with glowing nodes
function CoastlineMap() {
  const nodes = [
    { id: 1, x: 25, y: 20, label: "St. Martin's", active: true },
    { id: 2, x: 35, y: 35, label: "Teknaf", active: true },
    { id: 3, x: 45, y: 50, label: "Cox's Bazar", active: true },
    { id: 4, x: 55, y: 65, label: "Moheshkhali", active: true },
    { id: 5, x: 65, y: 78, label: "Kutubdia", active: false },
  ]

  return (
    <div className="relative w-full h-full min-h-[200px] md:min-h-[250px]">
      {/* Stylized coastline SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Ocean background */}
        <defs>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(38, 222, 129, 0.1)" />
            <stop offset="100%" stopColor="rgba(99, 91, 255, 0.1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ocean area */}
        <rect x="0" y="0" width="100" height="100" fill="url(#oceanGradient)" />

        {/* Coastline path */}
        <path
          d="M 20 10 Q 30 25, 35 40 Q 40 55, 50 65 Q 60 75, 70 85 Q 75 90, 80 95"
          fill="none"
          stroke="rgba(38, 222, 129, 0.4)"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Land mass hint */}
        <path
          d="M 20 10 Q 30 25, 35 40 Q 40 55, 50 65 Q 60 75, 70 85 Q 75 90, 80 95 L 100 95 L 100 0 L 20 0 Z"
          fill="rgba(30, 45, 69, 0.3)"
        />

        {/* Connection lines between nodes */}
        {nodes.slice(0, -1).map((node, i) => (
          <line
            key={`line-${node.id}`}
            x1={node.x}
            y1={node.y}
            x2={nodes[i + 1].x}
            y2={nodes[i + 1].y}
            stroke="rgba(38, 222, 129, 0.3)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        ))}

        {/* Glowing nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            {/* Outer glow ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="none"
              stroke={node.active ? "#26DE81" : "#8B9CB6"}
              strokeWidth="1"
              opacity="0.5"
              className={node.active ? "node-glow" : ""}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            {/* Inner dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r="2"
              fill={node.active ? "#26DE81" : "#8B9CB6"}
              filter={node.active ? "url(#glow)" : ""}
            />
          </g>
        ))}
      </svg>

      {/* Node labels - positioned absolutely */}
      <div className="absolute inset-0 pointer-events-none">
        {nodes.map((node) => (
          <div
            key={`label-${node.id}`}
            className="absolute text-[8px] sm:text-[10px] font-medium whitespace-nowrap"
            style={{
              left: `${node.x + 5}%`,
              top: `${node.y - 2}%`,
              color: node.active ? "#26DE81" : "#8B9CB6",
            }}
          >
            {node.label}
            {node.active && <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#26DE81] pulse-live" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ImpactVerification() {
  const carbonCounter = useAnimatedCounter(8547, 2500)
  const auditCounter = useAnimatedCounter(1284, 2000)

  return (
    <section className="relative py-12 sm:py-16 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-[#26DE81] mb-3 sm:mb-4">
            <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
            Truth Layer
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1FAEE] mb-3 sm:mb-4 text-balance">
            Impact & Verification
          </h2>
          <p className="mx-auto max-w-2xl text-[#8B9CB6] text-sm sm:text-base px-2">
            Real-time metrics verified by student auditors across the Cox{"'"}s Bazar coastline.
          </p>
        </motion.div>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Carbon Counter Card */}
          <motion.div
            ref={carbonCounter.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#26DE81]/20 flex items-center justify-center mb-4 glow-teal">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-[#26DE81]" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26DE81] text-glow-green mb-2 tabular-nums">
              {carbonCounter.count.toLocaleString()}
            </div>
            <div className="text-sm sm:text-base text-[#8B9CB6] font-medium">Tons of Carbon Sequestrated</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#26DE81]">
              <span className="w-2 h-2 rounded-full bg-[#26DE81] pulse-live" />
              Live tracking
            </div>
          </motion.div>

          {/* Verified Audits Card */}
          <motion.div
            ref={auditCounter.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#635BFF]/20 flex items-center justify-center mb-4 glow-blue">
              <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-[#635BFF]" />
            </div>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#635BFF] text-glow-blue mb-2 tabular-nums">
              {auditCounter.count.toLocaleString()}
            </div>
            <div className="text-sm sm:text-base text-[#8B9CB6] font-medium">Verified Student Audits</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#635BFF]">
              <span className="w-2 h-2 rounded-full bg-[#635BFF] pulse-live" />
              Blockchain verified
            </div>
          </motion.div>

          {/* Coastline Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#E9C46A]" />
              <span className="text-sm sm:text-base font-medium text-[#F1FAEE]">Cox{"'"}s Bazar Coastline</span>
            </div>
            <CoastlineMap />
            <div className="mt-4 flex items-center justify-between text-xs text-[#8B9CB6]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#26DE81]" />4 Active Zones
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#8B9CB6]" />1 Pending
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
