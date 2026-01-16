"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  Microscope,
  Anchor,
  Leaf,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Tutorial {
  id: string
  title: string
  description: string
  category: "seeding" | "harvesting" | "quality" | "safety"
  duration: string
  enrolled: number
  modules: number
  completedModules: number
  thumbnail: string
  difficulty: "beginner" | "intermediate" | "advanced"
  unlocks: string[]
  quizQuestions: number
  passingScore: number
}

const tutorials: Tutorial[] = [
  {
    id: "seeding-101",
    title: "Seeding Fundamentals",
    description: "Learn the basics of seaweed seeding, from spore selection to rope attachment techniques.",
    category: "seeding",
    duration: "45 min",
    enrolled: 342,
    modules: 5,
    completedModules: 0,
    thumbnail: "/seaweed-seeding-underwater-farming.jpg",
    difficulty: "beginner",
    unlocks: ["Seeding Gigs", "Nursery Assistant"],
    quizQuestions: 10,
    passingScore: 80,
  },
  {
    id: "quality-control",
    title: "Quality Control & Grading",
    description: "Master the art of biomass inspection, grading standards, and contamination detection.",
    category: "quality",
    duration: "1h 15min",
    enrolled: 187,
    modules: 7,
    completedModules: 0,
    thumbnail: "/laboratory-quality-control-inspection.jpg",
    difficulty: "intermediate",
    unlocks: ["QC Inspector", "Verification Lead"],
    quizQuestions: 15,
    passingScore: 85,
  },
  {
    id: "harvesting-pro",
    title: "Sustainable Harvesting",
    description: "Advanced techniques for maximizing yield while maintaining ecological balance.",
    category: "harvesting",
    duration: "1h 30min",
    enrolled: 256,
    modules: 8,
    completedModules: 0,
    thumbnail: "/seaweed-harvesting-boat-ocean.jpg",
    difficulty: "advanced",
    unlocks: ["Harvest Lead", "Senior Harvester"],
    quizQuestions: 20,
    passingScore: 80,
  },
  {
    id: "safety-protocols",
    title: "Ocean Safety & First Aid",
    description: "Essential safety protocols, emergency procedures, and first aid for coastal workers.",
    category: "safety",
    duration: "2h",
    enrolled: 512,
    modules: 10,
    completedModules: 0,
    thumbnail: "/ocean-safety-training-lifeboat.jpg",
    difficulty: "beginner",
    unlocks: ["All Field Gigs"],
    quizQuestions: 25,
    passingScore: 90,
  },
]

const categoryConfig = {
  seeding: { icon: Leaf, color: "text-[#26DE81]", bg: "bg-[#26DE81]/20" },
  harvesting: { icon: Anchor, color: "text-[#1ABC9C]", bg: "bg-[#1ABC9C]/20" },
  quality: { icon: Microscope, color: "text-[#635BFF]", bg: "bg-[#635BFF]/20" },
  safety: { icon: Award, color: "text-[#22D3EE]", bg: "bg-[#22D3EE]/20" },
}

const difficultyColors = {
  beginner: "bg-[#26DE81]/20 text-[#26DE81]",
  intermediate: "bg-[#1ABC9C]/20 text-[#1ABC9C]",
  advanced: "bg-[#635BFF]/20 text-[#635BFF]",
}

export function Academy() {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null)
  const [quizState, setQuizState] = useState<"idle" | "taking" | "passed" | "failed">("idle")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [tutorialProgress, setTutorialProgress] = useState<Record<string, number>>({})

  const startQuiz = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial)
    setQuizState("taking")
    setCurrentQuestion(0)
    setScore(0)
  }

  const answerQuestion = (correct: boolean) => {
    if (correct) setScore((prev) => prev + 1)

    if (selectedTutorial && currentQuestion < selectedTutorial.quizQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else if (selectedTutorial) {
      const finalScore = correct ? score + 1 : score
      const percentage = (finalScore / selectedTutorial.quizQuestions) * 100
      if (percentage >= selectedTutorial.passingScore) {
        setQuizState("passed")
        setTutorialProgress((prev) => ({
          ...prev,
          [selectedTutorial.id]: 100,
        }))
      } else {
        setQuizState("failed")
      }
    }
  }

  const closeQuiz = () => {
    setSelectedTutorial(null)
    setQuizState("idle")
  }

  return (
    <div className="space-y-6">
      {/* Header Stats - glassmorphism */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Courses", value: tutorials.length, icon: BookOpen },
          { label: "Enrolled Workers", value: "1,297", icon: Users },
          { label: "Certifications", value: "847", icon: Award },
          { label: "Gigs Unlocked", value: "2,340", icon: CheckCircle2 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 text-center"
          >
            <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#26DE81] mx-auto mb-2" />
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F1FAEE]">{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-[#8B9CB6]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tutorial Grid - mobile-first responsive */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        {tutorials.map((tutorial, index) => {
          const CategoryIcon = categoryConfig[tutorial.category].icon
          const isCompleted = tutorialProgress[tutorial.id] === 100

          return (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:glow-teal transition-all duration-300"
            >
              {/* Thumbnail - optimized for low bandwidth with loading="lazy" */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={tutorial.thumbnail || "/placeholder.svg"}
                  alt={tutorial.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-[#0B1120]/20 to-transparent" />

                {/* Play overlay - touch optimized */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#26DE81]/90 flex items-center justify-center min-h-[48px] min-w-[48px]">
                    <Play className="h-6 w-6 sm:h-8 sm:w-8 text-[#0B1120] ml-1" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-[#F1FAEE] flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tutorial.duration}
                </div>

                {/* Category badge */}
                <div
                  className={`absolute top-3 left-3 ${categoryConfig[tutorial.category].bg} rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium ${categoryConfig[tutorial.category].color} flex items-center gap-1`}
                >
                  <CategoryIcon className="h-3 w-3" />
                  {tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1)}
                </div>

                {isCompleted && (
                  <div className="absolute bottom-3 left-3 bg-[#26DE81]/90 text-[#0B1120] rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Certified
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[#F1FAEE] group-hover:text-[#26DE81] transition-colors">
                    {tutorial.title}
                  </h3>
                  <Badge className={difficultyColors[tutorial.difficulty] + " text-[10px] sm:text-xs"}>
                    {tutorial.difficulty}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-[#8B9CB6] mb-4 line-clamp-2">{tutorial.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] sm:text-xs text-[#8B9CB6] mb-1">
                    <span>{tutorialProgress[tutorial.id] || 0}% complete</span>
                    <span>{tutorial.modules} modules</span>
                  </div>
                  <Progress value={tutorialProgress[tutorial.id] || 0} className="h-1.5" />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[10px] sm:text-xs text-[#8B9CB6] mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {tutorial.enrolled} enrolled
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {tutorial.passingScore}% to pass
                  </span>
                </div>

                {/* Unlocks */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tutorial.unlocks.map((unlock) => (
                    <span
                      key={unlock}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#26DE81]/10 text-[#26DE81] text-[10px] sm:text-xs"
                    >
                      {isCompleted ? <CheckCircle2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      {unlock}
                    </span>
                  ))}
                </div>

                {/* Actions - touch optimized */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 min-h-[48px] text-xs sm:text-sm"
                    onClick={() =>
                      setTutorialProgress((prev) => ({
                        ...prev,
                        [tutorial.id]: Math.min((prev[tutorial.id] || 0) + 20, 100),
                      }))
                    }
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {tutorialProgress[tutorial.id] ? "Continue" : "Start"}
                  </Button>
                  <Button
                    className="flex-1 bg-[#635BFF] hover:bg-[#635BFF]/90 text-white min-h-[48px] text-xs sm:text-sm"
                    onClick={() => startQuiz(tutorial)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Passed
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Quiz
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quiz Modal - glassmorphism */}
      <AnimatePresence>
        {selectedTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/80 backdrop-blur-sm"
            onClick={closeQuiz}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#F1FAEE]">
                  {quizState === "taking"
                    ? "Certification Quiz"
                    : quizState === "passed"
                      ? "Congratulations!"
                      : "Try Again"}
                </h3>
                <Button variant="ghost" size="icon" onClick={closeQuiz} className="min-h-[48px] min-w-[48px]">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {quizState === "taking" && (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs sm:text-sm text-[#8B9CB6] mb-2">
                      <span>
                        Question {currentQuestion + 1} of {selectedTutorial.quizQuestions}
                      </span>
                      <span>Score: {score}</span>
                    </div>
                    <Progress value={((currentQuestion + 1) / selectedTutorial.quizQuestions) * 100} className="h-2" />
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6">
                    <p className="text-[#F1FAEE] font-medium mb-4 text-sm sm:text-base">
                      Sample question about {selectedTutorial.title.toLowerCase()}?
                    </p>
                    <div className="space-y-2">
                      {["Correct Answer", "Wrong Answer A", "Wrong Answer B", "Wrong Answer C"].map((answer, i) => (
                        <Button
                          key={answer}
                          variant="outline"
                          className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10 min-h-[48px] text-xs sm:text-sm"
                          onClick={() => answerQuestion(i === 0)}
                        >
                          <span className="w-6 h-6 rounded-full bg-[#1A2538] flex items-center justify-center text-xs mr-3">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {answer}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {quizState === "passed" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#26DE81]/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 sm:h-10 sm:w-10 text-[#26DE81]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#F1FAEE] mb-2">You Passed!</h4>
                  <p className="text-[#8B9CB6] mb-4 text-sm sm:text-base">
                    Score: {score}/{selectedTutorial.quizQuestions} (
                    {Math.round((score / selectedTutorial.quizQuestions) * 100)}%)
                  </p>
                  <p className="text-xs sm:text-sm text-[#635BFF] mb-6">
                    You{"'"}ve unlocked: {selectedTutorial.unlocks.join(", ")}
                  </p>
                  <Button
                    className="bg-[#26DE81] hover:bg-[#26DE81]/90 text-[#0B1120] min-h-[48px]"
                    onClick={closeQuiz}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Claim Certificate
                  </Button>
                </div>
              )}

              {quizState === "failed" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center mx-auto mb-4">
                    <X className="h-8 w-8 sm:h-10 sm:w-10 text-[#FF6B6B]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#F1FAEE] mb-2">Not Quite</h4>
                  <p className="text-[#8B9CB6] mb-4 text-sm sm:text-base">
                    Score: {score}/{selectedTutorial.quizQuestions} (
                    {Math.round((score / selectedTutorial.quizQuestions) * 100)}%)
                  </p>
                  <p className="text-xs sm:text-sm text-[#8B9CB6] mb-6">
                    You need {selectedTutorial.passingScore}% to pass. Review the material and try again.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent min-h-[48px]" onClick={closeQuiz}>
                      Review Course
                    </Button>
                    <Button className="flex-1 min-h-[48px]" onClick={() => startQuiz(selectedTutorial)}>
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Retry Quiz
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
