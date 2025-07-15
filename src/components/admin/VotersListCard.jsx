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
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Users2, Edit, Trash2, Upload, UserPlus } from "lucide-react"

import VoterUploadDialog from "@/components/admin/VoterUploadDialog"


import { useState } from "react"
const ITEMS_PER_PAGE = 5

const allVoters = [
  {
    id: 1,
    name: "Maria Santos",
    studentId: "2021001",
    course: "BSIT",
    year: "1st Year",
    status: "Eligible",
    avatar: "",
  },
  {
    id: 2,
    name: "John Reyes",
    studentId: "2021002",
    course: "BSBA",
    year: "2nd Year",
    status: "Ineligible",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 3,
    name: "Anna Dela Cruz",
    studentId: "2021003",
    course: "BSIT",
    year: "3rd Year",
    status: "Eligible",
    avatar: "",
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    studentId: "2021004",
    course: "BSCRIM",
    year: "4th Year",
    status: "Eligible",
    avatar: "",
  },
  {
    id: 5,
    name: "Julia Robles",
    studentId: "2021005",
    course: "BSBA",
    year: "1st Year",
    status: "Eligible",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Miguel Tan",
    studentId: "2021006",
    course: "BSIT",
    year: "2nd Year",
    status: "Ineligible",
    avatar: "",
  },
]

function getInitials(name) {
  const names = name.split(" ")
  return names.map((n) => n[0]).join("").toUpperCase()
}

export default function VotersListCard() {
  const [page, setPage] = useState(0)
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [status, setStatus] = useState("")
  const [search, setSearch] = useState("")

  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  // Filter logic
  const filteredVoters = allVoters.filter((voter) => {
    return (
      (!course || voter.course === course) &&
      (!year || voter.year === year) &&
      (!status || voter.status === status) &&
        (voter.name.toLowerCase().includes(search.toLowerCase()) ||
        voter.studentId.toLowerCase().includes(search.toLowerCase()))

    )
  })

  const currentPageData = filteredVoters.slice(start, end)

  const nextPage = () => {
    if ((page + 1) * ITEMS_PER_PAGE < filteredVoters.length) {
      setPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <Card className={"@container/card bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"}>
      {/* ✅ CARD HEADER */}
        <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Left: Title and Description */}
            <div>
            <div className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-bold">Voter Registry</CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
                Filter, search, and manage your registered voters.
            </CardDescription>
            </div>

            {/* Right: Buttons */}
            <div className="flex gap-2">
                <VoterUploadDialog />
                <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Voter
                </Button>
            </div>

        </div>
        </CardHeader>


      {/* ✅ CONTENT */}
      <CardContent>
        {/* ✅ Filter/Search + Action Buttons */}
        <div className="w-full mb-6">
        <div className="flex flex-wrap gap-2 w-full">
            <Input
            placeholder="Search by name or student ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[220px]"
            />

            <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Course" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="BSIT">BSIT</SelectItem>
                <SelectItem value="BSBA">BSBA</SelectItem>
                <SelectItem value="BSCRIM">BSCRIM</SelectItem>
            </SelectContent>
            </Select>

            <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
            </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Eligible">Eligible</SelectItem>
                <SelectItem value="Ineligible">Ineligible</SelectItem>
            </SelectContent>
            </Select>

            <Button onClick={() => setPage(0)} variant="secondary">
            Search
            </Button>

            <Tooltip>
            <TooltipTrigger asChild>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    setSearch("")
                    setCourse("")
                    setYear("")
                    setStatus("")
                    setPage(0)
                }}
                >
                <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Filters</TooltipContent>
            </Tooltip>
        </div>
        </div>



        {/* ✅ VOTERS TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.map((voter) => (
              <TableRow key={voter.id}>
                <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                    {voter.avatar ? (
                        <AvatarImage src={voter.avatar} />
                    ) : (
                        <AvatarFallback>{getInitials(voter.name)}</AvatarFallback>
                    )}
                    </Avatar>
                    <div>
                    <div className="text-base font-semibold">{voter.name}</div>
                    <div className="text-sm text-muted-foreground">student@school.edu</div>
                    </div>
                </div>
                </TableCell>

                <TableCell>{voter.studentId}</TableCell>
                <TableCell>{voter.course}</TableCell>
                <TableCell>{voter.year}</TableCell>
                <TableCell>
                  <Badge
                    variant={voter.status === "Eligible" ? "default" : "destructive"}
                  >
                    {voter.status}
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
            disabled={(page + 1) * ITEMS_PER_PAGE >= filteredVoters.length}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
