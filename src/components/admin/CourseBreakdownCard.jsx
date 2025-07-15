import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const courseStats = [
  { course: "BSIT", total: 120, voted: 90, notVoted: 30 },
  { course: "BSBA", total: 100, voted: 60, notVoted: 40 },
  { course: "BSCRIM", total: 80, voted: 40, notVoted: 40 },
]

export default function CourseBreakdownCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Course Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Voted</TableHead>
              <TableHead>Not Voted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseStats.map((course) => (
              <TableRow key={course.course}>
                <TableCell>{course.course}</TableCell>
                <TableCell>{course.total}</TableCell>
                <TableCell>{course.voted}</TableCell>
                <TableCell>{course.notVoted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
