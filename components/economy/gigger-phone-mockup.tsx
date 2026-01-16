"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Shield, Smartphone, Zap, History } from "lucide-react"

export function GiggerPhoneMockup() {
  const [showPayment, setShowPayment] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [progress, setProgress] = useState(0)

  // Animate progress bar and trigger payment animation
  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgress(100)
    }, 500)

    const paymentTimer = setTimeout(() => {
      setShowPayment(true)
    }, 2000)

    const notificationTimer = setTimeout(() => {
      setShowNotification(true)
    }, 2500)

    // Reset animation loop
    const resetTimer = setTimeout(() => {
      setShowPayment(false)
      setShowNotification(false)
      setProgress(0)
      // Restart the cycle
      setTimeout(() => setProgress(100), 500)
      setTimeout(() => setShowPayment(true), 2000)
      setTimeout(() => setShowNotification(true), 2500)
    }, 6000)

    return () => {
      clearTimeout(progressTimer)
      clearTimeout(paymentTimer)
      clearTimeout(notificationTimer)
      clearTimeout(resetTimer)
    }
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1FAEE] mb-6 text-balance">
              Empowering Coastal <span className="text-[#26DE81] text-glow-green">Giggers</span>
            </h2>

            <p className="text-[#8B9CB6] text-base sm:text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Our mobile-first platform ensures every coastal worker has access to fair wages, verified work, and
              instant payments.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 justify-center lg:justify-start"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#26DE81]/20 text-[#26DE81]">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-[#F1FAEE] font-semibold text-lg">Instant MFS Payouts</h4>
                  <p className="text-[#8B9CB6] text-sm">Receive payments via bKash within seconds of task completion</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 justify-center lg:justify-start"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#635BFF]/20 text-[#635BFF]">
                  <History className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-[#F1FAEE] font-semibold text-lg">Verified Work History</h4>
                  <p className="text-[#8B9CB6] text-sm">
                    Build a trusted profile with blockchain-verified task records
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#26DE81]">2,400+</div>
                <div className="text-xs sm:text-sm text-[#8B9CB6]">Active Workers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#635BFF]">৳4.2M</div>
                <div className="text-xs sm:text-sm text-[#8B9CB6]">Paid Out</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#E9C46A]">98%</div>
                <div className="text-xs sm:text-sm text-[#8B9CB6]">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateY: [-2, 2, -2],
                rotateX: [1, -1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{ perspective: 1000 }}
              className="relative"
            >
              {/* Phone Frame - iPhone 15 Pro Style */}
              <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[660px]">
                {/* Outer frame with titanium-like gradient */}
                <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1c] to-[#0a0a0c] p-[3px] shadow-2xl">
                  {/* Inner bezel */}
                  <div className="w-full h-full rounded-[47px] bg-gradient-to-b from-[#1a1a1c] to-[#0f0f10] p-[8px]">
                    {/* Screen area */}
                    <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-[#041E30]">
                      {/* Dynamic Island */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1c]" />
                        <div className="w-3 h-3 rounded-full bg-[#1a1a1c] ring-1 ring-[#2a2a2c]" />
                      </div>

                      {/* App UI Content */}
                      <div className="relative h-full pt-12 pb-6 px-4 flex flex-col">
                        {/* Notification Slide-down */}
                        <AnimatePresence>
                          {showNotification && (
                            <motion.div
                              initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -100, opacity: 0 }}
                              transition={{ type: "spring", damping: 20 }}
                              className="absolute top-14 left-3 right-3 z-30"
                            >
                              <div className="bg-[#26DE81]/20 backdrop-blur-xl border border-[#26DE81]/30 rounded-2xl p-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#26DE81] flex items-center justify-center shrink-0">
                                  <span className="text-[#041E30] font-bold text-xs">b</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[#26DE81] font-semibold text-xs">bKash</p>
                                  <p className="text-[#F1FAEE] text-[11px] truncate">+1,200 BDT received</p>
                                </div>
                                <span className="text-[#8B9CB6] text-[10px]">now</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Header with Profile */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#26DE81] to-[#1abc9c] flex items-center justify-center text-[#041E30] font-bold text-sm">
                              SM
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[#F1FAEE] font-semibold text-sm">Salam M.</span>
                                <div className="flex items-center gap-0.5 bg-[#26DE81]/20 px-1.5 py-0.5 rounded-full">
                                  <Shield className="w-2.5 h-2.5 text-[#26DE81]" />
                                  <span className="text-[#26DE81] text-[9px] font-medium">Verified</span>
                                </div>
                              </div>
                              <p className="text-[#8B9CB6] text-[10px]">Level 3 Harvester</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[#26DE81] font-bold text-sm">৳12,400</p>
                            <p className="text-[#8B9CB6] text-[9px]">This Month</p>
                          </div>
                        </div>

                        {/* Current Task Card - Glassmorphism */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[#8B9CB6] text-[10px] uppercase tracking-wider">Current Task</span>
                            <span className="text-[#26DE81] text-[10px] font-medium">In Progress</span>
                          </div>

                          <h3 className="text-[#F1FAEE] font-semibold text-base mb-1">Seedling Planting</h3>
                          <p className="text-[#8B9CB6] text-xs mb-4">St. Martin's Island, Zone A</p>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#8B9CB6]">Progress</span>
                              <span className="text-[#26DE81] font-semibold">{progress}%</span>
                            </div>
                            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-[#26DE81] to-[#1abc9c] rounded-full"
                              />
                            </div>
                          </div>

                          {/* Task reward */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                            <span className="text-[#8B9CB6] text-xs">Task Reward</span>
                            <span className="text-[#26DE81] font-bold">৳1,200</span>
                          </div>
                        </div>

                        {/* Payment Success Overlay */}
                        <AnimatePresence>
                          {showPayment && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="absolute inset-0 flex items-center justify-center bg-[#041E30]/80 backdrop-blur-sm z-20 rounded-[40px]"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 15, delay: 0.1 }}
                                className="text-center"
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                  className="w-20 h-20 rounded-full bg-[#26DE81]/20 flex items-center justify-center mx-auto mb-4"
                                >
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 10, delay: 0.4 }}
                                  >
                                    <CheckCircle2 className="w-12 h-12 text-[#26DE81]" />
                                  </motion.div>
                                </motion.div>
                                <motion.p
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 }}
                                  className="text-[#26DE81] font-bold text-xl mb-1"
                                >
                                  Payment Received!
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.6 }}
                                  className="text-[#F1FAEE] text-2xl font-bold"
                                >
                                  +৳1,200
                                </motion.p>
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.7 }}
                                  className="text-[#8B9CB6] text-xs mt-2"
                                >
                                  via bKash
                                </motion.p>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                            <p className="text-[#F1FAEE] font-bold text-sm">47</p>
                            <p className="text-[#8B9CB6] text-[9px]">Tasks Done</p>
                          </div>
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                            <p className="text-[#E9C46A] font-bold text-sm">4.9</p>
                            <p className="text-[#8B9CB6] text-[9px]">Rating</p>
                          </div>
                          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center">
                            <p className="text-[#635BFF] font-bold text-sm">12</p>
                            <p className="text-[#8B9CB6] text-[9px]">Days Active</p>
                          </div>
                        </div>

                        {/* Bottom Nav */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-around bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-3">
                            <button className="flex flex-col items-center gap-1 text-[#26DE81]">
                              <Smartphone className="w-5 h-5" />
                              <span className="text-[9px]">Home</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-[#8B9CB6]">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span className="text-[9px]">Gigs</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-[#8B9CB6]">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-[9px]">Earnings</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-[#8B9CB6]">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <span className="text-[9px]">Profile</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side buttons */}
                <div className="absolute left-0 top-[120px] w-[3px] h-8 bg-[#2a2a2e] rounded-l-sm" />
                <div className="absolute left-0 top-[170px] w-[3px] h-14 bg-[#2a2a2e] rounded-l-sm" />
                <div className="absolute left-0 top-[240px] w-[3px] h-14 bg-[#2a2a2e] rounded-l-sm" />
                <div className="absolute right-0 top-[180px] w-[3px] h-20 bg-[#2a2a2e] rounded-r-sm" />

                {/* Reflection/Shine effect */}
                <div className="absolute inset-0 rounded-[50px] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Shadow underneath */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-black/40 blur-xl rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
