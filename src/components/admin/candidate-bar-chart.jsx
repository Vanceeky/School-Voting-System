import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

// ✅ New rawData format with nested candidates
const rawData = [
  {
    position: "President",
    candidates: [
      { name: "Maria Santos", votes: 120 },
      { name: "John Reyes", votes: 90 },
    ],
  },
  {
    position: "Vice President",
    candidates: [
      { name: "Angela Dela Cruz", votes: 75 },
      { name: "David Mendoza", votes: 100 },
    ],
  },
  {
    position: "Secretary",
    candidates: [
      { name: "Ella Ramirez", votes: 110 },
      { name: "Mark De Leon", votes: 95 },
    ],
  },
  {
    position: "Treasurer",
    candidates: [
      { name: "Samantha Lim", votes: 130 },
      { name: "James Villanueva", votes: 85 },
    ],
  },
  {
    position: "Auditor",
    candidates: [
      { name: "Christine Tan", votes: 88 },
      { name: "Michael Ong", votes: 92 },
    ],
  },
  {
    position: "PRO",
    candidates: [
      { name: "Isabelle Flores", votes: 77 },
      { name: "Kevin Gutierrez", votes: 102 },
    ],
  },
  {
    position: "4th Year Representative",
    candidates: [
      { name: "Alex Torres", votes: 70 },
      { name: "Janine Garcia", votes: 95 },
    ],
  },
  {
    position: "3rd Year Representative",
    candidates: [
      { name: "Joshua Santos", votes: 80 },
      { name: "Camille Rivera", votes: 90 },
    ],
  },
  {
    position: "2nd Year Representative",
    candidates: [
      { name: "Daniel Cruz", votes: 85 },
      { name: "Grace Navarro", votes: 93 },
    ],
  },
  {
    position: "1st Year Representative",
    candidates: [
      { name: "Nico Bautista", votes: 60 },
      { name: "Trisha Gomez", votes: 78 },
    ],
  },

]


// 🔄 Transform nested format into flat format per position for stacked bar chart
const candidateSet = new Set()
const groupedData = rawData.map((group) => {
  const entry = { position: group.position }
  group.candidates.forEach((candidate) => {
    entry[candidate.name] = candidate.votes
    candidateSet.add(candidate.name)
  })
  return entry
})

const allCandidates = Array.from(candidateSet)

// 🎨 Generate shades of blue based on max vote
const maxVote = Math.max(
  ...rawData.flatMap((group) => group.candidates.map((c) => c.votes))
)

const getBlueShade = (votes) => {
  const intensity = (votes / maxVote) * 100
  const lightness = 80 - intensity * 0.4
  return `hsl(210, 100%, ${lightness}%)`
}

export function CandidateBarChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Election Results by Position (Stacked)</CardTitle>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={groupedData}
            margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="position"
              angle={-20}
              textAnchor="end"
              interval={0}
              height={100}
            />
            <YAxis />
            <Tooltip />
            {allCandidates.map((name) => (
              <Bar
                key={name}
                dataKey={name}
                stackId="a"
                fill={getBlueShade(
                  rawData
                    .flatMap((g) => g.candidates)
                    .find((c) => c.name === name)?.votes || 0
                )}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
