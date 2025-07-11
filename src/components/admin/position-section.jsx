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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Plus, ListChecks, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

const defaultPositions = [
  { id: 1, name: "President", maxWinners: 1 },
  { id: 2, name: "Vice President", maxWinners: 1 },
  { id: 3, name: "Secretary", maxWinners: 1 },
  { id: 4, name: "Treasurer", maxWinners: 1 },
  { id: 5, name: "Auditor", maxWinners: 1 },
  { id: 6, name: "PRO", maxWinners: 2 },
]

function PositionsCard() {
  const [positions, setPositions] = useState(defaultPositions)
  const [open, setOpen] = useState(false)
  const [editingPosition, setEditingPosition] = useState(null)
  const [positionName, setPositionName] = useState("")
  const [maxWinners, setMaxWinners] = useState("")

  const resetForm = () => {
    setEditingPosition(null)
    setPositionName("")
    setMaxWinners("")
  }

  const openAddDialog = () => {
    resetForm()
    setOpen(true)
  }

  const openEditDialog = (position) => {
    setEditingPosition(position)
    setPositionName(position.name)
    setMaxWinners(position.maxWinners.toString())
    setOpen(true)
  }

  const handleSave = () => {
    if (!positionName || !maxWinners) return

    if (editingPosition) {
      setPositions((prev) =>
        prev.map((pos) =>
          pos.id === editingPosition.id
            ? { ...pos, name: positionName, maxWinners: parseInt(maxWinners) }
            : pos
        )
      )
    } else {
      const newPosition = {
        id: Date.now(),
        name: positionName,
        maxWinners: parseInt(maxWinners),
      }
      setPositions((prev) => [...prev, newPosition])
    }

    setOpen(false)
    resetForm()
  }

  return (
    <>
      <Card className="h-full flex flex-col">
        {/* ✅ Card Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Positions</CardTitle>
            </div>
            <Button size="sm" onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Position
            </Button>
          </div>
          <CardDescription className="text-sm text-muted-foreground">
            Define the roles candidates can run for.
          </CardDescription>
        </CardHeader>

        {/* ✅ Table Content with Sticky Headers */}
        <CardContent className="overflow-auto max-h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead className="text-center">Max Winners</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((pos) => (
                <TableRow key={pos.id} className="cursor-pointer">
                  <TableCell className="font-semibold">{pos.name}</TableCell>
                  <TableCell className="text-center">{pos.maxWinners}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(pos)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setPositions((prev) =>
                                prev.filter((p) => p.id !== pos.id)
                              )
                            }
                          >
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
        </CardContent>
      </Card>

      {/* ✅ Shared Dialog for Add/Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editingPosition ? "Edit Position" : "Add Position"}
            </DialogTitle>
            <DialogDescription>
              {editingPosition
                ? "Update the details of this position."
                : "Add a new position for the election."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="position-name">Position Name</Label>
              <Input
                id="position-name"
                placeholder="e.g. President"
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="max-winners">Max Winners</Label>
              <Input
                id="max-winners"
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={maxWinners}
                onChange={(e) => setMaxWinners(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button className="w-full mt-2" onClick={handleSave}>
              {editingPosition ? "Update Position" : "Save Position"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PositionsCard
