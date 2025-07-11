import { LogIn, Vote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function VoterLoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Vote className="size-4" />
            </div>
            Voting System
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">UCSG Election 2025-2026</h1>
                    <p className="text-muted-foreground text-sm text-balance mb-3">
                    Enter your credentials to cast your vote.
                    </p>
                </div>

                <div className="grid gap-6">
                    <div className="grid gap-3">
                    <Label htmlFor="username">Student ID</Label>
                    <Input id="username" type="text" placeholder="e.g. 18-9398-54S" required />
                    </div>
                    <div className="grid gap-3">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" placeholder="Enter your system-generated password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        <LogIn className="h-4 w-4" />
                        Login to Vote
                    </Button>

                </div>


            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
