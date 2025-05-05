import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppContext } from "@/Provider";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import moment from "moment";

export default function ManageJobs() {
    const { backendUrl, companyToken } = useAppContext();

    interface Job {
        _id: string;
        title: string;
        date: string;
        location: string;
        applications: number;
        available: boolean;
    }

    const [isJobs, setIsJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchJobsData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${backendUrl}/company/getCompanyPostedJobs`,
                { headers: { Token: `${companyToken}` } }
            );
            if (data.success) {
                setIsJobs(data.jobsData.reverse());
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    const onToggleStatus = async (id: string) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/company/getChangeAvailabilityOfPostedJob`,
                { id },
                { headers: { Token: `${companyToken}` } }
            );
            if (data.success) {
                toast.success(data.message);
                fetchJobsData();
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Error toggling status");
        }
    };

    useEffect(() => {
        fetchJobsData();
    }, []);

    return loading ? (
        <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin text-blue-500 size-16" />
        </div>
    ) : (
        <div className="w-full px-4 sm:px-6 lg:px-8 h-full">
            <h2 className="text-2xl font-semibold mb-6">Manage Jobs</h2>
            <ScrollArea className="max-h-[calc(100vh-300px)] sm:max-h-full overflow-y-auto">
                <div className="overflow-x-auto rounded-md shadow-sm">
                    <Table className="w-full text-sm">
                        <TableCaption>A list of your recent jobs.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="sm:table-cell">Date</TableHead>
                                <TableHead className="md:table-cell">Location</TableHead>
                                <TableHead className="md:table-cell">Applicants</TableHead>
                                <TableHead>Available</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isJobs.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="flex items-center gap-x-2">{item.title}</TableCell>
                                    <TableCell className="sm:table-cell">{moment(item.date).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell className="md:table-cell">{item.location}</TableCell>
                                    <TableCell className="md:table-cell">{item.applications}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            onClick={() => onToggleStatus(item._id)}
                                            className="cursor-pointer"
                                            checked={item.available}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </ScrollArea>
            <div className="flex justify-end mt-6">
                <Link to="/dashboard/add-job">
                    <Button className="bg-blue-500 cursor-pointer hover:bg-blue-600">Add Job</Button>
                </Link>
            </div>
        </div>
    );
}
