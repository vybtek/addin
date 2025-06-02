
const dummyNotifications = [
  { id: 1, message: "You have a new follower!", time: "2 hours ago" },
  { id: 2, message: "Your post got 10 likes.", time: "5 hours ago" },
  { id: 3, message: "Someone commented on your post.", time: "1 day ago" },
];

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto py-18 max-w-5xl">
        <h1 className="text-3xl font-extrabold text-gray-700 dark:text-white mb-6 tracking-tight">
          Notifications
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-all duration-300">
          {dummyNotifications.length > 0 ? (
            <ul className="space-y-4">
              {dummyNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                >
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No notifications found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
