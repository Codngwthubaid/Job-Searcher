import { useAppContext } from "@/Provider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "@/assets/logo.gif";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CircleDollarSign, CircleUserRound, LocationEditIcon, ShoppingBag } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export interface JobData {
    _id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    level: string;
    date: number;
    category: string;
    companyId: {
        _id: string;
        name: string;
        email: string;
        image: string;
    };
}


export default function AppliedJobs() {
    const { id } = useParams();
    const { getToken } = useAuth()
    const navigate = useNavigate();
    const [jobData, setJobData] = useState<JobData | null>(null);
    const [isAllreadyApplied, setIsAllreadyApplied] = useState(false);
    const { isJobs, backendUrl, userData, userApplications, fetchUserJobApplicationsData } = useAppContext();


    const fetchJobDataById = async () => {
        try {

            const { data } = await axios.get(backendUrl + `/jobs/${id}`)
            if (data.success) {
                setJobData(data.job)
                toast.success(data.message)
                console.log(data)
            }
            else {
                toast.error(data.message)
            }


        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const applyHandler = async () => {
        try {

            if (!userData) return toast.error("Please login first");
            navigate("/applications")
            if (!userData.resume) return toast.error("Please upload your resume first");

            const token = await getToken()
            const { data } = await axios.post(backendUrl + `/users/applyForJob`,
                { jobId: jobData?._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (data.success) {
                toast.success(data.message)
                fetchUserJobApplicationsData()
                console.log(data)
            }
            else {
                toast.error(data.message)
            }



        } catch (error: any) {
            console.log(error)
            toast.error(error)
        }
    }

    const checkAllreadyApplied = () => {
        const hasApplied = userApplications.some((id) => id === jobData?._id);
        setIsAllreadyApplied(hasApplied);
    }

    useEffect(() => {
        if (userApplications.length > 0 && jobData) checkAllreadyApplied()
    }, [userApplications, jobData, id]);


    useEffect(() => {
        fetchJobDataById()
    }, [id]);

    return (
        <>
            <Navbar />
            {!jobData ? (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <img src={logo} alt="logo-loading" className="w-20" />
                    <p className="text-xl font-bold">Fetching data please wait ...</p>
                </div>
            ) : (
                <div className="mx-4 sm:mx-6 md:mx-10">
                    <div className="border rounded-lg shadow-md flex flex-col lg:flex-row justify-between items-center p-5 my-5">
                        <div className="flex flex-col sm:flex-row gap-4 items-center w-full lg:w-3/4">
                            <img
                                src={jobData?.companyId?.image}
                                alt="company-logo"
                                className="size-20 sm:size-28 border shadow-md rounded-full p-2"
                            />
                            <div className="flex flex-col gap-y-3 w-full">
                                <AuroraText className="font-bold text-2xl sm:text-3xl">
                                    {jobData.title}
                                </AuroraText>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base">
                                    <div className="flex gap-1 items-center">
                                        <ShoppingBag className="size-4 sm:size-5" />
                                        {jobData.companyId.name}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <LocationEditIcon className="size-4 sm:size-5" />
                                        {jobData.location}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <CircleUserRound className="size-4 sm:size-5" />
                                        {jobData.level}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <CircleDollarSign className="size-4 sm:size-5" />
                                        {jobData.salary}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3 items-center mt-4 lg:mt-0">
                            <p className="text-sm sm:text-base">Posted {moment(jobData.date).fromNow()}</p>
                            <Button className="cursor-pointer" onClick={applyHandler}>
                                {isAllreadyApplied ? "Allready Applied" : "Apply Now"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-6">
                        <div className="w-full lg:w-[70%]">
                            <h2 className="mt-8 mb-4 font-bold text-xl text-[#222] border-b-2 border-gray-300 pb-2">
                                Job Description
                            </h2>
                            <div className="description-container" dangerouslySetInnerHTML={{ __html: jobData.description }} />
                            <Button className="cursor-pointer px-10 py-6 text-base mt-4" onClick={applyHandler}>
                                {isAllreadyApplied ? "Allready Applied" : "Apply Now"}
                            </Button>
                        </div>

                        <div className="w-full lg:w-[30%]">
                            <h2 className="mt-8 mb-4 font-bold text-xl text-[#222] border-b-2 border-gray-300 pb-2">
                                More jobs from <AuroraText>{jobData.companyId.name}</AuroraText>
                            </h2>
                            {isJobs
                                .filter((job) => job.companyId.name === jobData.companyId.name && job._id !== id)
                                .slice(0, 3)
                                .map((job) => (
                                    <div
                                        key={job._id}
                                        className="border my-5 flex flex-col justify-between rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                    >
                                        <div className="flex flex-col mb-3">
                                            <div className="flex items-center gap-x-3">
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    alt=""
                                                    src={job.companyId.image}
                                                />
                                                <h2 className="text-lg font-semibold">{job.title}</h2>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <p className="text-sm border p-1 font-medium text-muted-foreground">{job.location}</p>
                                                <p className="text-sm border p-1 font-medium text-muted-foreground">{job.level}</p>
                                            </div>
                                        </div>
                                        <p
                                            className="text-sm mb-2"
                                            dangerouslySetInnerHTML={{ __html: job.description.slice(0, 200) }}
                                        />
                                        <div className="flex flex-wrap gap-2 justify-between items-center mt-3">
                                            <Button
                                                onClick={() => navigate(`/applied-jobs/${job._id}`)}
                                                className="cursor-pointer">
                                                Apply Now
                                            </Button>
                                            <Button
                                                onClick={() => navigate(`/applied-jobs/${job._id}`)}
                                                variant="link"
                                                className="text-blue-500 cursor-pointer"
                                            >
                                                Learn More
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
