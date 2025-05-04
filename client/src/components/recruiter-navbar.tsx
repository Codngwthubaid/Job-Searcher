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

export default function RecruiterNavbar() {

    const { companyData } = useAppContext()
    console.log(companyData)

    return companyData && (
        <div className="flex justify-between items-center mx-auto border shadow-md px-4">
            <div className="flex gap-1 items-center">
                <img src={logo} alt="logo" className="w-20" />
                <div className="text-xl md:text-3xl font-bold">Job Searcher</div>
            </div>
            <div className="flex items-center gap-x-2">
                <p>Welcome, {companyData.name}</p>
                <Dialog>
                    <DialogTrigger>
                        <Avatar className="border cursor-pointer">
                            <AvatarImage src={companyData.image} alt={companyData.name} />
                            <AvatarFallback>{companyData.name}</AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{companyData.name} Company Profile</DialogTitle>
                            <div className="flex gap-5 mt-5">
                                <img src={companyData.image} alt={companyData.name} className="w-20 object-cover border rounded-full" />
                                <div className="flex flex-col gap-y-3 items-start">
                                    <Button variant={"outline"}>Company Name : {companyData.name}</Button>
                                    <Button variant={"outline"}>Company Email : {companyData.email}</Button>
                                    <Button variant={"destructive"}>Logout</Button>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}