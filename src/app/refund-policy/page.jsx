import Head from "next/head";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund Policy - Addins Education | Tutoring Services</title>
        <meta
          name="description"
          content="Review the Refund Policy for Addins Education (www.addinsedu.com) to understand our guidelines for refunds on tutoring jobs and services for parents, enterprises, and tutors."
        />
        <meta
          name="keywords"
          content="Addins Education refund policy, tutoring jobs refund, Udaipur tutoring, refund terms, tutoring services"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.addinsedu.com/refund-policy" />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-700 py-24">
        {/* Header Section */}
        <header className="bg-gradient-to-b from-gray-100 to-gray-50 text-center">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              Refund Policy: AddinsEdu.com - Tutoring Jobs, <br /> Tutors for
              Parents and Enterprises
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6 pb-8">
            {/* Introduction */}
            <section className="mb-6">
              <p className="text-base md:text-lg leading-relaxed">
                At Addins, we strive to ensure customer satisfaction and
                transparency in our services. This Refund Policy outlines the
                guidelines for refunds related to tutoring jobs and services
                provided through our website, www.addinsedu.com.
              </p>
            </section>

            {/* Tutoring Job Fees Section */}
            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Tutoring Job Fees
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                <span className="font-medium">Job Posting Fee:</span> The fee
                paid by parents or enterprises to post a tutoring job
                opportunity on AddinsEdu is non-refundable unless otherwise
                specified in this policy.
              </p>
            </section>

            {/* Cancellation by Parents or Enterprises */}
            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Cancellation by Parents or Enterprises:
              </h2>
              <ul className="list-disc pl-5 text-base md:text-lg leading-relaxed space-y-2">
                <li>
                  If a parent or enterprise decides to cancel a tutoring job
                  posting, the fee will be refunded only if the cancellation
                  occurs within 24 hours of the initial posting.
                </li>
                <li>
                  The refund will be processed within 5-7 business days, subject
                  to the payment gateway's terms and conditions.
                </li>
              </ul>
            </section>

            {/* Cancellation by Tutors */}
            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Cancellation by Tutors:
              </h2>
              <ul className="list-disc pl-5 text-base md:text-lg leading-relaxed space-y-2">
                <li>
                  If a tutor cancels a confirmed tutoring session, the parent or
                  enterprise will be eligible for a full refund of any fees paid
                  for that session.
                </li>
                <li>
                  Refunds will be processed within 5-7 business days, subject to
                  the payment gateway's terms and conditions.
                </li>
              </ul>
            </section>

            {/* Disputes and Resolutions */}
            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Disputes and Resolutions:
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                In the event of a dispute between a tutor and parent or
                enterprise regarding the quality of the tutoring service
                provided, AddinsEdu may step in to mediate and resolve the
                issue. Refunds will be issued at the discretion of AddinsEdu,
                based on the investigation of the dispute.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Contact Us:
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                For any questions, concerns, or refund requests, please contact
                us at{" "}
                <a
                  href="mailto:support@addinsedu.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  support@addinsedu.com
                </a>
                . We’ll be happy to assist you.
              </p>
            </section>

            {/* Note */}
            <section>
              <p className="text-base md:text-lg leading-relaxed italic">
                <span className="font-medium">Note:</span> AddinsEdu reserves
                the right to modify or update the terms and conditions of this
                Refund Policy subject to change.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
