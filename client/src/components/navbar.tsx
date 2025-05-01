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

export default function Navbar() {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate()

    return (
        <div className="flex justify-between py-2 items-center mx-auto border shadow-md px-4">
            <div onClick={() => navigate("/")} className="flex gap-1 items-center cursor-pointer">
                <img src={logo} alt="logo" className="w-16 md:w-20" />
                <div className="text-xl md:text-3xl font-bold">Job Searcher</div>
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
                        <Button className="cursor-pointer">Recruiter Login</Button>
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
                        <div className="flex flex-col gap-4 mt-6">
                            {user ? (
                                <>
                                    <p className="text-lg">
                                        Hi, {user.firstName + " " + user.lastName}
                                    </p>
                                    <Link to="/applied-jobs">
                                        <Button className="w-full cursor-pointer">
                                            Applied Jobs
                                        </Button>
                                    </Link>
                                    <div className="flex justify-center">
                                        <UserButton />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Button className="w-full cursor-pointer">
                                        Recruiter Login
                                    </Button>
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
    );
}