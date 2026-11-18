import { Link, useParams } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import FramerMotion from "../Hook/FramerMotion";
import { getPostBySlug, posts } from "../../data/blogPosts";

export default function BlogDetail() {
  // useParams reads the ":slug" part of the URL (/blog/any-post-slug)
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  // Show a friendly message if the URL has a slug we don't know
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Post not found</h1>
        <p className="mt-3 text-slate-600">That article does not exist.</p>
        <Link
          to="/travel-blog"
          className="mt-6 inline-block text-sm font-semibold text-[#047857] hover:text-[#065F46]"
        >
          ← Back to all stories
        </Link>
      </div>
    );
  }

  // A few other posts to show at the bottom
  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="bg-[#FFFFFF] transition-colors duration-300">
      {/* ==================== BACK LINK ==================== */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-10">
        <Link
          to="/travel-blog"
          className="text-sm font-semibold text-[#047857] hover:text-[#065F46]"
        >
          ← Back to blog
        </Link>
      </div>

      {/* ==================== ARTICLE ==================== */}
      <FramerMotion>
        <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-14">
          <span className="inline-block bg-[#EEF4EF] text-[#047857] text-xs font-medium px-2 py-1 uppercase tracking-wide">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <MetaItem icon={<FaUserAlt />} text={post.author} />
            <MetaItem icon={<FaCalendarAlt />} text={post.date} />
            <MetaItem icon={<FaClock />} text={post.readTime} />
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="mt-8 w-full h-72 md:h-96 object-cover"
          />

          <p className="mt-8 text-lg leading-relaxed text-slate-700">
            {post.excerpt}
          </p>

          <div className="mt-5 space-y-5">
            {post.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base text-justify leading-8 text-slate-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </FramerMotion>

      {/* ==================== MORE STORIES ==================== */}
      <section className="bg-[#EEF4EF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900">More stories</h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="group bg-white border border-[#DDE7DF] overflow-hidden transition-shadow hover:shadow-lg hover:shadow-slate-300/40"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-[#047857]">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-slate-900 leading-snug group-hover:text-[#047857] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Meta item ---------- */

function MetaItem({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[#047857] text-xs">{icon}</span>
      {text}
    </span>
  );
}
