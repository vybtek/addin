"use client";
import { useState } from "react";

export default function PopularJobs() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const jobCategories = [
    {
      id: 1,
      title: "Academic Tutor",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/4d2ddd102d5a770699e86bdeaecb0161.png"
          alt="Academic Tutor"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        "Are you struggling to keep up with your coursework or do you want to take your academic performance to the next level?",
    },
    {
      id: 2,
      title: "Dance Trainer",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/c478911a02ff653bbb7e3d950803ea79.png"
          alt="Dance Trainer"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        "Are you looking for a talented dance instructor to help you better your moves and technique? There are many skilled trainers available.",
    },
    {
      id: 3,
      title: "Music Trainer",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/3f805b48f99a2c541fc496fb0f582c65.png"
          alt="Music Trainer"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        "Experienced music instructor teaching general music styles, classical piano, practical and theoretical knowledge.",
    },
    {
      id: 4,
      title: "Yoga Trainer",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/fb3f9c76dc2613dcd6f9b9f7f233d72e.png"
          alt="Yoga Trainer"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        '"Experienced and certified yoga teacher with knowledge of yoga\'s history, philosophy, and ethics." Trained in multiple styles and approaches.',
    },
    {
      id: 5,
      title: "Drawing & Painting",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/e7c03548c97492c9286408a16afc0d8c.png"
          alt="Drawing & Painting"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        "Art instructor with experience and certification in a variety of drawing and painting methods. The art classes are for all skill levels.",
    },
    {
      id: 6,
      title: "Writing & Languages",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/de42823febd439833dbf0669fba8f0c5.png"
          alt="Writing & Languages"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        "Writing and language instructor with experience and certification in a variety of writing methods and techniques.",
    },
    {
      id: 7,
      title: "Personal Gym trainer",
      image: (
        <img
          src="https://www.addinsedu.com/user_uploads/category_icons/92c2960edc6219f8dc0023bbd28af22b.png"
          alt="Personal Gym Trainer"
          className="w-12 h-12 object-cover rounded-full"
        />
      ),
      description:
        "Personal gym trainer with experience and certification in a variety of training routines. The trainer will help achieve your fitness goals.",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Jobs
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From wherever you are, locate the best teachers. Hire quickly and
            quickly get your class. Select the most popular groups, then bring
            them on board.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobCategories.map((job) => (
            <div
              key={job.id}
              className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="bg-white text-gray-800 p-6 h-full flex flex-col items-center transition-all duration-300 hover:bg-cyan-400 hover:text-white">
                <div className="mb-4">{job.image}</div>
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <p className="text-sm text-center">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
