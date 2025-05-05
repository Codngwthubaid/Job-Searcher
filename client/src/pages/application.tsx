import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useAppContext } from "@/Provider"
import { useAuth } from "@clerk/clerk-react"
import { toast } from "sonner";
import axios from "axios";
import moment from "moment";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";


export default function Applications() {
    const [isLoading, setIsLoading] = useState(false);
    const [resume, setResume] = useState<File | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const { getToken } = useAuth()

    const { userData, backendUrl, userApplications, fetchUserData } = useAppContext()

    const updateResume = async () => {
        try {

            const token = await getToken()
            const formData = new FormData();
            formData.append("resume", resume!);
            const { data } = await axios.post(backendUrl + "/users/updateResume", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) {
                toast.success(data.message)
                await fetchUserData()
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            console.log(error)
            toast.error(error)
        }

        setIsSaved(false);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResume(file);
            setIsSaved(false);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }
    };

    const handleDownload = () => {
        if (resume) {
            const url = URL.createObjectURL(resume);
            const link = document.createElement("a");
            link.href = url;
            link.download = resume.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const handleSave = async () => {
        if (!resume) {
            toast.error("No resume selected");
            return;
        }

        setIsLoading(true);
        await updateResume();
        setIsSaved(true);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen" >
                    <Loader className="animate-spin text-blue-500 size-16" />
                </div>
            ) : (
                <div>
                    <Navbar />
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>

                        {!resume && (
                            <div className="flex gap-x-3 items-center">
                                <Label htmlFor="resumeUpload" className="text-sm font-medium">Upload File</Label>
                                <Button onClick={triggerFileInput} variant="default" className="cursor-pointer">
                                    Choose File
                                </Button>
                            </div>
                        )}

                        {resume && (
                            <div className="mt-4 flex flex-col gap-3">
                                <p className="text-md font-medium text-gray-700">
                                    Selected File: <span className="text-blue-600">{resume.name}</span>
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link to={userData?.resume}>
                                        <Button
                                            onClick={handleDownload}
                                            variant="default" className="cursor-pointer"
                                            disabled={!resume}
                                        >
                                            Download Resume
                                        </Button>
                                    </Link>
                                    <Button onClick={triggerFileInput}
                                        className="cursor-pointer"
                                        variant="secondary">
                                        Reselect
                                    </Button>
                                    {!isSaved ? (
                                        <Button
                                            className="cursor-pointer"
                                            onClick={handleSave}
                                            variant="outline" disabled={isLoading}>
                                            {isLoading ? "Saving..." : "Save Resume"}
                                        </Button>
                                    ) : (
                                        <Button disabled variant="outline" className="cursor-pointer text-green-600 border-green-400">
                                            Resume Saved ✅
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}


                        <Input
                            id="resumeUpload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="hidden"
                        />

                        <h2 className="text-2xl font-bold my-5">Applied Jobs</h2>
                        <Table className="w-full border border-gray-200 rounded-md shadow-sm overflow-hidden">
                            <TableHeader className="bg-blue-50">
                                <TableRow className="">
                                    <TableHead className="w-[150px] text-gray-700 text-xl font-semibold px-4 py-3">Company</TableHead>
                                    <TableHead className="text-gray-700 text-xl font-semibold px-4 py-3">Job Title</TableHead>
                                    <TableHead className="text-gray-700 text-xl font-semibold px-4 py-3 max-sm:hidden">Location</TableHead>
                                    <TableHead className="text-gray-700 text-xl font-semibold px-4 py-3 max-sm:hidden">Date</TableHead>
                                    <TableHead className="text-right text-gray-700 text-xl font-semibold px-4 py-3">Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {userApplications.map((job: any, index: number) => (
                                    <TableRow
                                        key={index}
                                        className="hover:bg-blue-50 transition-colors duration-200"
                                    >
                                        <TableCell className="px-4 py-3 font-medium text-gray-800">
                                            <div className="flex items-center gap-x-2">
                                                {job?.companyId?.image && <img src={job.companyId.image} alt={job.companyId.name} className="w-8 h-8 rounded-full" />}
                                                {job?.companyId?.name && <p className="text-base font-bold">{job.companyId.name}</p>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700">{job?.jobId?.title}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700 max-sm:hidden">{job?.jobId?.location}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-700 max-sm:hidden">{moment(job?.date).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell className={`px-4 py-3 text-right text-gray-700 ${job?.status === "Pending" ? "text-blue-600" : job?.status === "Rejected" ? "text-red-600" : job?.status === "Accepted" && "text-green-600"}`}>{job?.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}
