const Download = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Downloads
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A growing library of authentic Islamic books, study materials,
          khutbah PDFs, and scholarly resources — curated with care.
        </p>
      </div>


      <div className="max-w-3xl mx-auto border border-white/10 rounded-3xl p-10
        bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm
        text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16
          rounded-full bg-emerald-500/20 text-emerald-400 mb-6 text-2xl"
        >
          📚
        </div>

        <h2 className="text-2xl font-semibold mb-3">
          Resources Coming Soon
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          We are currently preparing a collection of beneficial Islamic
          resources including books (PDF), tafsir notes, khutbah collections,
          and study materials. All downloads will be authentic, organized,
          and freely accessible.
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            📖 Islamic Books
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            🕌 Khutbah PDFs
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            📝 Study Notes
          </span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            📂 Reference Materials
          </span>
        </div>
      </div>

      <div className="my-20 border-t border-white/10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">
            Books
          </h3>
          <p className="text-sm text-gray-400">
            Downloadable PDF books on Aqeedah, Fiqh, Tafsir, Seerah,
            and Islamic character.
          </p>
          <p className="mt-4 text-xs italic text-gray-500">
            Status: In preparation
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">
            Khutbah Collection
          </h3>
          <p className="text-sm text-gray-400">
            Friday khutbah PDFs and selected sermons for study
            and personal reflection.
          </p>
          <p className="mt-4 text-xs italic text-gray-500">
            Status: Coming soon
          </p>
        </div>

        <div className="border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">
            Study Resources
          </h3>
          <p className="text-sm text-gray-400">
            Notes, summaries, and reference materials to support
            deeper understanding of Islamic knowledge.
          </p>
          <p className="mt-4 text-xs italic text-gray-500">
            Status: Planned
          </p>
        </div>
      </div>

      <div className="mt-24 text-center text-sm text-gray-500 italic max-w-2xl mx-auto">
        “Allah will raise those who have believed among you and those who were
        given knowledge, by degrees.” — Qur’an 58:11
      </div>

    </div>
  );
};

export default Download;
