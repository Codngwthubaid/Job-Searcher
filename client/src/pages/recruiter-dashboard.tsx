import RecruiterNavbar from "@/components/recruiter-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PlusCircle, ShoppingBag, UserCheck2 } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function RecruiterDashboard() {
  const sidebarOptions = [
    {
      icon: <PlusCircle />,
      name: "Add Job",
      path: "add-job", 
    },
    {
      icon: <ShoppingBag />,
      name: "Manage Jobs",
      path: "manage-job",
    },
    {
      icon: <UserCheck2 />,
      name: "View Applications",
      path: "view-applications",
    },
  ];

  const location = useLocation();

  return (
    <div>
      <RecruiterNavbar />
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg border-2"
      >
        <ResizablePanel defaultSize={20} maxSize={25}>
          <div className="flex h-[calc(100vh-86px)] items-start justify-start p-6">
            <div className="flex flex-col gap-y-5 items-start w-full">
              {sidebarOptions.map((option, index) => {
                const isActive = location.pathname.includes(option.path);

                return (
                  <Link key={index} to={option.path} className="w-full">
                    <div
                      className={`flex border p-3 w-full rounded-lg items-center gap-x-2 transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {option.icon}
                      <span>{option.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75} maxSize={80}>
          <div className="flex h-[calc(100vh-86px)] items-center justify-center p-6">
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
