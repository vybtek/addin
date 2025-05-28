import { CiCreditCard1 } from 'react-icons/ci';
import { FaEye, FaTrash } from 'react-icons/fa';

const dummyFavorites = [
  {
    id: 1,
    title: "Class:Nur (CBSE) | ALL Subjects | Female | N/A | Area: Meera Nagar, Udaipur | Addins - teaching jobs - Expert (₹ $ ₹)",
    description: "Female Tutor for Nursery (ALL Subjects) Job Overview We are seeking a dedicated and compassionate Female Tutor to provide offline tutoring in all",
    price: "₹300.00",
    industry: "Academic Tutor",
    time: "about 2 days ago"
  },
  {
    id: 2,
    title: "Class: 5th (ICSE) | Math & Science | Male/Female | Area: Sector 14, Gurgaon | Addins - teaching jobs - Beginner",
    description: "Tutor for Class 5th (Math & Science) Job Overview Looking for a skilled tutor to assist with Math and Science for a student in Sector 14, Gurgaon",
    price: "₹500.00",
    industry: "Education",
    time: "about 5 days ago"
  },
  {
    id: 3,
    title: "Class: 10th (CBSE) | Physics | Female | Area: Jubilee Hills, Hyderabad | Addins - teaching jobs - Expert",
    description: "Female Physics Tutor for Class 10th (CBSE) Job Overview We need an expert female tutor for offline Physics tutoring in Jubilee Hills",
    price: "₹800.00",
    industry: "Academic Tutor",
    time: "about 1 week ago"
  }
];

export default function Favorites() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <span className="mr-2"><CiCreditCard1 className='text-3xl'/></span> My Favorite Projects
        </h1>

        {dummyFavorites.length > 0 ? (
          <div className="space-y-4">
            {dummyFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-start hover:shadow-lg transition-shadow duration-200"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {favorite.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {favorite.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="text-green-600 font-medium">
                      Fixed Price: {favorite.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Industry: {favorite.industry}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {favorite.time}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-full cursor-pointer text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="View"
                  >
                    <FaEye size={18} />
                  </button>
                  <button
                    className="p-2 rounded-full cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No favorite projects found.
          </p>
        )}
      </div>
    </div>
  );
}