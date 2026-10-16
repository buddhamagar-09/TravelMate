import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import FramerMotion from "../Hook/FramerMotion";

const categories = [
  "All",
  "Trekking",
  "Culture",
  "Wildlife",
  "Tips",
  "Food",
];

const featuredPost = {
  slug: "everest-base-camp-trek-guide",
  title: "Everest Base Camp Trek: The Complete 2026 Guide",
  excerpt:
    "Everything you need to know before standing at 5,364 metres — the route, permits, altitude acclimatisation, packing list, and the best tea houses along the way.",
  image: "/images/trekking/everest.jpg",
  category: "Trekking",
  author: "Aarav Shrestha",
  date: "October 10, 2026",
  readTime: "12 min read",
};

const posts = [
  {
    slug: "annapurna-base-camp-in-autumn",
    title: "Why Autumn Is the Perfect Season for Annapurna Base Camp",
    excerpt:
      "Clear skies, warm hospitality, and rhododendron-covered hills make autumn the most rewarding window to explore the Annapurna sanctuary.",
    image: "/images/trekking/annapurnabasecamp.jpg",
    category: "Trekking",
    author: "Priya Gurung",
    date: "October 4, 2026",
    readTime: "8 min read",
  },
  {
    slug: "living-heritage-kathmandu-valley",
    title: "Kathmandu Valley: A Living Heritage of Temples and Squares",
    excerpt:
      "From Bhaktapur's golden gates to Patan's bronze workshops, a slower walk through the valley reveals centuries of living craftsmanship.",
    image: "/images/tour/lumbini1.jpg",
    category: "Culture",
    author: "Rohan Adhikari",
    date: "September 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "chitwan-wildlife-safari-guide",
    title: "Chitwan National Park: Tracking Rhinos and Tigers",
    excerpt:
      "A practical guide to jeep safaris, canoe trips, and birdwatching in Nepal's first national park — and how to travel responsibly.",
    image: "/images/wildlifesafari/chitwan1.jpg",
    category: "Wildlife",
    author: "Sanjay Thapa",
    date: "September 21, 2026",
    readTime: "9 min read",
  },
  {
    slug: "packing-list-high-altitude-treks",
    title: "The Smart Packing List for High-Altitude Treks",
    excerpt:
      "What to carry, what to leave behind, and how to keep your pack light without sacrificing warmth, safety, or comfort on the trail.",
    image: "/images/trekking/mardihimal.jpg",
    category: "Tips",
    author: "Aarav Shrestha",
    date: "September 15, 2026",
    readTime: "7 min read",
  },
  {
    slug: "flavours-of-nepal-mustang",
    title: "Flavours of Nepal: Eating Your Way Through Mustang",
    excerpt:
      "Thukpa, buckwheat pancakes, and apples grown in the rain shadow of the Himalayas — a culinary journey across the Himalayas.",
    image: "/images/tour/mustang2.jpg",
    category: "Food",
    author: "Mina Karki",
    date: "September 9, 2026",
    readTime: "5 min read",
  },
  {
    slug: "rara-lakes-hidden-paradise",
    title: "Rara Lake: Nepal's Hidden Alpine Paradise",
    excerpt:
      "Far from the crowds, the country's largest lake rewards travellers with turquoise water, pine forests, and absolute silence.",
    image: "/images/trekking/rara.jpg",
    category: "Trekking",
    author: "Priya Gurung",
    date: "September 2, 2026",
    readTime: "6 min read",
  },
];

export default function TravelBlog() {
  const [category, setCategory] = useState("All");

  const displayPosts = useMemo(() => {
    if (category === "All") return posts;
    return posts.filter((post) => post.category === category);
  }, [category]);

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#047857] mb-3">
            Travel Blog
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Stories from the trail
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
            Guides, tips, and inspiration to help you plan your next adventure
            across Nepal and beyond.
          </p>
        </div>
      </section>

      {/* ==================== FEATURED ==================== */}
      <FramerMotion>
        <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#047857] text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
                    Featured
                  </span>
                  <span className="bg-[#EEF4EF] text-[#047857] text-xs font-medium px-2 py-1 uppercase tracking-wide">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug group-hover:text-[#047857] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-700">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-600">
                  <MetaItem icon={<FaUserAlt />} text={featuredPost.author} />
                  <MetaItem
                    icon={<FaCalendarAlt />}
                    text={featuredPost.date}
                  />
                  <MetaItem
                    icon={<FaClock />}
                    text={featuredPost.readTime}
                  />
                </div>

                <span className="mt-6 inline-block text-sm font-semibold text-[#047857] group-hover:text-[#065F46] transition-colors">
                  Read article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      </FramerMotion>

      {/* ==================== CATEGORY FILTERS ==================== */}
      <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 hidden sm:inline">
              Topic
            </span>

            <div className="hidden sm:block h-5 w-px bg-[#DCE7DE] dark:bg-[#EEF4EF]" />

            {categories.map((cat) => {
              const isActive = category === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-sm px-4 py-2 border transition-colors focus:outline-none ${
                    isActive
                      ? "border-[#047857] bg-[#047857] text-white font-medium"
                      : "border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] text-slate-700 dark:text-slate-800 hover:border-[#B8C7BB] hover:text-[#047857]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== GRID ==================== */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {displayPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-black/40"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {post.category && (
                      <span className="absolute top-3 left-3 bg-[#047857] text-white text-xs font-medium px-2 py-1">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-4">
                    <h2 className="font-semibold text-base text-slate-900 dark:text-slate-900 line-clamp-2 leading-snug group-hover:text-[#047857] transition-colors">
                      {post.title}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-700 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-600">
                      <MetaItem icon={<FaUserAlt />} text={post.author} />
                      <MetaItem icon={<FaCalendarAlt />} text={post.date} />
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#E4EDE6] dark:border-[#DDE7DF] flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <FaClock />
                        {post.readTime}
                      </span>

                      <span className="text-sm font-semibold text-[#047857] group-hover:text-[#065F46] transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-600">
                No posts found in this topic yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ==================== NEWSLETTER CTA ==================== */}
      <FramerMotion>
        <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-t border-[#DDE7DF] dark:border-[#DDE7DF]">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14 lg:py-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#047857] mb-3">
              Newsletter
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-snug">
              Never miss a story
            </h2>
            <p className="mt-4 text-base lg:text-lg text-slate-600 leading-relaxed">
              Join fellow travellers and get our latest guides, tips, and
              exclusive offers delivered straight to your inbox.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] text-slate-800 dark:text-slate-900 placeholder:text-slate-500 outline-none focus:border-[#047857] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] text-white font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-400">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </FramerMotion>
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
