import Head from "next/head";

export default function LeavePolicy() {
  return (
    <>
      <Head>
        <title>Leave Policy - Addins Education | Tutor Guidelines</title>
        <meta
          name="description"
          content="Explore the Leave Policy for tutors at Addins Education, including weekly offs, paid leaves, festive holidays, and approval processes on www.addinsedu.com."
        />
        <meta
          name="keywords"
          content="Addins Education leave policy, tutor leaves, Udaipur tutoring, festive holidays, paid leave"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.addinsedu.com/leave-policy" />
      </Head>
      <div className="py-24 min-h-screen bg-gray-50 text-gray-700">
        {/* Header Section */}
        <header className="bg-gradient-to-b from-gray-100 to-gray-50 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              Leaves & Off (Holiday/WO/Festival Off)
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* Back to Help Link */}
            <section className="mb-6" aria-labelledby="back-link">
              <a
                href="/help"
                className="text-green-600 hover:underline text-base md:text-lg"
                aria-label="Back to Help page"
              >
                Back to Help
              </a>
            </section>

            {/* Weekly Off */}
            <section className="mb-6" aria-labelledby="weekly-off">
              <h2
                id="weekly-off"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Weekly Off
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Tutors have Sundays as their official weekly off.
              </p>
            </section>

            {/* Paid Leave */}
            <section className="mb-6" aria-labelledby="paid-leave">
              <h2
                id="paid-leave"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Paid Leave
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Tutors can avail one (1) paid leave per month, subject to prior
                approval from the client.
              </p>
            </section>

            {/* Festive Holidays */}
            <section className="mb-6" aria-labelledby="festive-holidays">
              <h2
                id="festive-holidays"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Festive Holidays
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Tutors are granted leave on major Indian festivals recognized by
                AddIns listed below with days count:
              </p>
              <ul className="list-disc pl-5 text-base md:text-lg leading-relaxed space-y-1 mt-2">
                <li>Republic Day - 1 day</li>
                <li>Holi - 2 days</li>
                <li>Eid Ul Fitr - 1 day</li>
                <li>Eid Ul Adha - 1 day</li>
                <li>Raksha Bandhan - 1 day</li>
                <li>Independence Day - 1 day</li>
                <li>Navratri - 1 day</li>
                <li>Diwali - 2 days</li>
                <li>Christmas - 1 day</li>
                <li>Gurupurab - 1 day</li>
                <li>Dussehra - 1 day</li>
              </ul>
            </section>

            {/* Leave Approval Process */}
            <section className="mb-6" aria-labelledby="approval-process">
              <h2
                id="approval-process"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Leave Approval Process
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Tutors should submit leave requests at least three (3) days in
                advance, including client approval.
              </p>
            </section>

            {/* Leave Cover */}
            <section className="mb-6" aria-labelledby="leave-cover">
              <h2
                id="leave-cover"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Leave Cover
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Tutors are responsible for arranging cover-up classes for
                additional leaves. If unable to cover, the corresponding class
                amount may be deducted.
              </p>
            </section>

            {/* Documentation */}
            <section className="mb-6" aria-labelledby="documentation">
              <h2
                id="documentation"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Documentation
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Tutors should maintain a record of approved leaves from clients.
              </p>
            </section>

            {/* Unauthorized Absence */}
            <section aria-labelledby="unauthorized-absence">
              <h2
                id="unauthorized-absence"
                className="text-lg md:text-xl font-medium text-gray-800 mb-2"
              >
                Unauthorized Absence
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Proper approval is required for planned absences. Unauthorized
                absences may result in disciplinary action or termination.
              </p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
