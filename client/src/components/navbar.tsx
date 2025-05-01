import { Button } from "./ui/button";
import logo from "@/assets/logo.gif"
import { UserButton, useClerk, useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom";

export default function Navbar() {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    return (
        <div className="flex justify-between py-2 items-center mx-auto border shadow-md">
            <div className="flex gap-1 items-center">
                <img src={logo} alt="logo" className="w-20" />
                <div className="text-3xl font-bold">Job Searcher</div>
            </div>
            {
                user ?
                    <div className="mx-5 flex gap-2 items-center ">
                        <Link to="/applied-jobs">
                            <Button className="cursor-pointer">Applied Jobs</Button>
                        </Link>
                        <p>|</p>
                        <p>Hi, {user.firstName + " " + user.lastName}</p>
                        <UserButton />
                    </div>
                    :
                    <div className="flex gap-3 items-center mx-5">
                        <Button className="cursor-pointer">Recuiter Login</Button>
                        <Button onClick={e => openSignIn()} className="cursor-pointer">Login</Button>
                    </div>
            }
        </div>
    )
}