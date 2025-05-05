// import RecruiterNavbar from "@/components/recruiter-navbar";
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { PlusCircle, ShoppingBag, UserCheck2 } from "lucide-react";
// import { Link, Outlet, useLocation } from "react-router-dom";

// export default function RecruiterDashboard() {
//   const sidebarOptions = [
//     {
//       icon: <PlusCircle />,
//       name: "Add Job",
//       path: "add-job", 
//     },
//     {
//       icon: <ShoppingBag />,
//       name: "Manage Jobs",
//       path: "manage-job",
//     },
//     {
//       icon: <UserCheck2 />,
//       name: "View Applications",
//       path: "view-applications",
//     },
//   ];

//   const location = useLocation();

//   return (
//     <div>
//       <RecruiterNavbar />
//       <ResizablePanelGroup
//         direction="horizontal"
//         className="w-full rounded-lg border-2"
//       >
//         <ResizablePanel defaultSize={20} maxSize={25}>
//           <div className="flex h-[calc(100vh-86px)] items-start justify-start p-6">
//             <div className="flex flex-col gap-y-5 items-start w-full">
//               {sidebarOptions.map((option, index) => {
//                 const isActive = location.pathname.includes(option.path);

//                 return (
//                   <Link key={index} to={option.path} className="w-full">
//                     <div
//                       className={`flex border p-3 w-full rounded-lg items-center gap-x-2 transition-colors duration-200 ${
//                         isActive
//                           ? "bg-blue-100 text-blue-700 font-semibold"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {option.icon}
//                       <span>{option.name}</span>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </ResizablePanel>
//         <ResizableHandle />
//         <ResizablePanel defaultSize={75} maxSize={80}>
//           <div className="flex h-[calc(100vh-86px)] items-center justify-center p-6">
//             <Outlet />
//           </div>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   );
// }



import RecruiterNavbar from "@/components/recruiter-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PlusCircle, ShoppingBag, UserCheck2 } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecruiterDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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

  // Detect screen size for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <RecruiterNavbar />

      {isMobile ? (
        <div className="flex flex-col md:hidden">
          <div className="flex flex-wrap justify-around gap-2 p-4 border-b">
            {sidebarOptions.map((option, index) => {
              const isActive = location.pathname.includes(option.path);
              return (
                <Link key={index} to={option.path}>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
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
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border-2 h-[calc(100vh-86px)]"
        >
          <ResizablePanel defaultSize={20} maxSize={25} minSize={15}>
            <div className="flex h-full items-start justify-start p-6">
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
          <ResizablePanel defaultSize={75} maxSize={80} minSize={60}>
            <div className="flex h-full items-start justify-center p-6 w-full">
              <Outlet />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
}
