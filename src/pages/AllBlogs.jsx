import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const categories = ["News", "Technology", "Gaming", "Coding", "Sports"];

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://blog-t-server.vercel.app/filteredblogs", {
                params: { search, category },
            })
            .then((response) => {
                setBlogs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            });
    }, [search, category]);

    const addToWishlist = (blogId) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "You must be logged in to add to wishlist",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/login");
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

    const renderSkeleton = () => (
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-100 flex flex-col justify-between">
            <Skeleton height={192} className="rounded mb-4" />
            <Skeleton height={24} width="75%" className="mb-2" />
            <Skeleton height={18} width="50%" className="mb-2" />
            <Skeleton height={18} width="33%" className="mb-4" />
            <div className="flex justify-between">
                <Skeleton height={40} width={80} />
                <Skeleton height={40} width={100} />
            </div>
        </div>
    );

    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <section className="container mx-auto p-4 lg:p-24 dark:bg-gray-900">
                <div className="mb-6 flex items-center justify-end gap-4 p-4">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search blogs by title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-3 pl-10 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                        />
                        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    </div>

                    <div className="w-full max-w-xs">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                        >
                            <option value="" className="text-gray-500">
                                All Categories
                            </option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <PhotoProvider>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {loading
                            ? Array.from({ length: 8 }).map((_, idx) => (
                                <div key={idx}>{renderSkeleton()}</div>
                            ))
                            : blogs.length > 0
                                ? blogs.map((blog) => (
                                    <div
                                        key={blog._id}
                                        className="bg-white p-4 rounded shadow dark:bg-gray-800 dark:text-gray-100 flex flex-col justify-between"
                                    >
                                        <div>
                                            <PhotoView src={blog.imageUrl}>
                                                <img
                                                    src={blog.imageUrl}
                                                    alt={blog.title}
                                                    className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                                                />
                                            </PhotoView>
                                            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
                                                {blog.shortDescription}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="text-sm text-gray-100 mb-4 bg-gray-700 px-2 py-1 rounded">
                                                {blog.category}
                                            </span>
                                            <div className="flex justify-between items-center mt-4">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/blogs/${blog._id}`)
                                                    }
                                                    className="btn bg-blue-500 text-white rounded border-none hover:bg-blue-700"
                                                >
                                                    Details
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        addToWishlist(blog._id)
                                                    }
                                                    className="btn bg-yellow-500 text-white rounded border-none hover:bg-yellow-700"
                                                >
                                                    Wishlist
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))
                                : <p>No blogs found.</p>}
                    </div>
                </PhotoProvider>
            </section>
        </section>
    );
};

export default AllBlogs;
