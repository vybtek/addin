import Head from "next/head";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - Addins Education | Our Story & Mission</title>
        <meta
          name="description"
          content="Learn about Addins Education, a premier tutoring service in Udaipur, Rajasthan, dedicated to breaking educational stereotypes and empowering students with personalized learning."
        />
        <meta
          name="keywords"
          content="Addins Education about, Udaipur tutoring, educational mission, personalized learning, Rajasthan education"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.addinseduc.com/about-us" />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-700">
        {/* Header Section */}
        <header className="pt-24 bg-gradient-to-b from-gray-100 to-gray-50">
          <div className="max-w-7xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              About Us
            </h1>
          </div>
        </header>
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg leading-relaxed">
              <span className="font-semibold text-green-600">Add-Ins Education</span>
              {" "}was founded with the mindset and idea of breaking the stereotype
              made in the education field that divided intelligent students from
              average students. No matter what, knowledge comes from adequate
              guidance and consistent practice! We at{" "}
              <span className="font-semibold text-green-600">Add-Ins Education</span>
              {" "}believe in instilling the greatest benefits of tutoring and
              mentoring in each of our students in order to instill confidence in
              their work and provide them with the insight to get to the root
              cause of the ideas and comprehend them. We have a team of dedicated
              and passionate teachers who enjoy instilling information in their
              students and helping them learn the skills and concepts needed to
              compete in life. We use the most advanced and technically enriched
              methods to teach and provide knowledge to our students. Books are
              followed everywhere, but our team of dedicated and experienced
              teachers make it a point to educate the students and make them learn
              the concepts beyond their books.
            </p>
          </section>
          {/* Two Column Content */}
          <section className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <div>
              <p className="text-lg leading-relaxed">
                Our mission is to deliver quality education to each and every
                student and to ensure his or her success. We commit ourselves to
                excellent education and boast of tutors who are totally devoted
                and committed so as to build trust and compassion between teachers
                and students and ensure that the students achieve what they came
                for. We at{" "}
                <span className="font-semibold text-green-600">Add-Ins</span> Home
                Tuition/Tutor leave no stone unturned to make sure the tutor is of
                high standards. The tutors are put through a rigorous screening
                process including telephonic interviews and online assessments.
                Our motto is to provide a maximum customized learning solution so
                that it fits your need to point perfectly.
              </p>
            </div>
            {/* Right Column */}
            <div>
              <p className="text-lg leading-relaxed">
                We map the brain of our students and structure the concepts in
                way, to offer maximum benefits of learning and knowledge right
                here. We use the best possible methods and a unique way to deliver
                the apt concepts to all our students. We make sure the knowledge
                they get is apt, interesting and intriguing enough to attract
                their curiosity and energy. We understand the fact that all
                students have different potential and they certainly need a
                different way to deal with them. Our teachers make sure to offer
                the sure shot method as a student's demands and develops a
                strategy that offers benefits of knowledge to them, no matter
                what! We hand pick the optimal qualities in each student and work
                towards enhancing his or her plus points that would certainly hide
                their weakness and make them step ahead in future with more
                confidence.
              </p>
            </div>
          </section>
          {/* Mission Statement or Call to Action */}
          <section className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Commitment to Excellence
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                At Add-Ins Education, we believe that every student has the
                potential to excel. Our personalized approach to learning ensures
                that each student receives the attention and guidance they need to
                reach their full potential and achieve academic success.
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
