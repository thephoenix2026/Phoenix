"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type CellType = "empty" | "debris" | "survivor" | "safe" | "robot"

interface Position {
  x: number
  y: number
}

const GRID_SIZE = 8

const createInitialGrid = (): CellType[][] => {
  const grid: CellType[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill("empty"))

  // Add debris
  const debrisPositions = [
    [1, 1],
    [2, 3],
    [3, 5],
    [4, 2],
    [5, 6],
    [6, 1],
    [7, 4],
    [1, 6],
    [2, 7],
    [5, 3],
  ]
  debrisPositions.forEach(([x, y]) => {
    grid[x][y] = "debris"
  })

  // Add survivors
  const survivorPositions = [
    [2, 2],
    [4, 4],
    [6, 6],
    [3, 7],
    [7, 2],
  ]
  survivorPositions.forEach(([x, y]) => {
    grid[x][y] = "survivor"
  })

  // Add safe zones
  const safePositions = [
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ]
  safePositions.forEach(([x, y]) => {
    grid[x][y] = "safe"
  })

  // Set robot start position
  grid[0][0] = "robot"

  return grid
}

export default function RescueSimulator() {
  const [grid, setGrid] = useState<CellType[][]>(createInitialGrid)
  const [robotPos, setRobotPos] = useState<Position>({ x: 0, y: 0 })
  const [isRunning, setIsRunning] = useState(false)
  const [survivorsFound, setSurvivorsFound] = useState(0)
  const [stepsTaken, setStepsTaken] = useState(0)
  const [alert, setAlert] = useState<string | null>(null)
  const [missionComplete, setMissionComplete] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetMission = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setGrid(createInitialGrid())
    setRobotPos({ x: 0, y: 0 })
    setIsRunning(false)
    setSurvivorsFound(0)
    setStepsTaken(0)
    setAlert(null)
    setMissionComplete(false)
  }

  const startMission = () => {
    resetMission()
    setIsRunning(true)
  }

  const moveRobot = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row])
      const currentX = robotPos.x
      const currentY = robotPos.y

      // Find next position (simple pathfinding: try to move right, then down, then left, then up)
      const directions = [
        { dx: 0, dy: 1 }, // right
        { dx: 1, dy: 0 }, // down
        { dx: 0, dy: -1 }, // left
        { dx: -1, dy: 0 }, // up
      ]

      let nextPos: Position | null = null

      for (const dir of directions) {
        const newX = currentX + dir.dx
        const newY = currentY + dir.dy

        if (
          newX >= 0 &&
          newX < GRID_SIZE &&
          newY >= 0 &&
          newY < GRID_SIZE &&
          newGrid[newX][newY] !== "debris" &&
          newGrid[newX][newY] !== "robot"
        ) {
          nextPos = { x: newX, y: newY }
          break
        }
      }

      if (nextPos) {
        // Check if moving to survivor
        if (newGrid[nextPos.x][nextPos.y] === "survivor") {
          setSurvivorsFound((prev) => prev + 1)
          setAlert("SURVIVOR DETECTED!")
          setTimeout(() => setAlert(null), 2000)
        }

        // Move robot
        newGrid[currentX][currentY] = "empty"
        newGrid[nextPos.x][nextPos.y] = "robot"
        setRobotPos(nextPos)
        setStepsTaken((prev) => prev + 1)

        // Check if mission complete (visited all reachable areas or found all survivors)
        const survivors = newGrid.flat().filter((cell) => cell === "survivor").length
        if (survivors === 0) {
          setMissionComplete(true)
          setIsRunning(false)
        }
      } else {
        // No valid moves, mission complete
        setMissionComplete(true)
        setIsRunning(false)
      }

      return newGrid
    })
  }

  useEffect(() => {
    if (isRunning && !missionComplete) {
      intervalRef.current = setInterval(moveRobot, 500)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, missionComplete, robotPos])

  const getCellStyle = (type: CellType) => {
    switch (type) {
      case "empty":
        return "bg-gray-900 border-gray-800"
      case "debris":
        return "bg-gray-600 border-gray-500 shadow-[0_0_5px_#6b7280]"
      case "survivor":
        return "bg-red-600 border-red-500 shadow-[0_0_10px_#ef4444] animate-pulse"
      case "safe":
        return "bg-green-600 border-green-500 shadow-[0_0_10px_#22c55e]"
      case "robot":
        return "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse"
      default:
        return "bg-gray-900 border-gray-800"
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={startMission}
          disabled={isRunning}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 text-white font-mono rounded-lg transition-all duration-300 shadow-[0_0_10px_#22d3ee] hover:shadow-[0_0_20px_#22d3ee]"
        >
          {missionComplete ? "Restart Mission" : "Start Mission"}
        </button>
        <button
          onClick={resetMission}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-mono rounded-lg transition-all duration-300"
        >
          Reset
        </button>
      </div>

      <div className="w-full max-w-[360px] overflow-x-auto">
        <div className="grid grid-cols-8 gap-1 p-4 bg-gray-950 rounded-lg border border-gray-800 w-fit mx-auto">
          {grid.map((row, x) =>
            row.map((cell, y) => (
              <motion.div
                key={`${x}-${y}`}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded border ${getCellStyle(cell)} flex items-center justify-center`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: (x * GRID_SIZE + y) * 0.01 }}
              >
                {cell === "robot" && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-cyan-400 rounded-full animate-ping opacity-75" />
                )}
                {cell === "survivor" && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded-full" />
                )}
                {cell === "safe" && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full" />
                )}
                {cell === "debris" && (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-400 rounded" />
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-white font-mono">
        <div className="text-center">
          <div className="text-2xl text-cyan-400">{stepsTaken}</div>
          <div className="text-sm text-gray-400">Steps</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-red-400">{survivorsFound}</div>
          <div className="text-sm text-gray-400">Survivors Found</div>
        </div>
      </div>

      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded-lg font-mono text-xl shadow-[0_0_30px_#ef4444] z-50"
          >
            {alert}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {missionComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900 border border-cyan-500 rounded-lg p-6 text-center shadow-[0_0_20px_#22d3ee]"
          >
            <h3 className="text-2xl font-mono text-cyan-400 mb-4">
              Mission Complete!
            </h3>
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center text-white">
              <div>
                <div className="text-3xl font-bold text-cyan-400">{stepsTaken}</div>
                <div className="text-sm text-gray-400">Total Steps</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">{survivorsFound}</div>
                <div className="text-sm text-gray-400">Survivors Rescued</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}