import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Users, Plus, Edit, Trash2, UserRound } from "lucide-react"
import { useState } from "react"
import ManagePartiesDialog from "./ManagePartiesDialog"
import AddCandidateDialog from "./AddCandidateDialog"

const ITEMS_PER_PAGE = 5

const allCandidates = [
  {
    id: 1,
    name: "Maria Santos",
    position: "President",
    party: "Independent",
    status: "Running",
    avatar: "",
  },
  {
    id: 2,
    name: "John Reyes",
    position: "Vice President",
    party: "Partido Juan",
    status: "Withdrawn",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    name: "Anna Dela Cruz",
    position: "Secretary",
    party: "Partido Juan",
    status: "Running",
    avatar: "",
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    position: "Treasurer",
    party: "Independent",
    status: "Running",
    avatar: "",
  },
  {
    id: 5,
    name: "Julia Robles",
    position: "Auditor",
    party: "Partido Bayan",
    status: "Running",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Miguel Tan",
    position: "PRO",
    party: "Partido Bayan",
    status: "Running",
    avatar: "",
  },
]

function getInitials(name) {
  const names = name.split(" ")
  return names.map((n) => n[0]).join("").toUpperCase()
}

export default function CandidatesCard() {
  const [page, setPage] = useState(0)

  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const currentPageData = allCandidates.slice(start, end)

  const nextPage = () => {
    if ((page + 1) * ITEMS_PER_PAGE < allCandidates.length) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <Card>
      {/* ✅ CARD HEADER */}
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserRound className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-bold">Candidates & Parties</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Add, manage, and assign candidates to parties.
        </CardDescription>
      </CardHeader>

      {/* ✅ TABLE SECTION */}
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Candidates</h1>
          <div className="flex gap-2">
                <ManagePartiesDialog/>
                <AddCandidateDialog/>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Political Party</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.map((candidate) => (
              <TableRow key={candidate.id} className="cursor-pointer">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      {candidate.avatar ? (
                        <AvatarImage src={candidate.avatar} />
                      ) : (
                        <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-base font-semibold">{candidate.name}</div>
                  </div>
                </TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.party}</TableCell>
                <TableCell>
                  <Badge
                    variant={candidate.status === "Running" ? "default" : "destructive"}
                  >
                    {candidate.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ✅ PAGINATION */}
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" size="sm" onClick={prevPage} disabled={page === 0}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={(page + 1) * ITEMS_PER_PAGE >= allCandidates.length}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
