import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddBlogPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        category: "",
        shortDescription: "",
        longDescription: "",
    });

    const categories = ["News", "Technology", "Gaming", "Coding", "Sports"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("https://blog-t-server.vercel.app/blogs", formData, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Blog added successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setFormData({
                        title: "",
                        imageUrl: "",
                        category: "",
                        shortDescription: "",
                        longDescription: "",
                    });
                }
            })
            .catch((error) => {
                console.error("Error submitting the form:", error);
                const errorMessage = error.response?.data?.message || "An error occurred while adding the blog.";
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                    text: errorMessage,
                });
            });
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-2">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 md:p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    Add New Blog
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            value={formData.title}
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
                            value={formData.imageUrl}
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
                            value={formData.category}
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
                            value={formData.shortDescription}
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
                            value={formData.longDescription}
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
                        Submit Blog
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddBlogPage;
