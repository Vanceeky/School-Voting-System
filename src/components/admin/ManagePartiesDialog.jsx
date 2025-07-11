import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Settings, Trash2, Users } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Separator } from "@radix-ui/react-dropdown-menu"

// Simulated full list of candidates (import this or lift state if shared)
const allCandidates = [
  { name: "Maria Santos", party: "Independent" },
  { name: "John Reyes", party: "Partido Juan" },
  { name: "Anna Dela Cruz", party: "Partido Juan" },
  { name: "Carlos Mendoza", party: "Independent" },
  { name: "Julia Robles", party: "Partido Bayan" },
  { name: "Miguel Tan", party: "Partido Bayan" },
]

export default function ManagePartiesDialog() {
  const [open, setOpen] = useState(false)
  const [parties, setParties] = useState([
    "Partido Juan",
    "Partido Bayan",
    "United Alliance",
  ])
  const [inputValue, setInputValue] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const handleSubmit = () => {
    if (!inputValue.trim()) return

    if (isEditing && editIndex !== null) {
      const updated = [...parties]
      updated[editIndex] = inputValue
      setParties(updated)
      setIsEditing(false)
      setEditIndex(null)
    } else {
      setParties([...parties, inputValue])
    }

    setInputValue("")
  }

  const handleEdit = (index) => {
    setInputValue(parties[index])
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleDelete = (index) => {
    const updated = parties.filter((_, i) => i !== index)
    setParties(updated)
    if (isEditing && editIndex === index) {
      setIsEditing(false)
      setInputValue("")
      setEditIndex(null)
    }
  }

  // 🔢 Count candidates for a given party
  const countCandidatesForParty = (partyName) =>
    allCandidates.filter((c) => c.party === partyName).length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <Settings className="w-4 h-4 mr-2" />
          Manage Parties
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Political Parties</DialogTitle>
          <DialogDescription>
            View, add, edit, or delete political parties.
          </DialogDescription>
        </DialogHeader>


        {/* Party List with candidate count */}
        <div className="space-y-2">
          {parties.map((party, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-md px-3 py-2"
            >
              <div>
                <div className="font-medium">{party}</div>
                <div className="text-xs text-muted-foreground">
                  {countCandidatesForParty(party)} candidate
                  {countCandidatesForParty(party) !== 1 && "s"}
                </div>
              </div>
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(index)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        <Separator className="border-1 border-secondary" />

        {/* Input and Add/Edit Button */}
        <div className="flex items-center gap-2 mb-0">

            <Input
                placeholder="Enter party name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
            />

            {isEditing ? (
                <>
                <Button onClick={handleSubmit}>Update</Button>

                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        setIsEditing(false)
                        setInputValue("")
                        setEditIndex(null)
                    }}
                    className="group"
                    >
                    <span className="sr-only">Cancel Edit</span>
                    <Trash2 className="w-4 h-4 rotate-45 text-muted-foreground group-hover:text-red-500 transition-colors" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Cancel Edit</TooltipContent>
                </Tooltip>

                </>
            ) : (
                <Button onClick={handleSubmit}>Add</Button>
            )}
        </div>

        {/* ✅ Help Text */}
        <p className="text-xs text-muted-foreground">
        {isEditing
            ? "You are editing an existing political party. Click 'Cancel' to exit edit mode."
            : "Enter a new political party name and click 'Add' to save it."}
        </p>

        
      </DialogContent>
    </Dialog>
  )
}
