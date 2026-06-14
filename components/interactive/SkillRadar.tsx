"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
}

interface SkillRadarProps {
  skills?: Skill[]
  color?: string
}

const defaultSkills: Skill[] = [
  { name: "AI/ML", level: 95 },
  { name: "Robotics", level: 88 },
  { name: "Software", level: 92 },
  { name: "Hardware", level: 85 },
  { name: "Research", level: 90 },
  { name: "Leadership", level: 87 },
]

export default function SkillRadar({
  skills = defaultSkills,
  color = "#22d3ee",
}: SkillRadarProps) {
  const centerX = 100
  const centerY = 100
  const maxRadius = 80

  const getPoint = (index: number, level: number) => {
    const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
    const radius = (level / 100) * maxRadius
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  const polygonPoints = skills
    .map((skill, index) => {
      const point = getPoint(index, skill.level)
      return `${point.x},${point.y}`
    })
    .join(" ")

  const axisPoints = skills.map((skill, index) => {
    const point = getPoint(index, 100)
    return { x: point.x, y: point.y }
  })

  const labelPoints = skills.map((skill, index) => {
    const point = getPoint(index, 115)
    return { x: point.x, y: point.y, name: skill.name }
  })

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background rings */}
        {[25, 50, 75, 100].map((level) => {
          const radius = (level / 100) * maxRadius
          return (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="rgba(34, 211, 238, 0.1)"
              strokeWidth="0.5"
            />
          )
        })}

        {/* Axis lines */}
        {axisPoints.map((point, index) => (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="rgba(34, 211, 238, 0.2)"
            strokeWidth="0.5"
          />
        ))}

        {/* Skill polygon */}
        <motion.polygon
          points={polygonPoints}
          fill={`${color}33`}
          stroke={color}
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Skill points */}
        {skills.map((skill, index) => {
          const point = getPoint(index, skill.level)
          return (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          )
        })}

        {/* Labels */}
        {labelPoints.map((label, index) => (
          <text
            key={index}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-300 text-[8px] font-mono"
          >
            {label.name}
          </text>
        ))}
      </svg>
    </div>
  )
}