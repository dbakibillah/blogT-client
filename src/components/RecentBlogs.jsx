import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders";
import { motion } from "framer-motion";

const RecentBlogs = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/recentblogs")
            .then((response) => setRecentBlogs(response.data))
            .catch((error) => console.error("Error fetching recent blogs:", error));
    }, []);

    const addToWishlist = (blogId) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "You must be logged in to add to wishlist",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
        axios
            .post(
                "https://blog-t-server.vercel.app/wishlist",
                { blogId },
                { withCredentials: true }
            )
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Blog added to wishlist!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to add blog to wishlist",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

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

    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto lg:px-24">
                <motion.h2
                    className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 dark:text-gray-100"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Recent Blogs
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-2 my-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {recentBlogs.length > 0 ? (
                        recentBlogs.map((blog) => (
                            <motion.div
                                key={blog._id}
                                className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-100 flex flex-col justify-between"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <div>
                                    <img
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover rounded mb-4"
                                    />
                                    <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
                                        {blog.shortDescription}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-100 mb-4 bg-gray-700 px-2 py-1 rounded">
                                        {blog.category}
                                    </span>
                                    <div className="flex justify-between items-center my-4">
                                        <motion.button
                                            onClick={() => navigate(`/blogs/${blog._id}`)}
                                            className="btn bg-blue-500 text-white rounded border-none hover:bg-blue-700"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            Details
                                        </motion.button>

                                        <motion.button
                                            onClick={() => addToWishlist(blog._id)}
                                            className="btn bg-yellow-500 text-white rounded border-none hover:bg-yellow-700"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            Wishlist
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">No recent blogs available.</p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default RecentBlogs;
