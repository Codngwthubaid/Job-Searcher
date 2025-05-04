import { useState, useEffect } from "react";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import JobListing from "@/components/jobListing";
import Navbar from "@/components/navbar";
import { Loader } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-blue-500 size-16"/>
        </div>
      ) : (
        <>
          <Navbar />
          <HeroSection />
          <JobListing />
          <Footer />
        </>
      )}
    </div>
  );
}