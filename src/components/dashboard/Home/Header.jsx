"use client";

const Header = () => {
  const handleVerifyDocuments = () => {
    alert("Redirecting to document verification...");
  };

  const handleResendEmail = () => {
    alert("Resending verification email...");
  };

  return (
    <div className="bg-yellow-50 flex justify-center space-x-8 py-4">
      <div className="flex items-center text-red-500 text-sm">
        <span className="mr-2 text-lg">⚠️</span> Please verify your documents
        <button
          onClick={handleVerifyDocuments}
          className="ml-3 cursor-pointer bg-blue-100 text-blue-600 py-1 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
        >
          Verify Now
        </button>
      </div>
      <div className="flex items-center text-red-500 text-sm">
        <span className="mr-2 text-lg">⚠️</span> Your email is not verified
        <button
          onClick={handleResendEmail}
          className="ml-3 cursor-pointer bg-blue-100 text-blue-600 py-1 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
        >
          Resend Email
        </button>
      </div>
    </div>
  );
};

export default Header;