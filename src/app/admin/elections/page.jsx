import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ElectionSidebar } from "@/components/admin/election-sidebar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

import { Pencil, Trash2, Settings, BadgeCheck, Clock, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"

import { CreateElectionWizard } from "@/components/admin/create-election-wizard"

export default function ElectionPage() {
  const [page, setPage] = useState(1)

  const elections = [
    {
      id: "ucsg-2020",
      name: "Barangay 2025 Elections",
      start: "2025-08-01",
      end: "2025-08-15",
      type: "University",
      candidates: "100",
      voters: "350",
      status: "OnGoing",
    },
    {
      id: "cics-2021",
      name: "SK 2025 Elections",
      start: "2025-09-01",
      end: "2025-09-05",
      type: "Classroom",
      candidates: "100",
      voters: "500",
      status: "Upcoming",
    },
    {
      id: "cics-2022",
      name: "Mock Elections",
      start: "2025-07-01",
      end: "2025-07-07",
      type: "Department",
      candidates: "50",
      voters: "609",
      status: "Completed",
    },
  ]

  return (
    <SidebarProvider>
      <ElectionSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Elections</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-2xl font-bold">Election Management</h1>
            <p className="text-muted-foreground">Manage and monitor all election events here.</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-lg font-semibold">Election List</h2>
            <CreateElectionWizard />
          </div>

          <div className="rounded-xl border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Election Name</TableHead>
                  <TableHead>Type of Election</TableHead>
                  <TableHead>Start/End Date</TableHead>
                  <TableHead className="text-center">Number of Candidates</TableHead>
                  <TableHead className="text-center">Registered Voters</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {elections.map((election) => (
                  <TableRow key={election.id}>
                    <TableCell className="font-bold p-3 text-medium cursor-pointer">{election.name}</TableCell>
                    <TableCell>{election.type}</TableCell>
                    <TableCell>{election.start} - {election.end}</TableCell>
                    
                    <TableCell className="text-center">{election.candidates}</TableCell>
                    <TableCell className="text-center">{election.voters}</TableCell>
                    <TableCell className="text-center">
                      {election.status === "OnGoing" && (
                        <Badge className="bg-yellow-500 text-white dark:bg-yellow-600 cursor-pointer">
                          <Clock className="w-4 h-4 mr-1" />
                          Ongoing
                        </Badge>
                      )}
                      {election.status === "Upcoming" && (
                        <Badge className="bg-blue-500 text-white dark:bg-blue-600 cursor-pointer">
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Upcoming
                        </Badge>
                      )}
                      {election.status === "Completed" && (
                        <Badge className="bg-green-500 text-white dark:bg-green-600 cursor-pointer">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1 cursor-pointer">
                        <Settings className="w-4 h-4" />
                        <Link to={`/admin/election/${election.id}`}>Manage</Link>
                        
                      </Button>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Pencil className="w-4 h-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">Edit Details</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">Delete Election</TooltipContent>
                        </Tooltip>

                      </TooltipProvider>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">Page {page}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
