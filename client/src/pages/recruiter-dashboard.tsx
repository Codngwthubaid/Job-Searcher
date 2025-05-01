import RecruiterNavbar from "@/components/recruiter-navbar";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Icon, PlusCircle, ShoppingBag, UserCheck2 } from "lucide-react";

export default function RecruiterDashboard() {

    const sidebarOptions = [
        {
            icon: <PlusCircle />,
            name: "Add Job"
        },
        {
            icon: <ShoppingBag />,
            name: "Manage Jobs"
        },
        {
            icon: <UserCheck2 />,
            name: "View Applications"
        }

    ]

    return (
        <div>
            <RecruiterNavbar />
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border-2"
            >
                <ResizablePanel defaultSize={20} maxSize={25}>
                    <div className="flex h-[calc(100vh-86px)] items-start justify-start p-6">
                        <div className="flex flex-col gap-y-3 items-start">
                            {
                                sidebarOptions.map((options, index) => {
                                    return (
                                        <div key={index} className="flex items-start gap-x-2">
                                            {options.icon}
                                            <span>{options.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75} maxSize={80}>
                    <div className="flex h-[calc(100vh-86px)] items-center justify-center p-6">
                        <span className="font-semibold">Two</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
} 