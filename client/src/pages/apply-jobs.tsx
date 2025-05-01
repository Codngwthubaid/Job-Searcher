import { useAppContext } from "@/Provider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "@/assets/logo.gif";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, CircleUserRound, LocationEditIcon, ShoppingBag } from "lucide-react";
import moment from "moment";

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

    const [jobData, setJobData] = useState<JobData | null>(null);
    const { isJobs } = useAppContext();

    useEffect(() => {
        if (id && isJobs.length > 0) {
            const job = isJobs.find((job) => job._id === id);
            if (job) {
                setJobData(job);
                console.log("Job found:", job);
            } else {
                console.warn("No job found for ID:", id);
            }
        }
    }, [id, isJobs]);

    return (
        <>
            {!jobData ? (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <img src={logo} alt="logo-loading" className="w-20" />
                    <p className="text-xl font-bold">Fetching data please wait ...</p>
                </div>
            ) : (
                <div className="mx-10">
                    <div className="border rounded-lg shadow-md flex justify-between items-center p-5 my-5 h-44">
                        <div className="flex gap-3 items-center">
                            <img src={jobData?.companyId?.image} alt="company-logo" className="w-32 border shadow-md rounded-full p-2" />
                            <div className="flex flex-col gap-y-3">
                                <div className="font-bold text-3xl">{jobData.title}</div>
                                <div className="flex items-center gap-x-5">
                                    <div className="flex gap-x-1 items-center"><ShoppingBag className="size-5" />{jobData.companyId.name}</div>
                                    <div className="flex gap-x-1 items-center"><LocationEditIcon className="size-5" />{jobData.location}</div>
                                    <div className="flex gap-x-1 items-center"><CircleUserRound className="size-5" />{jobData.level}</div>
                                    <div className="flex gap-x-1 items-center"><CircleDollarSign className="size-5" /> {jobData.salary}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3 items-center">
                            <p>Posted {moment(jobData.date).fromNow()}</p>
                            <Button className="cursor-pointer">Apply Now</Button>
                        </div>
                    </div>


                    <div className="flex w-full justify-between items-start gap-3">
                        <div className="w-[70%]">
                            <h2 className="mt-8 mb-4 font-bold ml-4 text-xl text-[#222] w-[97%] border-b-2 border-gray-300 pb-2">Job Description</h2>
                            <div className="description-container " dangerouslySetInnerHTML={{ __html: jobData.description }} />
                            <Button className="cursor-pointer px-10 py-6 text-base">Apply Now</Button>
                        </div>
                        <div className="w-[30%]">
                            <h2>More Jobs from {jobData.companyId.name}</h2>
                            {isJobs.filter((job) => job.companyId.name === jobData.companyId.name).map((job) => (
                                <div key={job._id} className="border rounded-lg shadow-md flex justify-between items-center p-5 my-5 h-44">
                                    <div className="flex gap-3 items-center">
                                        <img src={job.companyId.image} alt="company-logo" className="w-32 border shadow-md rounded-full p-2" />
                                        <div className="flex flex-col gap-y-3">
                                            <div className="font-bold text-3xl">{job.title}</div>
                                            <div className="flex items-center gap-x-5">
                                                <div className="flex gap-x-1 items-center"><ShoppingBag className="size-5" />{job.companyId.name}</div>
                                                <div className="flex gap-x-1 items-center"><LocationEditIcon className="size-5" />{job.location}</div>
                                                <div className="flex gap-x-1 items-center"><CircleUserRound className="size-5" />{job.level}</div>
                                                <div className="flex gap-x-1 items-center"><CircleDollarSign className="size-5" /> {job.salary}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
