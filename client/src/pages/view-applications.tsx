import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { viewApplicationsPageData } from "@/constants/index"
import { Download } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function ViewApplications() {
    return (

        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">View Applicants</h2>
            <Table>
                <TableCaption>A list of your recent applications.</TableCaption>
                <ScrollArea className="h-[calc(100vh-200px)] max-h-[calc(100vh-200px)]]">
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                    <TableBody>
                        {
                            viewApplicationsPageData.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">{item._id}</TableCell>
                                    <TableCell className="font-medium flex items-center gap-x-2">
                                        <img src={item.imgSrc} alt={item.name} width={30} height={30} />
                                        <span>{item.name}</span>
                                    </TableCell>
                                    <TableCell>{item.jobTitle}</TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>
                                        <Button className="bg-blue-500 cursor-pointer">
                                            <Download /> Resume
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <HoverCard>
                                            <HoverCardTrigger className="text-blue-500 cursor-pointer">...</HoverCardTrigger>
                                            <HoverCardContent className="flex flex-col gap-y-2">
                                                <Button  className="bg-emerald-500 cursor-pointer">Accept</Button>
                                                <Button  className="bg-red-500 cursor-pointer">Reject</Button>
                                            </HoverCardContent>
                                        </HoverCard>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </ScrollArea>
            </Table>
        </div>
    )
}
