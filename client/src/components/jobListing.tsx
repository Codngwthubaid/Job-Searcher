import { useAppContext } from "@/Provider";
import { Button } from "./ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { AuroraText } from "./magicui/aurora-text";
import { JobCategories, JobLocations } from "@/constants";
import { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";

export default function JobListing() {
    const { isSearchedFilter, isSearched, setIsSearchedFilter, isJobs } = useAppContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSelectedCategory, setIsSelectedCategory] = useState<string[]>([]);
    const [isSelectedLocation, setIsSelectedLocation] = useState<string[]>([]);
    const [isFilteredJobs, setIsFilteredJobs] = useState(isJobs);

    const navigate = useNavigate();
    const jobsPerPage = 6;
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = isFilteredJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(isFilteredJobs.length / jobsPerPage);

    const handleCategoryChange = (category: string) => {
        setIsSelectedCategory((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    const handleLocationChange = (location: string) => {
        setIsSelectedLocation((prev) =>
            prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
        );
    };

    useEffect(() => {
        const matchesCategory = (job: any) =>
            isSelectedCategory.length === 0 || isSelectedCategory.includes(job.category);

        const matchesLocation = (job: any) =>
            isSelectedLocation.length === 0 || isSelectedLocation.includes(job.location);

        const matchesJobTitle = (job: any) =>
            !isSearchedFilter.JobTitle ||
            job.title?.toLowerCase().includes(isSearchedFilter.JobTitle.toLowerCase());

        const matchesJobLocation = (job: any) =>
            !isSearchedFilter.JobLocation ||
            job.location?.toLowerCase().includes(isSearchedFilter.JobLocation.toLowerCase());

        const newFilteredJobs = isJobs.slice().reverse().filter((job) =>
            matchesCategory(job) && matchesLocation(job) && matchesJobTitle(job) && matchesJobLocation(job)
        );

        setIsFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    }, [isJobs, isSelectedCategory, isSelectedLocation, isSearchedFilter]);

    return (
        <div className="flex flex-col w-full">
            {isSearched && (isSearchedFilter.JobTitle || isSearchedFilter.JobLocation) && (
                <div className="m-4 md:mx-10 bg-white p-4 rounded-lg shadow-md border">
                    <AuroraText className="text-2xl font-bold mb-4">Current Search</AuroraText>
                    <div className="flex flex-wrap gap-3 items-center">
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

            <div className="flex flex-col md:flex-row w-full">
                <div className="md:hidden p-4">
                    <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? "Close Filters" : "Open Filters"}
                    </Button>
                </div>

                <div
                    className={`m-4 md:m-10 p-4 rounded-lg shadow-md border md:w-[25%] h-fit bg-white ${isSidebarOpen ? "block" : "hidden"
                        } md:block`}
                >
                    <div className="flex md:flex-col justify-center items-center flex-row gap-10">
                        <div>
                            <AuroraText className="text-2xl font-bold my-5">Search by Categories</AuroraText>
                            <ul className="space-y-5">
                                {JobCategories.map((category) => (
                                    <li key={category} className="flex items-center space-x-2">
                                        <Input
                                            id={category}
                                            className="size-5 cursor-pointer"
                                            type="checkbox"
                                            onChange={() => handleCategoryChange(category)}
                                            checked={isSelectedCategory.includes(category)}
                                        />
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
                                        <Input
                                            id={location}
                                            className="cursor-pointer size-5"
                                            type="checkbox"
                                            onChange={() => handleLocationChange(location)}
                                            checked={isSelectedLocation.includes(location)}
                                        />
                                        <Label htmlFor={location} className="text-base cursor-pointer">
                                            {location}
                                        </Label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-[90%] mx-auto md:w-[75%] my-10 md:mr-10 rounded-lg p-4 overflow-y-auto h-fit">
                    <AuroraText className="text-4xl font-bold my-5">Latest Jobs</AuroraText>
                    <p className="text-lg mb-5">Get your dream job from your dream companies</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentJobs.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500">No jobs found. Try different filters.</div>
                        ) : (
                            currentJobs.map((job: any) => (
                                <div
                                    key={job._id}
                                    className="border flex flex-col justify-between rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex flex-col justify-between items-start mb-3">
                                        <div>
                                            <div className="flex items-center gap-x-3">
                                                <img
                                                    className="text-sm text-muted-foreground"
                                                    width="32"
                                                    height="32"
                                                    alt=""
                                                    src={job.companyId.image}
                                                />
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
                                        <Button onClick={() => navigate(`/applied-jobs/${job._id}`)} className="cursor-pointer">Apply Now</Button>
                                        <Button onClick={() => navigate(`/applied-jobs/${job._id}`)} variant="link" className="text-blue-500 cursor-pointer">Learn More</Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {totalPages > 1 && (
                        <Pagination className="mt-8">
                            <PaginationContent className="flex gap-2 justify-center">
                                <PaginationItem>
                                    <PaginationPrevious
                                        className="cursor-pointer"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    />
                                </PaginationItem>

                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem
                                        key={index}
                                        className={`cursor-pointer px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                                            }`}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        className="cursor-pointer"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>
        </div>
    );
}
