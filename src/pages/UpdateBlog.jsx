import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const categories = ["News", "Technology", "Gaming", "Coding", "Sports"];
const UpdateBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [form, setForm] = useState({
        title: "",
        imageUrl: "",
        category: "",
        shortDescription: "",
        longDescription: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://blog-t-server.vercel.app/blogs/${id}`)
            .then((response) => {
                setBlog(response.data);
                setForm(response.data);
            })
            .catch((error) => console.error("Error fetching blog:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`https://blog-t-server.vercel.app/blogs/${id}`, form, { withCredentials: true })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Blog updated successfully!",
                    showConfirmButton: true,
                    timer: 1500,
                });
                navigate(`/blogs/${id}`);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Failed to update blog",
                    text: error.message,
                    showConfirmButton: true,
                    timer: 1500,
                });
                console.error("Error updating blog:", error);
            });
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-2">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 md:p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    Update Blog
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blog Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Blog Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Enter the blog title"
                            className="input input-bordered w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label
                            htmlFor="imageUrl"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Image URL
                        </label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={form.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter the image URL"
                            className="input input-bordered w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="select select-bordered w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Short Description */}
                    <div>
                        <label
                            htmlFor="shortDescription"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Short Description
                        </label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            value={form.shortDescription}
                            onChange={handleChange}
                            placeholder="Write a short description for the blog"
                            className="textarea textarea-bordered w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            maxLength="200"
                            rows="3"
                            required
                        ></textarea>
                        <p className="text-sm text-gray-500 mt-1">
                            Max 200 characters.
                        </p>
                    </div>

                    {/* Long Description */}
                    <div>
                        <label
                            htmlFor="longDescription"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Long Description
                        </label>
                        <textarea
                            id="longDescription"
                            name="longDescription"
                            value={form.longDescription}
                            onChange={handleChange}
                            placeholder="Write the full content of your blog"
                            className="textarea textarea-bordered w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            maxLength="5000"
                            rows="6"
                            required
                        ></textarea>
                        <p className="text-sm text-gray-500 mt-1">
                            Max 5000 characters.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateBlog;
