import logo from "@/assets/logo.gif";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function RecruiterNavbar() {
    return (
        <div>
            <div className="flex justify-between items-center mx-auto border shadow-md px-4">
                <div className="flex gap-1 items-center">
                    <img src={logo} alt="logo" className="w-20"/>
                    <div className="text-xl md:text-3xl font-bold">Job Searcher</div>
                </div>
                <div className="flex items-center gap-x-2">
                    <p>Hi,Ubaid</p>
                    <Avatar>
                        <AvatarImage src={logo} alt="Ubaid" />
                        <AvatarFallback>Ubaid</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}