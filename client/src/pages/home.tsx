import HeroSection from "@/components/hero-section";
import JobListing from "@/components/jobListing";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <JobListing />
    </div>
  )
}