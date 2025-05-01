import { useAppContext } from "@/Provider";
import { Button } from "./ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { AuroraText } from "./magicui/aurora-text";
import { JobCategories, JobLocations } from "@/constants";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";

export default function JobListing() {
    const { isSearchedFilter, isSearched, setIsSearchedFilter, isJobs } = useAppContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row w-full">
            <div className="md:hidden p-4">
                <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? "Close Filters" : "Open Filters"}
                </Button>
            </div>

            <div className={`m-10 p-4 rounded-lg shadow-md border md:w-[25%] h-fit bg-white ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                {isSearched && (isSearchedFilter.JobTitle !== "" || isSearchedFilter.JobLocation !== "") && (
                    <div>
                        <AuroraText className="text-2xl font-bold my-5">Current Search</AuroraText>
                        <div className="flex gap-x-3 items-center">
                            {isSearchedFilter.JobTitle && (
                                <div className="flex gap-1 items-center">
                                    <Button>{isSearchedFilter.JobTitle}</Button>
                                    <MdOutlineCancel
                                        className="cursor-pointer size-5 text-red-500"
                                        onClick={() =>
                                            setIsSearchedFilter({
                                                ...isSearchedFilter,
                                                JobTitle: "",
                                            })
                                        }
                                    />
                                </div>
                            )}

                            {isSearchedFilter.JobLocation && (
                                <div className="flex gap-1 items-center">
                                    <Button>{isSearchedFilter.JobLocation}</Button>
                                    <MdOutlineCancel
                                        className="cursor-pointer size-5 text-red-500"
                                        onClick={() =>
                                            setIsSearchedFilter({
                                                ...isSearchedFilter,
                                                JobLocation: "",
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex md:flex-col justify-center items-center flex-row">
                    <div>
                        <AuroraText className="text-2xl font-bold my-5">Search by Categories</AuroraText>
                        <ul className="space-y-5">
                            {JobCategories.map((category) => (
                                <li key={category} className="flex items-center space-x-2">
                                    <Checkbox id={category} className="cursor-pointer" />
                                    <Label htmlFor={category} className="text-base cursor-pointer">
                                        {category}
                                    </Label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <AuroraText className="text-2xl font-bold my-5">Search by Locations</AuroraText>
                        <ul className="space-y-5">
                            {JobLocations.map((location) => (
                                <li key={location} className="flex items-center space-x-2">
                                    <Checkbox id={location} className="cursor-pointer" />
                                    <Label htmlFor={location} className="text-base cursor-pointer">
                                        {location}
                                    </Label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


            <div className="w-[90%] mx-auto md:w-[75%] my-10 md:mr-10 border rounded-lg p-4 shadow-md overflow-y-auto h-[calc(100vh-20px)]">
                <AuroraText className="text-4xl font-bold my-5">Latest Jobs</AuroraText>
                <p className="text-lg mb-5">Get your dream job from your dream companies</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isJobs.map((job: any) => (
                        <div key={job._id} className="border flex flex-col justify-between rounded-lg p-4 shadow-sm hover:shadow-md transition">
                            <div className="flex flex-col justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-x-3">
                                        <img className="text-sm text-muted-foreground" width="32" height="32" alt="" src={job.companyId.image} />
                                        <h2 className="text-xl font-semibold">{job.title}</h2>
                                    </div>
                                    <div className="flex gap-2 w-full">
                                        <p className="text-sm border p-1 font-medium text-muted-foreground">{job.location}</p>
                                        <p className="text-sm border p-1 font-medium text-muted-foreground">{job.level}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: job.description.slice(0, 200) }} />
                            <div className="flex justify-between items-center mt-3">
                                <Button className="cursor-pointer">Apply Now</Button>
                                <Button variant="link" className="text-blue-500 cursor-pointer">Learn More</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}