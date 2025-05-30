export default function LeavePolicy() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className=" text-gray-700 text-center py-24">
        <h1 className="text-2xl md:text-3xl font-bold">
          Leaves & Off (Holiday/WO/Festival Off)
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Back to Help Link */}
        <section className="mb-6">
          <a
            href="/help"
            className="text-blue-600 hover:underline text-base md:text-lg"
          >
            Back to Help
          </a>
        </section>

        {/* Weekly Off */}
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Weekly Off
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Tutors have Sundays as their official weekly off.
          </p>
        </section>

        {/* Paid Leave */}
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Paid Leave
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Tutors can avail one (1) paid leave per month, subject to prior
            approval from the client.
          </p>
        </section>

        {/* Festive Holidays */}
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Festive Holidays
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Tutors are granted leave on major Indian festivals recognized by
            AddIns listed below with days count:
          </p>
          <ul className="list-disc pl-5 text-gray-700 text-base md:text-lg space-y-1 mt-2">
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
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Leave Approval Process
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Tutors should submit leave requests at least three (3) days in
            advance, including client approval.
          </p>
        </section>

        {/* Leave Cover */}
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Leave Cover
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Tutors are responsible for arranging cover-up classes for additional
            leaves. If unable to cover, the corresponding class amount may be
            deducted.
          </p>
        </section>

        {/* Documentation */}
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Documentation
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Tutors should maintain a record of approved leaves from clients.
          </p>
        </section>

        {/* Unauthorized Absence */}
        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
            Unauthorized Absence
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Proper approval is required for planned absences. Unauthorized
            absences may result in disciplinary action or termination.
          </p>
        </section>
      </main>
    </div>
  );
}
