
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
import { useAppContext } from "@/Provider"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export default function ManageJobs() {

    const { backendUrl, companyToken } = useAppContext()
    interface Job {
        _id: string;
        title: string;
        date: string;
        location: string;
        applications: number;
        available: boolean
    }

    const [isJobs, setIsJobs] = useState<Job[]>([])


    const fetchJobsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/company/getCompanyPostedJobs", {
                headers: {
                    Token: `${companyToken}`
                }
            })
            if (data.success) {
                setIsJobs(data.jobsData.reverse())
                toast.success(data.message)
                console.log(data.jobsData)
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        }
    }

    const onToggleStatus = async (id: string) => {
        try {

            const { data } = await axios.post(backendUrl + "/company/getChangeAvailabilityOfPostedJob",
                { id },
                {
                    headers: {
                        Token: `${companyToken}`
                    }
                })

            if (data.success) {
                console.log(data)
                toast.success(data.message)
                fetchJobsData()
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error)
        }
    }


    useEffect(() => {
        fetchJobsData()
    }, [])

    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Manage Jobs</h2>
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
                            isJobs.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium flex items-center gap-x-2">{item.title}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>{item.applications}</TableCell>
                                    <TableCell>
                                        <Checkbox onClick={() => onToggleStatus(item._id)} className="cursor-pointer" checked={item.available} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </ScrollArea>
            </Table>
            <div className="flex justify-end mt-6">
                <Link to="/dashboard/add-job">
                    <Button className="cursor-pointer bg-blue-500" onClick={fetchJobsData}>Add Job</Button>
                </Link>
            </div>
        </div>
    )
}