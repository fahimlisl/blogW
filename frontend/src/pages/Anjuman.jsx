import { useEffect, useState } from "react";
import { getAnjumanList, increaseAnjumanView } from "../api/anjuman.api";
import SEOHead from "../components/SEOHead";
import { seoConfig } from "../utils/seoConfig";

const Anjuman = () => {
  const [anjumans, setAnjumans] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = seoConfig.anjuman;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Anjuman by Tajammul Hoque",
    "description": config?.description,
    "author": {
      "@type": "Person",
      "name": "Tajammul Hoque"
    }
  };

  const fetchAnjumans = async () => {
    try {
      const res = await getAnjumanList();
      setAnjumans(res.data.data || []);
    } catch {
      console.error("Failed to fetch anjuman list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnjumans();
  }, []);

  const handleView = async (id, url) => {
    try {
      await increaseAnjumanView(id);
      window.open(url, "_blank");

      setAnjumans((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, viewC: a.viewC + 1 } : a
        )
      );
    } catch {
      alert("Failed to register view");
    }
  };

  return (
    <>
      <SEOHead
        title={config?.title}
        description={config?.description}
        keywords={config?.keywords}
        ogImage={config?.ogImage}
        canonical={config?.canonical}
        schemaMarkup={schemaMarkup}
      />

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Anjuman by Tajammul Hoque Salafi
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gatherings and sessions intended to strengthen faith (Iman),
            provide Islamic guidance, and inspire personal reflection and positive change.
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-400 py-20">
            Loading anjuman…
          </div>
        )}

        {!loading && anjumans.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No anjuman have been published yet. Check back soon!
          </div>
        )}

        {!loading && anjumans.length > 0 && (
          <ul className="space-y-5">
            {anjumans.map((a, index) => (
              <li
                key={a._id}
                className="group flex items-center justify-between 
                border border-white/10 rounded-2xl 
                px-6 py-5 hover:border-emerald-400/40 
                transition"
                itemScope
                itemType="https://schema.org/AudioObject"
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
                      {a.title}
                    </h2>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                      <span itemProp="uploadDate">
                        {a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'Date not available'}
                      </span>
                      <span className="flex items-center gap-1">
                        {a.viewC || 0} views
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleView(a._id, a.url)}
                  className="px-5 py-2 rounded-full text-sm font-medium
                  border border-white/20 hover:bg-white/5 
                  hover:border-emerald-400/40 transition flex-shrink-0"
                  aria-label={`View ${a.title}`}
                >
                  View
                </button>

                <meta itemProp="author" content="Tajammul Hoque" />
                <meta itemProp="description" content={a.title} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Anjuman;