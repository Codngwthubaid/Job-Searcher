import { JobCategories, JobLocations, JobTypes, JobWorkSetting, JobExperienceLevel, JobH1Type, JobSalary } from "@/constants/index";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAppContext } from "@/Provider";


export default function Filters() {

    const { isJobs } = useAppContext()

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedWorkSetting, setSelectedWorkSetting] = useState<string[]>([]);
    const [selectedExperienceLevel, setSelectedExperienceLevel] = useState<string[]>([]);
    const [selectedH1Type, setSelectedH1Type] = useState<string[]>([]);
    const [selectedSalary, setSelectedSalary] = useState<string[] | any>([]);

    const [filteredJobs, setFilteredJobs] = useState(isJobs)

    const toggleSelect = (value: string, selected: string[], setSelected: any) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((v) => v !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    useEffect(() => {
        const matchesCategory = (job: any) =>
            selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const matchesLocation = (job: any) =>
            selectedLocations.length === 0 || selectedLocations.includes(job.location);

        const matchesJobTitle = (job: any) =>
            !isSearchedFilter.JobTitle ||
            job.title?.toLowerCase().includes(isSearchedFilter.JobTitle.toLowerCase());

        const matchesJobLocation = (job: any) =>
            !isSearchedFilter.JobLocation ||
            job.location?.toLowerCase().includes(isSearchedFilter.JobLocation.toLowerCase());

        const newFilteredJobs = isJobs
            .slice()
            .reverse()
            .filter(
                (job) =>
                    matchesCategory(job) &&
                    matchesLocation(job) &&
                    matchesJobTitle(job) &&
                    matchesJobLocation(job)
            );

        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    }, [isJobs, selectedCategories, selectedLocations, isSearchedFilter]);

    return (

        <div className="m-4 p-4 rounded-lg shadow-md border bg-white">
            <div className="flex gap-8 flex-wrap items-start">
                <div>
                    <div className="text-sm font-semibold mb-2">Filter by Category</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedCategories, setSelectedCategories)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedCategories.length > 0
                                    ? `${selectedCategories.length} selected`
                                    : "Select categories"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {selectedCategories.includes(category) ? "✅ " : ""}{category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div className="text-sm font-semibold mb-2">Filter by Job Type</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedTypes, setSelectedTypes)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedTypes.length > 0
                                    ? `${selectedTypes.length} selected`
                                    : "Select job types"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {selectedTypes.includes(type) ? "✅ " : ""}{type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div className="text-sm font-semibold mb-2">Filter by Work Setting</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedWorkSetting, setSelectedWorkSetting)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedWorkSetting.length > 0
                                    ? `${selectedWorkSetting.length} selected`
                                    : "Select work settings"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobWorkSetting.map((setting) => (
                                <SelectItem key={setting} value={setting}>
                                    {selectedWorkSetting.includes(setting) ? "✅ " : ""}{setting}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>

                    <div className="text-sm font-semibold mb-2">Filter by Experience Level</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedExperienceLevel, setSelectedExperienceLevel)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedExperienceLevel.length > 0
                                    ? `${selectedExperienceLevel.length} selected`
                                    : "Select experience levels"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobExperienceLevel.map((level) => (
                                <SelectItem key={level} value={level}>
                                    {selectedExperienceLevel.includes(level) ? "✅ " : ""}{level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>

                    <div className="text-sm font-semibold mb-2">Filter by H1 Type</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedH1Type, setSelectedH1Type)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedH1Type.length > 0
                                    ? `${selectedH1Type.length} selected`
                                    : "Select H1 types"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobH1Type.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {selectedH1Type.includes(type) ? "✅ " : ""}{type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div className="text-sm font-semibold mb-2">Filter by Salary</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedSalary, setSelectedSalary)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedSalary.length > 0
                                    ? `${selectedSalary.length} selected`
                                    : "Select salary ranges"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobSalary.map((salary) => (
                                <SelectItem key={salary} value={salary.toString()}>
                                    {selectedSalary.includes(salary) ? "✅ " : ""}{salary}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>

                    <div className="text-sm font-semibold mb-2">Filter by Location</div>
                    <Select
                        onValueChange={(value) => toggleSelect(value, selectedLocations, setSelectedLocations)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                selectedLocations.length > 0
                                    ? `${selectedLocations.length} selected`
                                    : "Select locations"
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {JobLocations.map((location) => (
                                <SelectItem key={location} value={location}>
                                    {selectedLocations.includes(location) ? "✅ " : ""}{location}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

        </div>
    )
}