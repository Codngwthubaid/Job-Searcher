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

export default function RecruiterNavbar() {

    const [isloading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { companyData, setCompanyToken } = useAppContext()
    console.log(companyData)



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
        <div className="flex justify-between items-center mx-auto border shadow-md px-4">
            <div className="flex gap-1 items-center" onClick={() => navigate("/")}>
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
                            <div className="flex gap-5 w-full mt-5">
                                <img src={companyData.image} alt={companyData.name} className="w-1/4 object-cover border rounded-full" />
                                <div className="flex flex-col gap-y-3 items-start">
                                    <Button variant={"outline"}>Company Name : {companyData.name}</Button>
                                    <Button variant={"outline"}>Company Email : {companyData.email}</Button>
                                    <Button 
                                        variant={"destructive"} 
                                        onClick={Logout} 
                                        className="cursor-pointer" 
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
    )
}