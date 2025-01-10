import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MostPopularBlogs = () => {
    const [popularBlogs, setPopularBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/popularblogs")
            .then((response) => {
                setPopularBlogs(response.data);
            })
            .catch((error) => console.error("Error fetching popular blogs:", error));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto">
                <motion.h2
                    className="text-2xl md:text-4xl font-bold mb-6 text-center dark:text-gray-100"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    Most Popular Blogs
                </motion.h2>

                <motion.div
                    className="space-y-6 p-2 lg:px-24"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {popularBlogs.map((blog, index) => (
                        <motion.div
                            key={blog._id}
                            className="group bg-gray-200 dark:bg-gray-800 rounded p-6 lg:px-24 flex items-center justify-between shadow-md"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="md:flex items-center gap-6">
                                <h2 className="text-5xl md:text-8xl font-extrabold text-gray-400 dark:text-gray-500 max-sm:hidden">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </h2>
                                <div>
                                    <h3 className="text-lg md:text-2xl font-bold dark:text-gray-100 group-hover:text-blue-500 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="max-sm:text-sm text-gray-500 dark:text-gray-400">
                                        {blog.author}
                                    </p>
                                    <p className="max-sm:text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="bg-gray-600 text-white py-1 px-2 rounded inline-block mt-2 max-sm:hidden">
                                        {blog.category}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <FaCommentDots className="text-blue-500" />
                                        <span>{blog.commentsCount} Comments</span>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                onClick={() => navigate(`/blogs/${blog._id}`)}
                                className="btn btn-ghost text-blue-500 text-4xl"
                                whileHover={{ scale: 1.5 }}
                            >
                                <FaArrowRight />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default MostPopularBlogs;
