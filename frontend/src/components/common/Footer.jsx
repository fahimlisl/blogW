import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#020617] border-t border-white/10">

      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 
      w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          <div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">
              نور الهداية
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A platform dedicated to spreading authentic Islamic
              knowledge through articles, khutbas, and scholarly
              resources — shared with sincerity and clarity.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Explore
            </h4>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/articles" className="hover:text-emerald-400 transition">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/khutba" className="hover:text-emerald-400 transition">
                  Khutbas
                </Link>
              </li>
              <li>
                <Link to="/surah" className="hover:text-emerald-400 transition">
                  Surah & PDFs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
              Reminder
            </h4>

            <p className="text-emerald-400 text-sm mb-2">
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              “And say: My Lord, increase me in knowledge.”
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">

          <span>
            © {new Date().getFullYear()} Noor-ul-Hidayah. All rights reserved.
          </span>

          <span className="italic">
            Built with sincerity, shared for the Ummah.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
