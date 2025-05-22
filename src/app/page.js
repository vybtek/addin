"use client";
import HomeBanner from "@/components/Home/Home";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularJobs from "@/components/Home/PopularJobs";
import TopSkills from "@/components/Home/TopSkills";


export default function Home() {

  return <div>
    <HomeBanner/>
    <PopularJobs/>
    <HowItWorks/>
    <TopSkills/>
  </div>;
}
