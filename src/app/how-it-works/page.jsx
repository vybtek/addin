import HowItWorks from "@/components/Home/HowItWorks";
import AddInsFeatures from "@/components/HowItWorks/AddInsFeatures";
import SwitchContent from "@/components/HowItWorks/SwitchContent";
import Head from "next/head";
import React from "react";

const HowItWorksPage = () => {
  return (
    <>
      <Head>
        <title>How It Works - Addins Education | Tutoring Process</title>
        <meta
          name="description"
          content="Learn how Addins Education works, from posting a job to hiring tutors and getting paid, at www.addinsedu.com."
        />
        <meta
          name="keywords"
          content="Addins Education how it works, tutoring process, Udaipur tutoring, hire tutors, teaching jobs"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.addinsedu.com/how-it-works" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <HowItWorks />
        <SwitchContent />
        <AddInsFeatures />
      </div>
    </>
  );
};

export default HowItWorksPage;
