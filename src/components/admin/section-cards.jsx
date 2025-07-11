import { TrendingUp, TrendingDown, Users, Vote, BarChart, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const cardData = [
  {
    title: "Total Voters",
    value: "$1,250.00",
    icon: <Users className="h-4 w-4" />,
    description: "Visitors for the last 6 months",
    gradient: true
  },
  {
    title: "Vote Cast",
    value: "1,234",
    icon: <Vote className="h-4 w-4" />,
    description: "Acquisition needs attention"
    
  },
  {
    title: "Voter Turnout",
    value: "45,678",
    icon: <BarChart className="h-4 w-4" />,
    description: "Engagement exceed targets"
  },
  {
    title: "Total Candidates",
    value: "4.5%",
    icon: <UserCheck className="h-4 w-4" />,
    description: "Meets growth projections"
  }
];

export function SectionCards() {
  return (
    <div className="flex flex-wrap gap-4">
      {cardData.map((card, index) => (
        <Card 
          key={index}
          className={`flex-1 min-w-[250px] max-w-[400px] @container/card bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"`}
        >
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge 
                variant="outline" 
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                {card.icon}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              {card.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}