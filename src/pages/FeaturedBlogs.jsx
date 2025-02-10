import { useState, useEffect } from "react";
import axios from "axios";
import { Table, kaReducer } from "ka-table";
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
                    <Table
                        {...tableProps}
                        dispatch={(action) => {
                            const newState = kaReducer(tableProps, action);
                            setTableProps(newState);
                        }}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-gray-300"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogs;
