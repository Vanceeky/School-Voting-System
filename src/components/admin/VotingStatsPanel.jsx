import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"

export default function VotingStatsPanel() {
  const votedCount = 340
  const notVotedCount = 160

  const courseStats = [
    { course: "BSIT", total: 120, voted: 90, notVoted: 30 },
    { course: "BSBA", total: 100, voted: 60, notVoted: 40 },
    { course: "BSCRIM", total: 80, voted: 40, notVoted: 40 },
  ]

  const summaryCards = [
    {
      title: "Voted",
      value: votedCount,
      description: "Students who have submitted their votes.",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    },
    {
      title: "Not Yet Voted",
      value: notVotedCount,
      description: "Students who haven’t voted yet.",
      icon: <Clock className="w-4 h-4 text-yellow-600" />,
    },
  ]

  return (
    <div className="space-y-4">
      {/* ✅ Voting Summary */}
      <div className="flex flex-col md:flex-row gap-4">
        {summaryCards.map((card, index) => (
          <Card
            key={index}
            className="flex-1 @container/card bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 relative"
          >
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <div className="absolute top-4 right-4">
                <Badge
                  variant="outline"
                  className="h-8 w-8 p-0 flex items-center justify-center"
                >
                  {card.icon}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-muted-foreground">{card.description}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* ✅ Course Breakdown */}
      <Card className={"mt-4 @container/card bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"}>
        <CardHeader className="mb-0">
          <CardTitle className="text-lg font-bold">Course Breakdown</CardTitle>
          <CardDescription className="text-smtext-muted-foreground">
            View voter participation per course.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 mt-0">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className={"text-center"}>Total</TableHead>
                  <TableHead className={"text-center"}>Voted</TableHead>
                  <TableHead className={"text-center"}>Not Voted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseStats.map((course) => (
                  <TableRow key={course.course}>
                    <TableCell className="font-medium">{course.course}</TableCell>
                    <TableCell className={"text-center"}>{course.total}</TableCell>
                    <TableCell className={"text-center"}>{course.voted}</TableCell>
                    <TableCell className={"text-center"}>{course.notVoted}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
