import { Facebook } from "lucide-react";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">

      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact & Connect
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          For questions, feedback, or beneficial collaboration,
          feel free to reach out through the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="border border-white/10 rounded-3xl p-8 text-center
          hover:border-emerald-500/40 transition"
        >
          <div className="text-3xl mb-4">📧</div>
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-gray-400 text-sm mb-4">
            For personal queries, corrections, or suggestions.
          </p>

          <a
            href="mailto:contact@example.com"
            className="inline-block text-emerald-400 hover:underline"
          >
            editorsaralpath@gmail.com
          </a>
        </div>

        <div className="border border-white/10 rounded-3xl p-8 text-center
          hover:border-emerald-500/40 transition"
        >
          <div className="text-3xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">WhatsApp Channel</h3>
          <p className="text-gray-400 text-sm mb-4">
            Receive updates, reminders, and beneficial knowledge directly.
          </p>

          <a
            href="#"
            className="inline-block px-5 py-2 rounded-xl
            bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
          >
            Join Channel
          </a>
        </div>

        <div className="border border-white/10 rounded-3xl p-8 text-center
          hover:border-emerald-500/40 transition"
        >
          <div className="text-3xl mb-4">🌐</div>
          <h3 className="text-xl font-semibold mb-2">Social Platforms</h3>
          <p className="text-gray-400 text-sm mb-4">
            Follow and stay connected on social platforms.
          </p>

          <div className="flex justify-center gap-4 text-sm">
            <span className="px-4 py-2 rounded-full  bg-blue-700 border border-white/10">
                <a href="https://www.facebook.com/mdtuzzammel.haq?rdid=P1vDhVZkFQGeWZsX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1JzZEhHUWU%2F#"><Facebook /></a>
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              YouTube (soon)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-24 max-w-4xl mx-auto border border-white/10 rounded-3xl p-10">

        <h2 className="text-2xl font-semibold mb-4 text-center">
          WhatsApp Study Groups
        </h2>

        <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          Join our WhatsApp study groups to participate in structured learning,
          discussions, and reminders related to Islamic knowledge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="border border-white/10 rounded-2xl p-6">
            <h4 className="font-medium mb-2">General Islamic Studies</h4>
            <p className="text-sm text-gray-400 mb-4">
              Daily reminders, short explanations, and reflections.
            </p>
            <a
              href="#"
              className="text-emerald-400 hover:underline text-sm"
            >
              Join Group →
            </a>
          </div>

          <div className="border border-white/10 rounded-2xl p-6">
            <h4 className="font-medium mb-2">Qur’an & Tafsir Discussions</h4>
            <p className="text-sm text-gray-400 mb-4">
              Ayah-by-ayah learning and tafsir discussions.
            </p>
            <a
              href="#"
              className="text-emerald-400 hover:underline text-sm"
            >
              Join Group →
            </a>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center text-sm text-gray-500 italic max-w-2xl mx-auto">
        “The most beloved of people to Allah are those who are most beneficial
        to others.”
      </div>

    </div>
  );
};

export default Contact;
