import { useState, useEffect } from "react";
import axios from "axios";
import { DataType, SortingMode } from "ka-table/enums";
import "ka-table/style.css";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [tableProps, setTableProps] = useState({
        columns: [
            {
                key: "index",
                title: "#",
                dataType: DataType.Number,
                style: { width: "50px", textAlign: "center" },
            },
            {
                key: "title",
                title: "Title",
                dataType: DataType.String,
                style: { fontWeight: "bold" },
            },
            {
                key: "author",
                title: "Author",
                dataType: DataType.String,
            },
            {
                key: "category",
                title: "Category",
                dataType: DataType.String,
                style: { fontStyle: "italic" },
            },
            {
                key: "wordCount",
                title: "Word Count",
                dataType: DataType.Number,
                style: { textAlign: "right" },
            },
        ],
        data: [],
        rowKeyField: "index",
        sortingMode: SortingMode.Single,
    });

    useEffect(() => {
        axios
            .get("https://blog-t-server.vercel.app/featured")
            .then((response) => {
                const dataWithIndex = response.data.map((blog, index) => ({
                    index: index + 1,
                    ...blog,
                }));
                setBlogs(dataWithIndex);
                setTableProps((prevProps) => ({ ...prevProps, data: dataWithIndex }));
            })
            .catch((error) => console.error("Error fetching featured blogs:", error));
    }, []);

    return (
        <section className="bg-gray-100 dark:bg-gray-900 py-10">
            <div className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                    Featured Blogs
                </h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg">
                        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <tr>
                                {tableProps.columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="p-4 border border-gray-300 dark:border-gray-600 font-semibold text-center"
                                    >
                                        {col.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableProps.data.map((row) => (
                                <tr
                                    key={row.index}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                >
                                    {tableProps.columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="p-4 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-300"
                                            style={col.style}
                                        >
                                            {row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogs;
