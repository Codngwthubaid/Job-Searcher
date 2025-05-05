import logo from "@/assets/logo.gif";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useAppContext } from "@/Provider";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { marqueeText } from "@/constants";
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";




const firstRow = marqueeText.slice(0, marqueeText.length / 2);

const ReviewCard = ({
    desc
}: {
    desc: string
}) => {
    return (
        <figure
            className={cn(
                "relative w-fit cursor-pointer overflow-hidden rounded-xl",
                "border-gray-950/[.1] bg-blue-400 text-white hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <p>{desc}</p>
            </div>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] bg-blue-400">
                {firstRow.map((review) => (
                    <ReviewCard key={review.desc} {...review} />
                ))}
            </Marquee>
        </div>
    );
}


export default function RecruiterNavbar() {

    const [isloading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { companyData, setCompanyToken } = useAppContext()

    const Logout = async () => {
        setIsLoading(true);
        try {
            setCompanyToken(null);
            localStorage.removeItem("companyToken");
            toast.success("Logout successful! Redirecting...");
            setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed!");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (companyData) navigate("/dashboard/manage-job")
    }, [companyData])


    return companyData && (
        <div>
            <div className="flex justify-between items-center mx-auto border shadow-md px-4 w-full">
                <div className="flex gap-1 items-center" onClick={() => navigate("/")}>
                    <img src={logo} alt="logo" className="w-20" />
                    <div className="text-xl md:text-3xl font-bold">Job Searcher</div>
                </div>
                <div className="flex items-center gap-x-2">
                    <p>Welcome, {companyData.name}</p>
                    <Dialog >
                        <DialogTrigger asChild>
                            <Avatar className="border cursor-pointer">
                                <AvatarImage className="object-cover" src={companyData.image} alt={companyData.name} />
                                <AvatarFallback>{companyData.name}</AvatarFallback>
                            </Avatar>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{companyData.name} Company Profile</DialogTitle>
                                <div className="flex gap-5 w-full mt-5">
                                    <img src={companyData.image} alt={companyData.name} className="size-32 object-cover border rounded-full" />
                                    <div className="flex flex-col  items-start">
                                        <Button variant={"ghost"} className="flex flex-col items-start py-7">
                                            <span>Company Name : </span>
                                            <span className="font-extrabold">{companyData.name}</span>
                                        </Button>
                                        <Button variant={"ghost"} className="flex flex-col items-start py-7">
                                            <span>Company Email : </span>
                                            <span className="font-extrabold">{companyData.email}</span>
                                        </Button>
                                        <Button
                                            variant={"destructive"}
                                            onClick={Logout}
                                            className="ml-3 mt-3 cursor-pointer"
                                            disabled={isloading}
                                        >
                                            {isloading ? "Logging out..." : "Logout"}
                                        </Button>
                                    </div>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <MarqueeDemo />
        </div>
    )
}