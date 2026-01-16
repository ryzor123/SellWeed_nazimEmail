"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wallet, Users, GraduationCap, Building2 } from "lucide-react"

const TOTAL_BDT = 250000

const segments = [
  {
    id: "farmers",
    label: "Farmers",
    percentage: 65,
    color: "#26DE81", // Teal
    icon: Users,
    description: "Direct payment to coastal farmers",
  },
  {
    id: "workers",
    label: "Workers",
    percentage: 20,
    color: "#635BFF", // Blue
    icon: Wallet,
    description: "Gig workers & harvesters",
  },
  {
    id: "students",
    label: "Students",
    percentage: 5,
    color: "#E9C46A", // Gold
    icon: GraduationCap,
    description: "Auditor stipends",
  },
  {
    id: "platform",
    label: "Platform",
    percentage: 10,
    color: "#64748B", // Slate
    icon: Building2,
    description: "Operations & development",
  },
]

export function MFSTransparencyBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="relative py-8 sm:py-12">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-[#26DE81]" />
              <span className="text-sm sm:text-base font-medium text-[#F1FAEE]">MFS Transparency</span>
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#26DE81]">
              ৳{TOTAL_BDT.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-[#8B9CB6]">BDT</span>
            </div>
          </div>

          {/* Segmented Bar */}
          <div className="relative h-8 sm:h-10 lg:h-12 rounded-full overflow-hidden bg-[#1A2538] mb-4">
            <div className="absolute inset-0 flex">
              {segments.map((segment, index) => {
                return (
                  <motion.div
                    key={segment.id}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${segment.percentage}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full relative group"
                    style={{ backgroundColor: segment.color }}
                  >
                    {/* Percentage label inside bar (desktop) */}
                    <span className="absolute inset-0 hidden sm:flex items-center justify-center text-xs sm:text-sm font-bold text-white/90">
                      {segment.percentage}%
                    </span>

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#0D1424] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 hidden sm:block">
                      <div className="text-xs font-medium text-[#F1FAEE]">{segment.label}</div>
                      <div className="text-[10px] text-[#8B9CB6]">
                        ৳{Math.round((TOTAL_BDT * segment.percentage) / 100).toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Legend - responsive grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {segments.map((segment) => {
              const Icon = segment.icon
              const amount = Math.round((TOTAL_BDT * segment.percentage) / 100)

              return (
                <motion.div
                  key={segment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${segment.color}20` }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: segment.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-[#F1FAEE] truncate">{segment.label}</div>
                    <div className="text-[10px] sm:text-xs text-[#8B9CB6]">
                      {segment.percentage}% • ৳{amount.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
