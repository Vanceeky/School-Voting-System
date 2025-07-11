import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Palette, Info, Trash2,Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { format } from "date-fns"

export function CreateElectionWizard() {
    const [step, setStep] = useState(1)
    const [open, setOpen] = useState(false)

    // Form state
    const [electionName, setElectionName] = useState("")
    const [electionType, setElectionType] = useState("")
    const [academicYear, setAcademicYear] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [coverPhoto, setCoverPhoto] = useState(null)
    const [gradientStart, setGradientStart] = useState("#2563eb") // default blue
    const [gradientEnd, setGradientEnd] = useState("#FACC15")
    const [textColor, setTextColor] = useState("#ffffff")
    

  const isStep1Valid = electionName && electionType && academicYear && startDate && endDate

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white hover:bg-primary/90">+ Create Election</Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-5xl" style={{ maxWidth: "40vw" }}>
        <DialogHeader>
          <DialogTitle>Create New Election</DialogTitle>
          <DialogDescription>Follow the steps to set up a new election event.</DialogDescription>
        </DialogHeader>

        <div className="flex gap-6 mt-4">
          {/* Sidebar Steps */}
          <div className="w-35 border-r pr-4 text-sm font-medium space-y-2">
            <div className={`flex items-center gap-2 ${step === 1 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              <Info className="w-6 h-6" />
              Basic Info
            </div>
            <div className={`flex items-center gap-2 ${step === 2 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
              <Palette className="w-6 h-6" />
              Branding
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="electionName">Election Name</Label>
                  <Input
                    id="electionName"
                    placeholder="e.g. University Student Council"
                    className="w-full"
                    value={electionName}
                    onChange={(e) => setElectionName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="electionType">Election Type</Label>
                    <Select value={electionType} onValueChange={setElectionType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="barangay">Barangay</SelectItem>
                        <SelectItem value="sk">SK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 w-full">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      placeholder="e.g. 2025-2026"
                      className="w-full"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !startDate && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !endDate && "text-muted-foreground"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
            <div className="space-y-6">
                {/* Live Preview */}
                <div>
                    <Label className="mb-2 block">Live Landing Page Preview</Label>
                    <div
                        className="rounded-xl overflow-hidden w-full border shadow"
                        style={{
                        width: "100%",
                        height: "200px",
                        backgroundImage: coverPhoto
                            ? `url(${URL.createObjectURL(coverPhoto)})`
                            : `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: textColor,
                        }}
                    >
                        <h1 className="text-3xl font-bold">{electionName || "Election Title"}</h1>
                        <p className="text-lg">{academicYear || "Academic Year"}</p>
                    </div>
                </div>


        <Separator className="my-4 border-1 border-secondary" />

                {/* Campaign Description */}
                <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <textarea
                    id="description"
                    className="w-full min-h-[50px] rounded-md border px-2 py-2 text-sm"
                    placeholder="Describe your campaign goals, participants, etc."
                    required
                />
                <p className="text-sm text-muted-foreground">This will appear on the election landing page.</p>
                </div>

                    {/* Upload Cover Photo */}
                    <div className="space-y-2">
                    <Label htmlFor="coverPhoto" className="flex items-center justify-between">
                        <span>Upload Cover Photo</span>
                        {coverPhoto && (
                        <button
                            type="button"
                            onClick={() => setCoverPhoto(null)}
                            className="text-red-500 hover:text-red-700 flex items-center text-sm"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                        </button>
                        )}
                    </Label>

                    <Input
                        id="coverPhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverPhoto(e.target.files?.[0])}
                    />

                    <p className="text-sm text-muted-foreground">
                        If you upload a cover photo, it will override the gradient background in the preview.
                    </p>
                    </div>


                {/* Theme Customization */}
                <div className="space-y-4">
                <Label>Theme Customization</Label>
                <p className="text-sm text-muted-foreground">
                    Customize the landing page theme with a gradient. This will override the cover photo.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                    <Label htmlFor="startColor">Start</Label>
                    <Input
                        type="color"
                        id="startColor"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                    />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="endColor">End</Label>
                    <Input
                        type="color"
                        id="endColor"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                    />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="textColor">Text Color</Label>
                    <Input
                        type="color"
                        id="textColor"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                    />
                    </div>
                </div>
                </div>
            </div>
            )}

          </div>
        </div>

        <Separator className="my-4 border-1 border-secondary" />

        {/* Footer */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => (step === 1 ? setOpen(false) : setStep(step - 1))}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={() => (step === 1 ? setStep(2) : setOpen(false))}
            disabled={step === 1 && !isStep1Valid}
          >
            {step === 1 ? "Next" : "Save Election"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
