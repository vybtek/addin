export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="text-gray-700 text-center py-24">
        <h1 className="text-2xl md:text-3xl font-bold">
          Refund Policy: AddinsEdu.com - Tutoring Jobs, <br /> Tutors for
          Parents and Enterprises
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-2 bg-white shadow-md rounded-lg pb-8">
        {/* Introduction */}
        <section className="mb-6">
          <p className="text-gray-700 text-base md:text-lg">
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
          <p className="text-gray-700 text-base md:text-lg">
            <span className="font-medium">Job Posting Fee:</span> The fee paid
            by parents or enterprises to post a tutoring job opportunity on
            AddinsEdu is non-refundable unless otherwise specified in this
            policy.
          </p>
        </section>

        {/* Cancellation by Parents or Enterprises */}
        <section className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Cancellation by Parents or Enterprises:
          </h2>
          <ul className="list-disc pl-5 text-gray-700 text-base md:text-lg space-y-2">
            <li>
              If a parent or enterprise decides to cancel a tutoring job
              posting, the fee will be refunded only if the cancellation occurs
              within 24 hours of the initial posting.
            </li>
            <li>
              The refund will be processed within 5-7 business days, subject to
              the payment gateway's terms and conditions.
            </li>
          </ul>
        </section>

        {/* Cancellation by Tutors */}
        <section className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Cancellation by Tutors:
          </h2>
          <ul className="list-disc pl-5 text-gray-700 text-base md:text-lg space-y-2">
            <li>
              If a tutor cancels a confirmed tutoring session, the parent or
              enterprise will be eligible for a full refund of any fees paid for
              that session.
            </li>
            <li>
              Refunds will be processed within 5-7 business days, subject to the
              payment gateway's terms and conditions.
            </li>
          </ul>
        </section>

        {/* Disputes and Resolutions */}
        <section className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Disputes and Resolutions:
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            In the event of a dispute between a tutor and parent or enterprise
            regarding the quality of the tutoring service provided, AddinsEdu
            may step in to mediate and resolve the issue. Refunds will be issued
            at the discretion of AddinsEdu, based on the investigation of the
            dispute.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            Contact Us:
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            For any questions, concerns, or refund requests, please contact us
            at support@addinsedu.com. We’ll be happy to assist you.
          </p>
        </section>

        {/* Note */}
        <section>
          <p className="text-gray-700 text-base md:text-lg italic">
            <span className="font-medium">Note:</span> AddinsEdu reserves the
            right to modify or update the terms and conditions of this Refund
            Policy subject to change.
          </p>
        </section>
      </main>
    </div>
  );
}
