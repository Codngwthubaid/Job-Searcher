import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import { AuroraText } from "./magicui/aurora-text";
import { LocationEditIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { trustedCompaniesData } from "@/constants/index"
import { useAppContext } from "@/Provider";
import { useRef } from "react";



const firstRow = trustedCompaniesData.slice(0, trustedCompaniesData.length / 2);

const ReviewCard = ({
    img,
    username,
}: {
    img: string;
    username: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-36 md:w-52 cursor-pointer overflow-hidden rounded-xl p-2 md:p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="24" height="24" alt="" src={img} />
                <div className="flex flex-col">
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
        </div>
    );
}

export default function HeroSection() {
    const { setIsSearched, setIsSearchedFilter } = useAppContext();
    const jobTitleRef = useRef<HTMLInputElement>(null);
    const JobLocationRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        setIsSearched(true);
        setIsSearchedFilter({
            JobTitle: jobTitleRef.current?.value || "",
            JobLocation: JobLocationRef.current?.value || "",
        });
    };

    return (
        <div>
            <div className="mx-auto flex flex-col justify-center items-center gap-y-6 md:gap-y-10 bg-gradient-to-r from-blue-400 to-blue-600 h-[90vh] md:h-[60vh] border shadow-md">
                <div className="text-center px-4">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white leading-tight">
                        Welcome to Job Searcher Over 10000+ jobs to apply
                    </h1>
                    <p className="text-base md:text-lg text-white">
                        Your one-stop solution for finding jobs around the world
                    </p>
                    <p className="text-base md:text-lg text-white">
                        Explore the best job opportunities and take the first step towards your dream career
                    </p>
                </div>

                <div className="w-[90%] md:w-[80%] mx-auto rounded-lg my-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-x-3 text-white p-3 md:p-5 bg-white">
                    <div className="flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-x-3 w-full">
                        <div className="flex gap-x-2 items-center justify-center text-blue-600 w-full md:w-auto">
                            <Search className="w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search for jobs"
                                className="w-full md:w-60"
                                ref={jobTitleRef}
                            />
                        </div>
                        <div className="flex gap-x-2 items-center justify-center text-blue-600 w-full md:w-auto">
                            <LocationEditIcon className="w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Location"
                                className="w-full md:w-60"
                                ref={JobLocationRef}
                            />
                        </div>
                    </div>
                    <Button className="cursor-pointer w-full md:w-auto" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>

            <div className="w-[90%] md:w-[80%] mx-auto h-32 rounded-lg shadow-md my-5 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-x-3">
                <div className="mx-2 md:mx-5 px-2 md:px-5 font-bold text-lg md:text-xl">
                    <AuroraText>Trusted By</AuroraText>
                </div>
                <MarqueeDemo />
            </div>
        </div>
    );
}