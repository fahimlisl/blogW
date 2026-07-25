import { useEffect, useState } from "react";
import { getTafserAhsanulKawulList, increaseTafserAhsanulKawulView } from "../api/tafserAhsanulKawul.api";
import SEOHead from "../components/SEOHead";
import { seoConfig } from "../utils/seoConfig";

const TafserAhsanulKawul = () => {
  const [tafsirs, setTafsirs] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = seoConfig.tafserAhsanulKawul;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Tafser Ahsanul Kawul by Tajammul Hoque",
    "description": config.description,
    "author": {
      "@type": "Person",
      "name": "Tajammul Hoque"
    }
  };

  const fetchTafsirs = async () => {
    try {
      const res = await getTafserAhsanulKawulList();
      setTafsirs(res.data.data || []);
    } catch {
      console.error("Failed to fetch tafsirs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTafsirs();
  }, []);

  const handleView = async (id, url) => {
    try {
      await increaseTafserAhsanulKawulView(id);
      window.open(url, "_blank");

      setTafsirs((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, viewC: t.viewC + 1 } : t
        )
      );
    } catch {
      alert("Failed to register view");
    }
  };

  return (
    <>
      <SEOHead
        title={config.title}
        description={config.description}
        keywords={config.keywords}
        ogImage={config.ogImage}
        canonical={config.canonical}
        schemaMarkup={schemaMarkup}
      />

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tafsir Ahsanul Kawul by Tajammul Hoque Salafi
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Detailed Quranic Tafsir and commentary by Tajammul Hoque. 
            Understand Quran verses with authentic scholarly interpretations 
            rooted in the Qur'an and Sunnah.
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-400 py-20">
            Loading Tafser Ahsanul Kawul…
          </div>
        )}

        {!loading && tafsirs.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No Tafser Ahsanul Kawul has been published yet. 
            Check back soon for detailed Quranic commentary!
          </div>
        )}

        {!loading && tafsirs.length > 0 && (
          <ul className="space-y-5">
            {tafsirs.map((t, index) => (
              <li
                key={t._id}
                className="group flex items-center justify-between 
                border border-white/10 rounded-2xl 
                px-6 py-5 hover:border-emerald-400/40 
                transition"
                itemScope
                itemType="https://schema.org/Article"
              >
                <div className="flex items-center gap-6 flex-grow">
                  <span
                    className="text-sm text-gray-500 font-mono flex-shrink-0"
                    itemProp="position"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-grow">
                    <h2
                      className="text-base md:text-lg font-medium 
                      group-hover:text-emerald-400 transition"
                      itemProp="name"
                    >
                      {t.title}
                    </h2>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                      <span itemProp="datePublished">
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'Date not available'}
                      </span>
                      <span className="flex items-center gap-1">
                        {t.viewC || 0} views
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleView(t._id, t.url)}
                  className="px-5 py-2 rounded-full text-sm font-medium
                  border border-white/20 hover:bg-white/5 
                  hover:border-emerald-400/40 transition flex-shrink-0"
                  aria-label={`Read ${t.title}`}
                >
                  Read
                </button>

                <meta itemProp="author" content="Tajammul Hoque" />
                <meta itemProp="description" content={t.title} />
              </li>
            ))}
          </ul>
        )}

        {/* FAQ Section for SEO */}
        <section className="mt-24 pt-20 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-12 text-center">
            About Tafser Ahsanul Kawul
          </h2>

          <div itemScope itemType="https://schema.org/FAQPage" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="border border-white/10 rounded-2xl p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3
                className="font-semibold mb-3 text-emerald-400"
                itemProp="name"
              >
                What is Tafser Ahsanul Kawul?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-400 text-sm" itemProp="text">
                  Tafser Ahsanul Kawul is a comprehensive Quranic commentary and 
                  interpretation that provides detailed explanations of Quran verses, 
                  their context, and their application in daily life. It's designed 
                  to help Muslims understand the Quran more deeply.
                </p>
              </div>
            </div>

            <div
              className="border border-white/10 rounded-2xl p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3
                className="font-semibold mb-3 text-emerald-400"
                itemProp="name"
              >
                Who is this Tafsir for?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-400 text-sm" itemProp="text">
                  This Tafsir is for anyone seeking to understand the Quran - 
                  from beginners to advanced students of knowledge. It's written 
                  in clear, accessible language while maintaining scholarly depth 
                  and authenticity.
                </p>
              </div>
            </div>

            <div
              className="border border-white/10 rounded-2xl p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3
                className="font-semibold mb-3 text-emerald-400"
                itemProp="name"
              >
                How is this Tafsir different?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-400 text-sm" itemProp="text">
                  This Tafsir is rooted in authentic Islamic scholarship, 
                  drawing from classical and contemporary interpretations. 
                  It emphasizes practical application and understanding, 
                  making the Quran relevant to modern life.
                </p>
              </div>
            </div>

            <div
              className="border border-white/10 rounded-2xl p-6"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <h3
                className="font-semibold mb-3 text-emerald-400"
                itemProp="name"
              >
                Can I share this Tafsir?
              </h3>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-gray-400 text-sm" itemProp="text">
                  Yes! This Tafsir can be shared with proper attribution. 
                  We encourage spreading beneficial Islamic knowledge to 
                  help others understand the Quran and implement it in 
                  their lives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TafserAhsanulKawul;