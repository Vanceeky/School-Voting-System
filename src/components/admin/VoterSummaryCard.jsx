import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"

export default function VoterSummaryCard() {
  const voted = 340
  const notVoted = 160

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Voting Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <span className="font-medium">Voted</span>
          </div>
          <span className="font-semibold">{voted}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-600 w-5 h-5" />
            <span className="font-medium">Not Yet Voted</span>
          </div>
          <span className="font-semibold">{notVoted}</span>
        </div>
      </CardContent>
    </Card>
  )
}
