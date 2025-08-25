import ContactUs from "@/components/ContactUs/ContactUs";
import Head from "next/head";
import React from "react";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Addins Education | Reach Out Today</title>
        <meta
          name="description"
          content="Get in touch with Addins Education in Udaipur, Rajasthan. Use our contact form, email, or phone to connect with our team for inquiries or support."
        />
        <meta
          name="keywords"
          content="Addins Education contact, Udaipur tutoring, Rajasthan education, contact form, support"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="bg-gray-50">
        <ContactUs />
      </main>
    </>
  );
};

export default ContactPage;
