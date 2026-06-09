import moment from "moment";
import { FaArrowLeft, FaUser, FaClock } from "react-icons/fa";

const ReadMore = ({ blog, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="btn btn-sm btn-outline mb-6"
      >
        <FaArrowLeft /> Back
      </button>

      {/* IMAGE */}
      <img
        src={blog.image}
        className="w-full h-[400px] object-cover rounded-xl"
      />

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mt-6">
        {blog.title}
      </h1>

      {/* META */}
      <div className="flex gap-6 text-gray-500 mt-3">
        <span className="flex items-center gap-2">
          <FaUser /> {blog.author}
        </span>
        <span className="flex items-center gap-2">
          <FaClock />
          {moment(blog.date).format("MMM DD, YYYY")}
        </span>
      </div>

      {/* CONTENT */}
      <p className="mt-6 text-lg leading-8 text-gray-700">
        {blog.content}
      </p>
    </div>
  );
};

export default ReadMore;