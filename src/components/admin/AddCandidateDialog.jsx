import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Upload, UserPlus } from "lucide-react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useState, useRef } from "react"

const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor", "PRO"]
const parties = ["Independent", "Partido Juan", "Partido Bayan", "United Alliance"]

export default function AddCandidateDialog() {
    const [open, setOpen] = useState(false)
    const [candidateName, setCandidateName] = useState("")
    const [position, setPosition] = useState("")
    const [party, setParty] = useState("")
    const [photo, setPhoto] = useState(null)

    const inputRef = useRef()


    const [photoURL, setPhotoURL] = useState(null) // Store preview URL separately


    const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
        const newUrl = URL.createObjectURL(file)
        if (photoURL) URL.revokeObjectURL(photoURL) // Clean old
        setPhoto(file)
        setPhotoURL(newUrl)
    }
    }

    const clearPhoto = () => {
    if (photoURL) {
        URL.revokeObjectURL(photoURL)
        setPhotoURL(null)
    }


    setPhoto(null)
    if (inputRef.current) inputRef.current.value = null
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Candidate
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Candidate</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new candidate.
          </DialogDescription>
        </DialogHeader>

        {/* Upload Photo */}
        <div className="space-y-2 text-center">
        <Label className="text-md">Candidate Photo</Label>

        <div className="flex flex-col items-center justify-center gap-3">
            {/* ✅ Manual image/fallback */}
            <div className="w-24 h-24 rounded-full border flex items-center justify-center overflow-hidden bg-muted text-2xl font-bold">
            {photoURL ? (
                <img
                src={photoURL}
                alt="Preview"
                className="w-full h-full object-cover"
                />
            ) : (
                <span>?</span>
            )}
            </div>

            <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => inputRef.current?.click()}
            >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
            </Button>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {photoURL && (
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearPhoto}
                    className="group"
                    >
                    <Trash2 className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Remove photo</TooltipContent>
                </Tooltip>
            )}
            </div>
        </div>
        </div>


        {/* Candidate Name */}
        <div className=" space-y-1">
          <Label htmlFor="candidateName">Candidate Name</Label>
          <Input
            id="candidateName"
            placeholder="Enter full name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
        </div>

        {/* Position */}
        <div className=" space-y-1">
          <Label>Position</Label>
          <Select onValueChange={(value) => setPosition(value)} value={position}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Political Party */}
        <div className=" space-y-1">
          <Label>Political Party</Label>
          <Select onValueChange={(value) => setParty(value)} value={party}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select political party" />
            </SelectTrigger>
            <SelectContent>
              {parties.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
        <Button className="w-full" onClick={() => console.log("Submit candidate")}>
            <UserPlus className="w-4 h-4 mr-2" />
            Save Candidate
        </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
