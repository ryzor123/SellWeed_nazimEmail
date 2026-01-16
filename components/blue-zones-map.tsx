"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Waves, Anchor, Fish, Leaf, X, ChevronRight } from "lucide-react"

// Location data for the Blue Zones
const locations = [
  {
    id: "st-martins",
    name: "Saint Martin's Island",
    subtitle: "The Quality Hub",
    position: { x: 88, y: 92 }, // Percentage positioning
    species: ["Red Seaweed (Gracilaria)", "Sargassum", "Hypnea musciformis"],
    method: "Long-line cultivation with bamboo stakes in high-salinity waters",
    economicImpact:
      "Premium export market for agar-agar and carrageenan. Generates 40% of total revenue due to superior quality.",
    icon: Fish,
    color: "#26de81",
    highlight: "High Salinity • Premium Quality",
  },
  {
    id: "inani",
    name: "Inani Beach",
    subtitle: "The Commercial Zone",
    position: { x: 72, y: 55 },
    species: ["Hypnea", "Ulva (Sea Lettuce)", "Caulerpa"],
    method: "Mixed substrate farming on sandy-rocky bottom with floating rafts",
    economicImpact:
      "Bulk production hub supplying domestic food & cosmetic industries. Key driver of volume-based contracts.",
    icon: Anchor,
    color: "#635bff",
    highlight: "Sandy-Rocky Bottom • High Volume",
  },
  {
    id: "rezu-khal",
    name: "Rezu Khal",
    subtitle: "The Nutrient Estuary",
    position: { x: 58, y: 38 },
    species: ["Enteromorpha", "Gracilaria", "Mixed Green Algae"],
    method: "Estuarine cage farming utilizing nutrient-rich freshwater mixing",
    economicImpact: "Fastest growth rates in the region. Experimental zone for new species development and R&D.",
    icon: Waves,
    color: "#22d3ee",
    highlight: "Mixed Water • High-Speed Growth",
  },
  {
    id: "moheshkhali",
    name: "Moheshkhali",
    subtitle: "The Protected Lagoon",
    position: { x: 42, y: 22 },
    species: ["Gracilaria verrucosa", "Hypnea", "Kappaphycus"],
    method: "Floating raft cultivation in calm, protected lagoon waters",
    economicImpact:
      "Year-round production due to protected environment. Training hub for new farmers entering the industry.",
    icon: Leaf,
    color: "#e9c46a",
    highlight: "Calm Waters • Year-Round Production",
  },
]

export function BlueZonesMap() {
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[0] | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-[#26de81]/10 text-[#26de81] rounded-full border border-[#26de81]/20 mb-4">
            Discovery Zones
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-balance">
            Blue Zones of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26de81] to-[#22d3ee]">
              Cox's Bazar
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">
            Explore the strategic cultivation zones powering Bangladesh's 2026 Blue Economy initiative
          </p>
        </motion.div>

        {/* Main Content - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-3/5 aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A192F] border border-white/10 backdrop-blur-xl"
          >
            {/* Stylized Map Background */}
            <div className="absolute inset-0">
              {/* Water gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#0d2847] to-[#0A192F]" />

              {/* Animated water ripples */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern id="water-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 10 Q5 5, 10 10 T20 10" stroke="#26de81" strokeWidth="0.3" fill="none" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#water-pattern)" />
              </svg>

              {/* Coastline SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Bangladesh mainland silhouette */}
                <path
                  d="M0 0 L35 0 L40 15 L38 25 L42 35 L40 45 L45 55 L42 65 L48 75 L45 85 L50 95 L55 100 L0 100 Z"
                  fill="#1a3a52"
                  stroke="#26de81"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
                {/* Cox's Bazar coastline detail */}
                <path
                  d="M42 35 Q55 40, 50 50 Q58 55, 52 65 Q60 72, 55 80 Q65 88, 60 95"
                  stroke="#26de81"
                  strokeWidth="0.8"
                  fill="none"
                  strokeDasharray="2,1"
                  className="animate-pulse"
                />
                {/* St. Martin's Island */}
                <ellipse cx="85" cy="90" rx="6" ry="4" fill="#1a3a52" stroke="#26de81" strokeWidth="0.5" />
              </svg>

              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(38, 222, 129, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(38, 222, 129, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "10% 10%",
                }}
              />
            </div>

            {/* Location Pins */}
            {locations.map((location, index) => {
              const Icon = location.icon
              const isSelected = selectedLocation?.id === location.id
              const isHovered = hoveredLocation === location.id

              return (
                <motion.button
                  key={location.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
                  onClick={() => setSelectedLocation(isSelected ? null : location)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  className="absolute z-10 group cursor-pointer touch-target"
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Glow ring */}
                  <motion.div
                    animate={{
                      scale: isSelected || isHovered ? [1, 1.5, 1] : [1, 1.3, 1],
                      opacity: isSelected || isHovered ? [0.8, 0.4, 0.8] : [0.4, 0.2, 0.4],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: location.color,
                      filter: "blur(8px)",
                      width: "48px",
                      height: "48px",
                      left: "-12px",
                      top: "-12px",
                    }}
                  />

                  {/* Pin container */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected ? "bg-white/20 border-2" : "bg-white/10 border border-white/30"
                    }`}
                    style={{
                      borderColor: isSelected ? location.color : undefined,
                      boxShadow: isSelected ? `0 0 20px ${location.color}40` : undefined,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: isSelected || isHovered ? location.color : "#fff" }}
                    />
                  </motion.div>

                  {/* Tooltip on hover (desktop) */}
                  <AnimatePresence>
                    {isHovered && !isSelected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden md:block whitespace-nowrap z-20"
                      >
                        <div
                          className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-center"
                          style={{ boxShadow: `0 0 20px ${location.color}20` }}
                        >
                          <p className="text-xs font-semibold text-white">{location.name}</p>
                          <p className="text-[10px]" style={{ color: location.color }}>
                            {location.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}

            {/* Map Labels */}
            <div className="absolute top-4 left-4 text-xs text-white/40 font-mono">
              <div>21.4°N - 21.8°N</div>
              <div>91.8°E - 92.3°E</div>
            </div>

            {/* Mobile Legend */}
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <MapPin className="w-4 h-4 text-[#26de81]" />
                <span className="text-xs text-white/80">Tap pins to explore zones</span>
              </div>
            </div>

            {/* Compass */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
              <div className="text-[10px] font-bold text-[#26de81]">N</div>
            </div>
          </motion.div>

          {/* Knowledge Card Panel */}
          <div className="w-full lg:w-2/5">
            <AnimatePresence mode="wait">
              {selectedLocation ? (
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <div
                    className="relative h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
                    style={{ boxShadow: `0 0 40px ${selectedLocation.color}10` }}
                  >
                    {/* Header */}
                    <div
                      className="p-4 md:p-6 border-b border-white/10"
                      style={{ background: `linear-gradient(135deg, ${selectedLocation.color}15, transparent)` }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${selectedLocation.color}20` }}
                          >
                            <selectedLocation.icon className="w-6 h-6" style={{ color: selectedLocation.color }} />
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-white">{selectedLocation.name}</h3>
                            <p className="text-sm" style={{ color: selectedLocation.color }}>
                              {selectedLocation.subtitle}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedLocation(null)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <X className="w-4 h-4 text-white/60" />
                        </button>
                      </div>
                      <div
                        className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${selectedLocation.color}20`, color: selectedLocation.color }}
                      >
                        {selectedLocation.highlight}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6 space-y-5">
                      {/* Species Profile */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2 flex items-center gap-2">
                          <Leaf className="w-3 h-3" /> Species Profile
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.species.map((species, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/80 border border-white/10"
                            >
                              {species}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Farming Method */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2 flex items-center gap-2">
                          <Anchor className="w-3 h-3" /> Farming Method
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed">{selectedLocation.method}</p>
                      </div>

                      {/* Economic Impact */}
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2 flex items-center gap-2">
                          <Waves className="w-3 h-3" /> 2026 Economic Impact
                        </h4>
                        <p className="text-sm text-white/70 leading-relaxed">{selectedLocation.economicImpact}</p>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0A192F] to-transparent">
                      <button
                        className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 min-h-[48px]"
                        style={{
                          backgroundColor: `${selectedLocation.color}20`,
                          color: selectedLocation.color,
                          border: `1px solid ${selectedLocation.color}30`,
                        }}
                      >
                        Explore {selectedLocation.name}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8"
                >
                  <div className="space-y-6">
                    <div>
                      <MapPin className="w-10 h-10 text-[#26de81] mb-4" />
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Select a Zone</h3>
                      <p className="text-sm text-white/60">
                        Click on any pin to discover the unique characteristics and economic potential of each
                        cultivation zone.
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-[#26de81]">4</div>
                        <div className="text-xs text-white/50">Active Zones</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-[#635bff]">12+</div>
                        <div className="text-xs text-white/50">Species Types</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-[#22d3ee]">250km</div>
                        <div className="text-xs text-white/50">Coastline</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-[#e9c46a]">2026</div>
                        <div className="text-xs text-white/50">Target Year</div>
                      </div>
                    </div>

                    {/* Zone List Preview */}
                    <div className="space-y-2">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group min-h-[48px]"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${loc.color}20` }}
                          >
                            <loc.icon className="w-4 h-4" style={{ color: loc.color }} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-white">{loc.name}</div>
                            <div className="text-xs text-white/50">{loc.subtitle}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
