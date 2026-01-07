import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticleList } from "../api/article.api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await getArticleList();
        setArticles(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch articles");
      }
    };
    loadArticles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">


      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Articles
        </h1>
        <p className="text-gray-400">
          Reflections and writings rooted in authentic Islamic knowledge.
        </p>
      </div>


      {articles.length === 0 && (
        <div className="text-center text-gray-400">
          No articles have been published yet.
        </div>
      )}


      <ul className="space-y-6">
        {articles.map((article, index) => (
          <li
            key={article._id}
            className="group border border-white/10 
            rounded-2xl px-6 py-5 
            hover:border-emerald-400/40 transition"
          >
            <Link
              to={`/articles/${article._id}`}
              className="flex items-center gap-6"
            >

              <span className="text-sm text-gray-500 font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>


              <h2 className="text-lg md:text-xl font-medium 
              group-hover:text-emerald-400 transition">
                {article.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
