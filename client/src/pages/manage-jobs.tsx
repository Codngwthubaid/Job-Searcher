
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { manageJobsData } from "@/constants"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function ManageJobs() {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Upload a new job</h2>
            <Table>
                <TableCaption>A list of your recent jobs.</TableCaption>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Vacancy</TableHead>
                            <TableHead>Available</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            manageJobsData.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell className="font-medium">{item._id}</TableCell>
                                    <TableCell className="font-medium flex items-center gap-x-2">{item.title}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>{item.applicants}</TableCell>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </ScrollArea>
            </Table>
            <div className="flex justify-end mt-6">
                <Link to="/dashboard/add-job">
                    <Button className="cursor-pointer bg-blue-500">Add Job</Button>
                </Link>
            </div>
        </div>
    )
}