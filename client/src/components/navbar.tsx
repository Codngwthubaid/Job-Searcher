import { Button } from "./ui/button";
import logo from "@/assets/logo.gif";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppContext } from "@/Provider";
import RecruiterLoginForm from "./recruiter-login-form";
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
                "border-gray-950/[.1] bg-emerald-400 text-white hover:bg-gray-950/[.05]",
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
            <Marquee pauseOnHover className="[--duration:30s] bg-emerald-400">
                {firstRow.map((review) => (
                    <ReviewCard key={review.desc} {...review} />
                ))}
            </Marquee>
        </div>
    );
}


export default function Navbar() {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate()
    const { setIsShowRecruiterForm } = useAppContext()


    return (
        <div>
            <div className="flex justify-between py-2 items-center mx-auto border shadow-md px-4">
                <div onClick={() => navigate("/")} className="flex gap-1 items-center cursor-pointer">
                    <img src={logo} alt="logo" className="w-12 md:w-16" />
                    <div className="text-xl md:text-2xl font-bold">Job Searcher</div>
                </div>

                <div className="hidden md:flex items-center mx-5">
                    {user ? (
                        <div className="flex gap-2 items-center">
                            <Link to="/applications">
                                <Button className="cursor-pointer">Applied Jobs</Button>
                            </Link>
                            <p className="text-gray-500">|</p>
                            <p>Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                    ) : (
                        <div className="flex gap-3 items-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="cursor-pointer"
                                        onClick={() => setIsShowRecruiterForm(true)}
                                    >
                                        Recruiter Login
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <RecruiterLoginForm />
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>


                            <Button onClick={() => openSignIn()} className="cursor-pointer">
                                Login
                            </Button>
                        </div>
                    )}
                </div>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4">
                                {user ? (
                                    <>
                                        <div className="mx-5">
                                            <div className="mb-3 font-semibold text-lg">Profile</div>
                                            <div className="mb-5 flex items-center justify-start gap-x-3">
                                                <UserButton />
                                                <p className="text-sm sm:text-lg">
                                                    Hi, {user.firstName}
                                                </p>
                                            </div>
                                            <Link to="/applications">
                                                <Button className="w-full cursor-pointer">
                                                    Applied Jobs
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="cursor-pointer"
                                                    onClick={() => setIsShowRecruiterForm(true)}
                                                >
                                                    Recruiter Login
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <RecruiterLoginForm />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>

                                        <Button
                                            onClick={() => openSignIn()}
                                            className="w-full cursor-pointer"
                                        >
                                            Login
                                        </Button>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <MarqueeDemo />
        </div>
    );
}