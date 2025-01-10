import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/wishlist", { withCredentials: true })
            .then((response) => {
                setWishlist(response.data);
            })
            .catch((error) => console.error("Error fetching wishlist:", error));
    }, []);

    const handleRemove = (blogId) => {
        axios
            .delete(`https://blog-t-server.vercel.app/wishlist/${blogId}`, { withCredentials: true })
            .then(() => {
                setWishlist((prev) => prev.filter((blog) => blog._id !== blogId));
                Swal.fire({
                    icon: "success",
                    title: "Blog removed from wishlist!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to remove blog from wishlist",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <section className="dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto lg:px-24 py-8 dark:bg-gray-900 dark:text-gray-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 dark:text-gray-100">
                    My Wishlist
                </h1>

                {wishlist.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-300">No blogs in your wishlist.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">#</th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        Photo
                                    </th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        Blog Title
                                    </th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        Category
                                    </th>
                                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                                            {item.title}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                            {item.category}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/blogs/${item._id}`)}
                                                    className="btn bg-blue-500 hover:bg-blue-600 text-white border-none font-bold py-1 px-3 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 mb-2"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    className="btn bg-red-500 hover:bg-red-600 text-white border-none font-bold py-1 px-3 rounded-lg dark:bg-red-600 dark:hover:bg-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Wishlist;
