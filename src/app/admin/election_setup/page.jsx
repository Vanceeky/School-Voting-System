
import PositionsCard from "@/components/admin/position-section"
import CandidatesCard from "@/components/admin/candidate-section"

const election_name = "Student Government 2025"


export default function ElectionSetupPage() {

  return (
    <div className="p-6 space-y-6">
      {/* ✅ PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold mb-0">Election Setup</h1>
        <p className="text-muted-foreground">
          Manage positions, parties, and candidates for the <strong>{election_name}</strong> election.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left - 8 cols */}
        <div className="md:col-span-8 space-y-4">

          <CandidatesCard/>

        </div>

        {/* Right - 4 cols placeholder */}
        <div className="md:col-span-4">

            <PositionsCard/>
        </div>
      </div>
    </div>
  )
}
