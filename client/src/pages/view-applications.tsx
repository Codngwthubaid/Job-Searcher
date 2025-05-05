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
import { Download, Loader } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppContext } from "@/Provider"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export default function ViewApplications() {

    const [applications, setApplications] = useState<{ jobId?: { title: string; location: string }; userId?: { name: string; image: string } }[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { backendUrl, companyToken } = useAppContext()
    console.log("applications:", applications)

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(backendUrl + "/company/getCompanyJobApplications", {
                headers: {
                    Token: `${companyToken}`
                }
            })
            if (data.success) {
                setApplications(data.applications)
                toast.success(data.message)
                console.log(data.applications)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const updateApplicationStatus = async (id: string, status: string) => {
        try {
            const { data } = await axios.post(backendUrl + "/company/getChangeJobApplicationStatus", { id, status }, {
                headers: {
                    Token: `${companyToken}`
                }
            })
            if (data.success) {
                toast.success(data.message)
                fetchApplications()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (companyToken) fetchApplications();
    }, [companyToken])


    return (

        loading ? (
            <div className="flex justify-center items-center h-full" >
                <Loader className="animate-spin text-blue-500 size-16" />
            </div>
        ) : (
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
                                (applications.filter(item => item?.jobId && item?.userId)).map((application: any, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index}</TableCell>
                                        <TableCell className="font-medium flex items-center gap-x-2">
                                            <img src={application?.userId?.image} alt={application?.userId?.name} width={30} height={30} />
                                            <span>{application?.userId?.name}</span>
                                        </TableCell>
                                        <TableCell>{application?.jobId?.title}</TableCell>
                                        <TableCell>{application?.jobId?.location}</TableCell>
                                        <TableCell>
                                            <Link to={`${application?.userId?.resume}`}>
                                                <Button className="bg-blue-500 cursor-pointer">
                                                    <Download /> Resume
                                                </Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {application.status === "Pending" ? (
                                                <HoverCard>
                                                    <HoverCardTrigger className="text-blue-500 cursor-pointer">...</HoverCardTrigger>
                                                    <HoverCardContent className="flex flex-col gap-y-2">
                                                        <Button onClick={() => updateApplicationStatus(application._id, "Accepted")} className="bg-emerald-500 cursor-pointer">Accept</Button>
                                                        <Button onClick={() => updateApplicationStatus(application._id, "Rejected")} className="bg-red-500 cursor-pointer">Reject</Button>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            ) : (
                                                <span className={`font-medium ${application.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                                                    {application.status}
                                                </span>
                                            )}

                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </ScrollArea>
                </Table>
            </div>
        )
    )
}
