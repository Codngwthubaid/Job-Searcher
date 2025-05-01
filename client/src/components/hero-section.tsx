import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import { AuroraText } from "./magicui/aurora-text";
import { LocationEditIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { companies } from "@/constants/index";
import { useAppContext } from "@/Provider";
import { useRef, useState } from "react";

const trustedCompaniesData = [
    {
        img: companies.amazon,
        username: "Amazon",
    },
    {
        img: companies.google,
        username: "Google",
    },
    {
        img: companies.microsoft,
        username: "Microsoft",
    },
    {
        img: companies.discord,
        username: "Discord",
    },
    {
        img: companies.stripe,
        username: "Stripe",
    },
    {
        img: companies.apple,
        username: "Apple",
    },
    {
        img: companies.walmart,
        username: "Walmart",
    },
];

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
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
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
    }

    return (
        <div>
            <div className="mx-auto flex-col flex justify-center items-center gap-y-10 bg-gradient-to-r from-blue-400 to-blue-600 h-[60vh] border">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-white">
                        Welcome to Job Searcher | Over 10000+ jobs to apply
                    </h1>
                    <p className="text-lg text-white">
                        Your one-stop solution for finding jobs around the world
                    </p>
                    <p className="text-lg text-white">
                        Explore the best job opportunities and take the first step towards your dream career
                    </p>
                </div>

                <div className="w-[80%] mx-auto rounded-lg my-5 flex justify-between items-center gap-x-3 text-white p-5 bg-white">
                    <div className="flex justify-center items-center gap-x-3">
                        <div className="flex gap-x-2 items-center justify-center text-blue-600">
                            <Search />
                            <Input
                                type="text"
                                placeholder="Search for jobs"
                                className="w-60"
                                ref={jobTitleRef}
                            />
                        </div>
                        <div className="flex gap-x-2 items-center justify-center text-blue-600">
                            <LocationEditIcon />
                            <Input
                                type="text"
                                placeholder="Location"
                                className="w-60"
                                ref={JobLocationRef}
                            />
                        </div>
                    </div>
                    <Button className="cursor-pointer" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>

            <div className="w-[80%] mx-auto h-40 rounded-lg shadow-md my-5 flex justify-center items-center gap-x-3">
                <div className="mx-5 px-5 font-bold text-xl">
                    <AuroraText>Trusted By</AuroraText>
                </div>
                <MarqueeDemo />
            </div>
        </div>
    );
}