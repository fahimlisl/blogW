import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] 
        bg-emerald-500/20 blur-[120px] rounded-full"
        />


        <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-32 text-center">

          <p className="text-emerald-400 text-sm md:text-base tracking-wide mb-6">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>


          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight">
            A Place for
            <span className="block text-emerald-400 mt-2">
              Authentic Islamic Knowledge
            </span>
          </h1>


          <p className="mt-8 max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
            Explore well-researched articles, powerful khutbas, and carefully
            curated resources rooted in the Qur’an and Sunnah — shared with
            sincerity and clarity.
          </p>


          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/articles"
              className="px-8 py-4 rounded-full bg-emerald-500 
              hover:bg-emerald-600 transition font-medium text-lg"
            >
              Read Articles
            </Link>

            <Link
              to="/khutba"
              className="px-8 py-4 rounded-full border border-white/20 
              hover:bg-white/5 transition font-medium text-lg"
            >
              Learn to Khutbas
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold">
              What You’ll Find Here
            </h2>
            <p className="mt-4 text-gray-400 text-base">
              Carefully curated Islamic content grounded in authentic sources —
              shared with clarity, balance, and sincerity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              className="group bg-black/40 border border-white/10 
      rounded-3xl p-8 backdrop-blur-xl transition hover:border-emerald-400/40"
            >
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">
                Scholarly Articles
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Thoughtfully written articles addressing faith, character, and
                contemporary issues — rooted in the Qur’an and Sunnah.
              </p>
            </div>

            <div
              className="group bg-black/40 border border-white/10 
      rounded-3xl p-8 backdrop-blur-xl transition hover:border-emerald-400/40"
            >
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">
                Khutbas & Talks
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Powerful khutbas and reminders designed to strengthen iman,
                provide guidance, and inspire positive change.
              </p>
            </div>

            <div
              className="group bg-black/40 border border-white/10 
      rounded-3xl p-8 backdrop-blur-xl transition hover:border-emerald-400/40"
            >
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">
                Learning Resources
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Downloadable PDFs, study materials, and references for those
                seeking structured and deeper Islamic learning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
