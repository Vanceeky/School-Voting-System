// src/pages/election/dashboard.jsx
import { useParams } from "react-router-dom"

import { SectionCards } from "@/components/admin/section-cards"
import { CandidateBarChart } from "@/components/admin/candidate-bar-chart"
export default function Dashboard() {
  const { electionId } = useParams()

  return (
    <div className="space-y-4 mt-4">
      <h1 className="text-2xl font-bold">University Student Council Election 2025</h1>
      <p className="text-muted-foreground">Election ID: {electionId}</p>
      <div className="rounded-lg border bg-muted p-4">
        This is a dynamic dashboard for <strong>{electionId}</strong>
        
      </div>

      <SectionCards />

      <div className="flex gap-4">
        {/* 8-column section */}
        <div className="w-8/12 p-4 rounded">
        
            <CandidateBarChart />
            </div>

        {/* 4-column section */}
        <div className="w-4/12p-4 rounded">4/12 column</div>
      </div>



    </div>
  )
}
