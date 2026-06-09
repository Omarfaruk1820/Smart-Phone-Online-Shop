import { useState } from "react";
import moment from "moment";
import {
  FaSearch,
  FaClock,
  FaUser,
  FaTags,
  FaArrowRight,
} from "react-icons/fa";

import ReadMore from "./ReadMore";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Top 10 Smartphones in 2026 You Must Buy",
      author: "MobileHub Team",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      date: "2026-06-01",
      desc: "Best smartphones with AI camera and ultra performance.",
      content:
        "This article covers the top 10 smartphones of 2026 with full specifications, performance review and pricing analysis.",
    },
    {
      id: 2,
      title: "How to Choose Gaming Mobile",
      author: "Tech Expert",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      date: "2026-05-28",
      desc: "Guide for gaming smartphone selection.",
      content:
        "We explain GPU, refresh rate, cooling system and battery performance for gaming phones.",
    },
    {
      id: 3,
      title: "Best Budget Phones Under $300",
      author: "MobileHub Team",
      category: "Budget",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
      date: "2026-05-20",
      desc: "Affordable phones with premium features.",
      content: "List of budget phones that offer great performance under $300.",
    },
    {
      id: 4,
      title: "iPhone vs Android Comparison",
      author: "Admin",
      category: "Comparison",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8",
      date: "2026-05-15",
      desc: "Which one should you buy?",
      content:
        "Detailed comparison of iPhone and Android ecosystem, security and performance.",
    },

    // ➕ NEW 4 BLOGS
    {
      id: 5,
      title: "Top Camera Phones for Photography Lovers",
      author: "MobileHub Team",
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
      date: "2026-04-10",
      desc: "Best camera smartphones ranked.",
      content:
        "We analyze camera sensors, zoom capability and AI photography features.",
    },
    {
      id: 6,
      title: "Fast Charging Technology Explained",
      author: "Tech Expert",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
      date: "2026-04-05",
      desc: "How fast charging works in modern phones.",
      content: "Understanding VOOC, SuperVOOC, PD charging and battery safety.",
    },
    {
      id: 7,
      title: "Upcoming Smartphones in 2026",
      author: "MobileHub Team",
      category: "News",
      image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e",
      date: "2026-03-25",
      desc: "New upcoming phone leaks and specs.",
      content: "Leaks and rumors about upcoming flagship smartphones in 2026.",
    },
    {
      id: 8,
      title: "Mobile Security Tips You Must Know",
      author: "Admin",
      category: "Security",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      date: "2026-03-10",
      desc: "Protect your phone from hackers.",
      content:
        "Learn about password safety, antivirus apps and privacy protection.",
    },
  ];

  const categories = [
    "All",
    "Smartphones",
    "Gaming",
    "Budget",
    "Comparison",
    "Technology",
    "News",
    "Security",
  ];

  // FILTER LOGIC (SEARCH + CATEGORY)
  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  // READ MORE PAGE
  if (selectedBlog) {
    return (
      <ReadMore blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
    );
  }

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">MobileHub Blog</h1>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="md:col-span-3">
          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              className="input input-bordered w-full pl-10"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* BLOGS */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="card bg-base-100 shadow-xl border">
                <img src={blog.image} className="h-52 w-full object-cover" />

                <div className="card-body">
                  <h2 className="font-bold">{blog.title}</h2>
                  <p className="text-sm text-gray-500">{blog.desc}</p>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUser /> {blog.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock />
                      {moment(blog.date).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="btn btn-sm btn-outline mt-3"
                  >
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* CATEGORY FILTER */}
          <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
              <h2 className="flex items-center gap-2 font-bold">
                <FaTags /> Categories
              </h2>

              <ul className="mt-3 space-y-2">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    onClick={() => setSelectedCategory(cat)}
                    className={`cursor-pointer p-2 rounded ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "hover:text-primary"
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
