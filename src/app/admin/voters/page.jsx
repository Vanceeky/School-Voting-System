import React from 'react'



import VotersListCard from "@/components/admin/VotersListCard"
import VotingStatsPanel from '@/components/admin/VotingStatsPanel'
const election_name = "Student Government 2025"



const VotersPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* ✅ PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold mb-0">Voters</h1>
        <p className="text-muted-foreground">
          Manage the list of registered voters for the <strong>{election_name}</strong> election.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left - 8 cols */}
        <div className="md:col-span-8 space-y-4">

          <VotersListCard/>
          
        </div>

        {/* Right - 4 cols placeholder */}
        <div className="md:col-span-4">

          <VotingStatsPanel/>
        </div>
      </div>
    </div>
  )
}

export default VotersPage